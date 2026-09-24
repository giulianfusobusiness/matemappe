import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MapViewer } from '../../../../components/map-viewer/map-viewer';

@Component({
  imports: [RouterLink, MapViewer],
  selector: 'app-th-inverso-permanenza-segno',
  styleUrl: './th-inverso-permanenza-segno.scss',
  templateUrl: './th-inverso-permanenza-segno.html',
})
export class ThInversoPermanenzaSegno {}
