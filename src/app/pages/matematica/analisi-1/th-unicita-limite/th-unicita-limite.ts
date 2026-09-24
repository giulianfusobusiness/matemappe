import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MapViewer } from '../../../../components/map-viewer/map-viewer';

@Component({
  imports: [RouterLink, MapViewer],
  selector: 'app-th-unicita-limite',
  styleUrl: './th-unicita-limite.scss',
  templateUrl: './th-unicita-limite.html',
})
export class ThUnicitaLimite {}
