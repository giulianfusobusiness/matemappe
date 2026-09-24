import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MapViewer } from '../../../../components/map-viewer/map-viewer';

@Component({
  imports: [RouterLink, MapViewer],
  selector: 'app-conduttori',
  styleUrl: './conduttori.scss',
  templateUrl: './conduttori.html',
})
export class Conduttori {}
