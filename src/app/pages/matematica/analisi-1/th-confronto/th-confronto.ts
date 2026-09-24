import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MapViewer } from '../../../../components/map-viewer/map-viewer';

@Component({
  imports: [RouterLink, MapViewer],
  selector: 'app-th-confronto',
  styleUrl: './th-confronto.scss',
  templateUrl: './th-confronto.html',
})
export class ThConfronto {}
