import { Component } from '@angular/core';
import { SerieList } from './serie/serie-list/serie-list';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [SerieList],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  title = 'taller-series';
}
