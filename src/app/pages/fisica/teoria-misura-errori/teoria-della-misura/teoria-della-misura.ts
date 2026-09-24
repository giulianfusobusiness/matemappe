import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MapViewer } from '../../../../components/map-viewer/map-viewer';

@Component({
  imports: [RouterLink, MapViewer],
  selector: 'app-teoria-della-misura',
  styleUrl: './teoria-della-misura.scss',
  templateUrl: './teoria-della-misura.html',
})
export class TeoriaDellaMisura {}
