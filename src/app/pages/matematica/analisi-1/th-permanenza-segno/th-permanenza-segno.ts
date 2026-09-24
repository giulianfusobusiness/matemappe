import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MapViewer } from '../../../../components/map-viewer/map-viewer';

@Component({
  imports: [RouterLink, MapViewer],
  selector: 'app-th-permanenza-segno',
  styleUrl: './th-permanenza-segno.scss',
  templateUrl: './th-permanenza-segno.html',
})
export class ThPermanenzaSegno {}
