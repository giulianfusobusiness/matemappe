import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MapViewer } from '../../../../../components/map-viewer/map-viewer';

@Component({
  imports: [RouterLink, MapViewer],
  selector: 'app-gruppo-abeliano',
  styleUrl: './gruppo-abeliano.scss',
  templateUrl: './gruppo-abeliano.html',
})
export class GruppoAbeliano {}
