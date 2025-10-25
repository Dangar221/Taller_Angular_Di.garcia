import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Serie } from '../serie';
import { SerieService } from '../serie.service';

@Component({
  selector: 'app-serie-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './serie-list.html',
  styleUrls: ['./serie-list.css']
})
export class SerieList implements OnInit {
  series: Serie[] = [];
  averageSeasons: number = 0;
  selectedSerie: Serie | null = null;

  constructor(private serieService: SerieService) {}

  ngOnInit() {
    this.getSeries();
  }

  getSeries(): void {
    this.serieService.getSeries().subscribe(series => {
      this.series = series;
      this.calculateAverage();
    });
  }

  calculateAverage(): void {
    const total = this.series.reduce((sum, serie) => sum + serie.seasons, 0);
    this.averageSeasons = total / this.series.length;
  }

  onSelect(serie: Serie): void {
    this.selectedSerie = serie;
  }
}
