// typescript
import { Component, OnInit, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Chart } from 'chart.js/auto';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-consultas-grafico',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './consultas-grafico.html',
  styleUrls: ['./consultas-grafico.css']
})
export class ConsultasGrafico implements OnInit, AfterViewInit {
  @ViewChild('chartCanvas') chartCanvas!: ElementRef<HTMLCanvasElement>;

  consultasData: any[] = [];
  chart: Chart | undefined;

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.obtenerConsultas();
  }

  ngAfterViewInit(): void {
    if (this.consultasData.length) {
      this.crearGrafico();
    }
  }

  private toNumber(value: any): number | null {
    if (value === null || value === undefined) return null;
    const n = Number(value);
    return Number.isFinite(n) ? n : null;
  }

  private pickFirstNumber(item: any, keys: string[]): number | null {
    for (const k of keys) {
      if (k in item) {
        const v = this.toNumber(item[k]);
        if (v !== null) return v;
      }
      // also try lowercase/without accents variants
      const lower = Object.keys(item).find(ik => ik.toLowerCase().replace(/ñ/g, 'n') === k.toLowerCase().replace(/ñ/g, 'n'));
      if (lower) {
        const v = this.toNumber(item[lower]);
        if (v !== null) return v;
      }
    }
    return null;
  }

  obtenerConsultas() {
    this.http.get<any[]>('http://localhost:8080/api/consultas-por-mes').subscribe(data => {
      console.log('respuesta API consultas-por-mes:', data);
      this.consultasData = data || [];
      if (this.chartCanvas) {
        this.crearGrafico();
      }
    }, error => {
      console.error('Error al obtener datos:', error);
    });
  }

  crearGrafico() {
    const meses = ['Enero','Febrero','Marzo','Abril','Mayo','Junio','Julio','Agosto','Septiembre','Octubre','Noviembre','Diciembre'];
    const consultas2024 = new Array(12).fill(0);
    const consultas2025 = new Array(12).fill(0);

    // posibles nombres de campos que puede devolver la API
    const monthKeys = ['mes', 'month', 'numero_mes', 'mes_numero', 'monthNumber', 'month_number'];
    const yearKeys = ['año', 'anio', 'year', 'ano'];
    const countKeys = ['cantidad_consultas', 'cantidad', 'count', 'total', 'cantidadConsultas', 'cantidad_consulta'];

    this.consultasData.forEach(item => {
      const mesVal = this.pickFirstNumber(item, monthKeys);
      const añoVal = this.pickFirstNumber(item, yearKeys);
      const cntVal = this.pickFirstNumber(item, countKeys) ?? 0;

      // si no hay mes válido, intentar inferir por índice u omitir
      if (mesVal === null) return;
      const mesIndex = Math.max(0, Math.min(11, Math.floor(mesVal) - 1));

      const año = añoVal ?? new Date().getFullYear();

      if (año === 2024) consultas2024[mesIndex] = cntVal;
      if (año === 2025) consultas2025[mesIndex] = cntVal;
    });

    console.log('consultas2024:', consultas2024, 'consultas2025:', consultas2025);

    const canvas = this.chartCanvas.nativeElement;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    if (this.chart) {
      this.chart.destroy();
    }

    const valuePlugin = {
      id: 'valueAboveBar',
      afterDatasetsDraw(chart: any) {
        const ctx = chart.ctx;
        chart.data.datasets.forEach((dataset: any, datasetIndex: number) => {
          const meta = chart.getDatasetMeta(datasetIndex);
          meta.data.forEach((bar: any, index: number) => {
            const value = dataset.data[index];
            if (value == null || value === 0) return;
            const x = bar.x;
            const y = bar.y - 6;
            ctx.save();
            ctx.fillStyle = '#222';
            ctx.font = '12px sans-serif';
            ctx.textAlign = 'center';
            ctx.fillText(String(value), x, y);
            ctx.restore();
          });
        });
      }
    };

    Chart.register(valuePlugin);

    this.chart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: meses,
        datasets: [
          {
            label: '2024',
            data: consultas2024,
            backgroundColor: 'rgba(255,99,132,0.8)',
            borderColor: 'rgba(255,99,132,1)',
            borderWidth: 1,
            maxBarThickness: 28,
            order: 1
          },
          {
            label: '2025',
            data: consultas2025,
            backgroundColor: 'rgba(54,162,235,0.8)',
            borderColor: 'rgba(54,162,235,1)',
            borderWidth: 1,
            maxBarThickness: 28,
            order: 2
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: { title: {
            display: true,
            text: 'Consultas por mes — 2024 vs 2025',
            color: '#222',
            padding: { top: 8, bottom: 12 },
            font: { size: 18 }
          },legend: { position: 'top' } },
        scales: {
          x: { stacked: false, ticks: { maxRotation: 0, autoSkip: false } },
          y: { beginAtZero: true, ticks: { precision: 0 } }
        }
      }
    });
  }
}
