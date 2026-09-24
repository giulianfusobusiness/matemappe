import {
  Component,
  Input,
  OnDestroy,
  inject,
  signal,
} from '@angular/core';

import {
  DomSanitizer,
  SafeResourceUrl,
} from '@angular/platform-browser';

@Component({
  selector: 'app-map-viewer',
  standalone: true,
  templateUrl: './map-viewer.html',
  styleUrl: './map-viewer.scss',
})
export class MapViewer implements OnDestroy {
  private sanitizer = inject(DomSanitizer);
  private source = '';

  resource?: SafeResourceUrl;

  @Input({ required: true })
  set src(value: string) {
    // Accetta soltanto SVG nella cartella maps del sito.
    if (!/^maps\/[a-zA-Z0-9/_-]+\.svg$/.test(value)) {
      throw new Error('Percorso della mappa non valido');
    }

    this.source = value;
    this.resource =
      this.sanitizer.bypassSecurityTrustResourceUrl(value);
  }

  get src(): string {
    return this.source;
  }

  @Input() label = 'Mappa concettuale';

  ready = signal(false);
  failed = signal(false);

  private svg?: SVGSVGElement;

  // Coordinate e dimensioni della porzione visibile.
  private original = [0, 0, 1, 1];
  private box = [0, 0, 1, 1];

  private cleanup: (() => void)[] = [];

  loaded(event: Event): void {
    this.dispose();

    const object = event.target as HTMLObjectElement;
    const svg = object.contentDocument?.querySelector('svg');

    if (
      !svg ||
      !svg.viewBox.baseVal.width ||
      !svg.viewBox.baseVal.height
    ) {
      this.failed.set(true);
      return;
    }

    this.svg = svg;

    const bounds = svg.viewBox.baseVal;

    this.original = [
      bounds.x,
      bounds.y,
      bounds.width,
      bounds.height,
    ];

    // Mantiene stabile lo spazio dei testi durante lo zoom.
    svg.querySelectorAll('foreignObject').forEach((element) => {
      if (element.getAttribute('width') === '100%') {
        element.setAttribute('width', String(bounds.width));
      }

      if (element.getAttribute('height') === '100%') {
        element.setAttribute('height', String(bounds.height));
      }
    });

    // Mostra la mappa intera senza deformarla.
    svg.setAttribute('width', '100%');
    svg.setAttribute('height', '100%');
    svg.setAttribute('preserveAspectRatio', 'xMidYMid meet');

    // Usa la variante chiara dei colori esportati da draw.io.
    svg.style.setProperty('color-scheme', 'only light');
    svg.style.touchAction = 'none';
    svg.style.userSelect = 'none';
    svg.style.cursor = 'grab';

    this.ready.set(true);
    this.failed.set(false);
    this.fit();

    const pointers = new Map<number, { x: number; y: number }>();

    let dragged = false;
    let distance = 0;
    let start = { x: 0, y: 0 };

    const listen = (
      name: string,
      handler: EventListener,
      options: AddEventListenerOptions = {},
    ): void => {
      svg.addEventListener(name, handler, options);

      this.cleanup.push(() => {
        svg.removeEventListener(name, handler, options);
      });
    };

    const fingerDistance = (): number => {
      const points = [...pointers.values()];

      if (points.length !== 2) return 0;

      return Math.hypot(
        points[0].x - points[1].x,
        points[0].y - points[1].y,
      );
    };

    listen('pointerdown', ((event: PointerEvent) => {
      if (event.button !== 0) return;

      if (pointers.size === 0) {
        dragged = false;
        start = {
          x: event.clientX,
          y: event.clientY,
        };
      }

      pointers.set(event.pointerId, {
        x: event.clientX,
        y: event.clientY,
      });

      distance = fingerDistance();
    }) as EventListener);

    listen('pointermove', ((event: PointerEvent) => {
      const previous = pointers.get(event.pointerId);

      if (!previous) return;

      const movement = Math.hypot(
        event.clientX - start.x,
        event.clientY - start.y,
      );

      // Un piccolo movimento resta un normale clic.
      if (!dragged && movement < 5 && pointers.size === 1) {
        return;
      }

      dragged = true;
      svg.setPointerCapture(event.pointerId);
      event.preventDefault();

      pointers.set(event.pointerId, {
        x: event.clientX,
        y: event.clientY,
      });

      if (pointers.size === 2) {
        // Zoom con due dita.
        const nextDistance = fingerDistance();

        if (distance > 0 && nextDistance > 0) {
          this.zoom(nextDistance / distance);
        }

        distance = nextDistance;
      } else {
        // Trascinamento con mouse o un dito.
        const matrix = svg.getScreenCTM();

        if (!matrix) return;

        this.box[0] -=
          (event.clientX - previous.x) / matrix.a;

        this.box[1] -=
          (event.clientY - previous.y) / matrix.d;

        this.paint();
      }
    }) as EventListener);

    for (const name of [
      'pointerup',
      'pointercancel',
      'pointerleave',
    ]) {
      listen(name, ((event: PointerEvent) => {
        pointers.delete(event.pointerId);
        distance = fingerDistance();
      }) as EventListener);
    }

    // Evita di aprire un link quando si sta trascinando.
    listen(
      'click',
      ((event: MouseEvent) => {
        if (dragged) {
          event.preventDefault();
          event.stopPropagation();
        }
      }) as EventListener,
      { capture: true },
    );

    // Ctrl + rotella: zoom.
    // Rotella normale: scorrimento della pagina.
    listen(
      'wheel',
      ((event: WheelEvent) => {
        if (event.ctrlKey) {
          event.preventDefault();
          this.zoom(event.deltaY < 0 ? 1.15 : 1 / 1.15);
        }
      }) as EventListener,
      { passive: false },
    );
  }

  fit(): void {
    this.box = [...this.original];
    this.paint();
  }

  zoom(factor: number): void {
    if (!this.svg) return;

    const currentScale = this.original[2] / this.box[2];

    const scale = Math.max(
      1,
      Math.min(16, currentScale * factor),
    );

    const width = this.original[2] / scale;
    const height = this.original[3] / scale;

    this.box = [
      this.box[0] + (this.box[2] - width) / 2,
      this.box[1] + (this.box[3] - height) / 2,
      width,
      height,
    ];

    this.paint();
  }

  private paint(): void {
    this.svg?.setAttribute('viewBox', this.box.join(' '));
  }

  private dispose(): void {
    this.cleanup.forEach((removeListener) => {
      removeListener();
    });

    this.cleanup = [];
    this.svg = undefined;
    this.ready.set(false);
  }

  ngOnDestroy(): void {
    this.dispose();
  }
}