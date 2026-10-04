import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MapViewer } from '../../../../../components/map-viewer/map-viewer';

@Component({
  imports: [RouterLink, MapViewer],
  selector: 'app-spazio-vettoriale',
  styleUrl: './spazio-vettoriale.scss',
  templateUrl: './spazio-vettoriale.html',
})
export class SpazioVettoriale {}
