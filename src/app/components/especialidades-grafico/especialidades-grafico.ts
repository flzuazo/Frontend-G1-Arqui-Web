// typescript
import { Component, OnInit, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Chart } from 'chart.js/auto';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-especialidades-grafico',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './especialidades-grafico.html',
  styleUrls: ['./especialidades-grafico.css']
})
export class EspecialidadesGrafico implements OnInit, AfterViewInit {
  @ViewChild('chartCanvas') chartCanvas!: ElementRef<HTMLCanvasElement>;
  chart?: Chart;

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.cargarYCrearGrafico();
  }

  ngAfterViewInit(): void {
    // nothing extra here; la creación ocurre tras cargar datos
  }

  private pickFirstString(item: any, keys: string[]): string | null {
    if (!item) return null;
    for (const k of keys) {
      if (k in item && item[k] != null) {
        const s = String(item[k]).trim();
        if (s) return s;
      }
      const lower = Object.keys(item).find(ik => ik.toLowerCase().replace(/ñ/g, 'n') === k.toLowerCase().replace(/ñ/g, 'n'));
      if (lower && item[lower] != null) {
        const s = String(item[lower]).trim();
        if (s) return s;
      }
    }
    return null;
  }

  private pickFirstNumber(item: any, keys: string[]): number | null {
    if (!item) return null;
    for (const k of keys) {
      if (k in item) {
        const n = Number(item[k]);
        if (Number.isFinite(n)) return n;
      }
      const lower = Object.keys(item).find(ik => ik.toLowerCase().replace(/ñ/g, 'n') === k.toLowerCase().replace(/ñ/g, 'n'));
      if (lower) {
        const n = Number(item[lower]);
        if (Number.isFinite(n)) return n;
      }
    }
    return null;
  }

  private cargarYCrearGrafico() {
    const specialtyKeys = ['especialidad', 'especialidad_nombre', 'specialty', 'specialtyName', 'especialidadName'];
    const doctorNameKeys = ['doctor', 'medico', 'doctor_nombre', 'doctorName', 'medico_nombre'];

    // Primero intentar el nuevo endpoint del backend que devuelve DTOs
    this.http.get<any[]>('http://localhost:8080/api/reportes/especialidades').subscribe(
      (rows) => {
        if (Array.isArray(rows) && rows.length) {
          const counts = new Map<string, number>();
          rows.forEach(r => {
            const esp = this.pickFirstString(r, specialtyKeys) ?? 'Sin especialidad';
            // el DTO trae 'cantidad' (o 'cantidad' como string/número)
            let cnt = 0;
            if (r && (r.cantidad != null || r.cantidad !== undefined)) {
              cnt = Number(r.cantidad) || 0;
            } else if (r && (r.count != null)) {
              cnt = Number(r.count) || 0;
            } else if (r && (r.total != null)) {
              // si por alguna razón el campo es 'total'
              cnt = Number(r.total) || 0;
            }
            counts.set(esp, (counts.get(esp) ?? 0) + cnt);
          });
          this.crearGraficoEspecialidadesFromCounts(counts);
        } else {
          // si el endpoint responde vacío, intentar /api/doctores
          this.tryDoctoresEndpoint(specialtyKeys, doctorNameKeys);
        }
      },
      (error) => {
        console.warn('No se pudo obtener /api/reportes/especialidades, intentando fallback:', error);
        this.tryDoctoresEndpoint(specialtyKeys, doctorNameKeys);
      }
    );
  }

  private tryDoctoresEndpoint(specialtyKeys: string[], doctorNameKeys: string[]) {
    this.http.get<any[]>('http://localhost:8080/api/doctores').subscribe(doctores => {
      if (Array.isArray(doctores) && doctores.length) {
        const counts = new Map<string, number>();
        doctores.forEach(d => {
          const esp = this.pickFirstString(d, specialtyKeys) ?? 'Sin especialidad';
          counts.set(esp, (counts.get(esp) ?? 0) + 1);
        });
        this.crearGraficoEspecialidadesFromCounts(counts);
      } else {
        this.fallbackDesdeConsultas(specialtyKeys, doctorNameKeys);
      }
    }, error => {
      console.warn('No se pudo obtener /api/doctores, intentando fallback desde consultas:', error);
      this.fallbackDesdeConsultas(specialtyKeys, doctorNameKeys);
    });
  }

  private fallbackDesdeConsultas(specialtyKeys: string[], doctorNameKeys: string[]) {
    this.http.get<any[]>('http://localhost:8080/api/consultas-por-mes').subscribe(data => {
      const mapEspADoctors = new Map<string, Set<string>>();
      (data || []).forEach(item => {
        const esp = this.pickFirstString(item, specialtyKeys) ?? 'Sin especialidad';
        const doctor = this.pickFirstString(item, doctorNameKeys) ?? (`doctor-${this.pickFirstNumber(item, ['id','id_doctor','doctor_id']) ?? 'anon'}`);
        const set = mapEspADoctors.get(esp) ?? new Set<string>();
        set.add(doctor);
        mapEspADoctors.set(esp, set);
      });
      const counts = new Map<string, number>();
      mapEspADoctors.forEach((set, esp) => counts.set(esp, set.size));
      this.crearGraficoEspecialidadesFromCounts(counts);
    }, error => {
      console.error('No se pudo obtener datos para especialidades:', error);
      this.crearGraficoEspecialidadesFromCounts(new Map());
    });
  }

  private crearGraficoEspecialidadesFromCounts(countsMap: Map<string, number>) {
    const arr = Array.from(countsMap.entries()).map(([esp, cnt]) => ({ esp, cnt }));
    arr.sort((a, b) => b.cnt - a.cnt);
    const TOP_N = 12;
    const top = arr.slice(0, TOP_N);
    const labels = top.map(x => x.esp || 'Sin especialidad');
    const data = top.map(x => x.cnt);

    const colors = top.map((_, i) => {
      const hue = (i * 37) % 360;
      return `hsl(${hue} 70% 50% / 0.85)`;
    });

    if (this.chart) this.chart.destroy();
    const canvas = this.chartCanvas.nativeElement;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    this.chart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels,
        datasets: [{
          label: 'Doctores',
          data,
          backgroundColor: colors,
          borderColor: colors.map(c => c.replace(/0\.85\)/, '1)')),
          borderWidth: 1
        }]
      },
      options: {
        indexAxis: 'y',
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          title: { display: true, text: 'Cantidad de doctores por especialidad', font: { size: 16 } },
          legend: { display: false },
          tooltip: {
            callbacks: {
              label: (ctx: any) => `${ctx.parsed.x ?? ctx.parsed}: doctores`
            }
          }
        },
        scales: {
          x: { beginAtZero: true, ticks: { precision: 0 } },
          y: { ticks: { autoSkip: false } }
        },
        layout: { padding: { top: 8, bottom: 8 } }
      }
    });
  }
}
