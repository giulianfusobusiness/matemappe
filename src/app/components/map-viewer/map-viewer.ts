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

  // Coordinate e dimensioni della mappa originale
  // e della porzione attualmente visibile.
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

    // Mostra inizialmente la mappa intera senza deformarla.
    svg.setAttribute('width', '100%');
    svg.setAttribute('height', '100%');
    svg.setAttribute('preserveAspectRatio', 'xMidYMid meet');

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

    listen(
      'pointerdown',
      ((event: PointerEvent) => {
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
      }) as EventListener,
    );

    listen(
      'pointermove',
      ((event: PointerEvent) => {
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
        svg.style.cursor = 'grabbing';

        pointers.set(event.pointerId, {
          x: event.clientX,
          y: event.clientY,
        });

        if (pointers.size === 2) {
          // Zoom con due dita sul telefono.
          const nextDistance = fingerDistance();

          if (distance > 0 && nextDistance > 0) {
            this.zoom(nextDistance / distance);
          }

          distance = nextDistance;

          // Consente anche lo spostamento con due dita.
          this.panAndScroll(
            (previous.x - event.clientX) / 2,
            (previous.y - event.clientY) / 2,
            false,
          );
        } else {
          // Sul telefono, raggiunto il bordo della mappa,
          // il movimento continua scorrendo la pagina.
          this.panAndScroll(
            previous.x - event.clientX,
            previous.y - event.clientY,
            event.pointerType === 'touch',
          );
        }
      }) as EventListener,
      { passive: false },
    );

    const releasePointer = (event: PointerEvent): void => {
      pointers.delete(event.pointerId);
      distance = fingerDistance();

      if (svg.hasPointerCapture(event.pointerId)) {
        svg.releasePointerCapture(event.pointerId);
      }

      if (pointers.size === 0) {
        svg.style.cursor = 'grab';
      }
    };

    for (const name of ['pointerup', 'pointercancel']) {
      listen(name, releasePointer as EventListener);
    }

    listen(
      'pointerleave',
      ((event: PointerEvent) => {
        // Durante il trascinamento manteniamo il controllo
        // anche quando il puntatore esce dal riquadro.
        if (!svg.hasPointerCapture(event.pointerId)) {
          releasePointer(event);
        }
      }) as EventListener,
    );

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

    listen(
      'wheel',
      ((event: WheelEvent) => {
        event.preventDefault();

        if (event.ctrlKey) {
          // Ctrl + rotella oppure gesto di zoom sul touchpad.
          this.zoom(event.deltaY < 0 ? 1.15 : 1 / 1.15);
          return;
        }

        // Converte lo scorrimento in pixel.
        const unit =
          event.deltaMode === 1
            ? 16
            : event.deltaMode === 2
              ? object.clientHeight
              : 1;

        this.panAndScroll(
          event.deltaX * unit,
          event.deltaY * unit,
        );
      }) as EventListener,
      { passive: false },
    );
  }

  fit(): void {
    this.box = [...this.original];
    this.paint();
  }

  zoom(factor: number): void {
    if (!this.svg || !Number.isFinite(factor) || factor <= 0) {
      return;
    }

    const currentScale = this.original[2] / this.box[2];

    const scale = Math.max(
      1,
      Math.min(16, currentScale * factor),
    );

    const width = this.original[2] / scale;
    const height = this.original[3] / scale;

    const centerX = this.box[0] + this.box[2] / 2;
    const centerY = this.box[1] + this.box[3] / 2;

    // Mantiene l'inquadratura entro i bordi anche riducendo lo zoom.
    const nextX = Math.max(
      this.original[0],
      Math.min(
        this.original[0] + this.original[2] - width,
        centerX - width / 2,
      ),
    );

    const nextY = Math.max(
      this.original[1],
      Math.min(
        this.original[1] + this.original[3] - height,
        centerY - height / 2,
      ),
    );

    this.box = [nextX, nextY, width, height];
    this.paint();
  }

  private panAndScroll(
    deltaX: number,
    deltaY: number,
    scrollPage = true,
  ): void {
    if (!this.svg) return;

    const matrix = this.svg.getScreenCTM();

    if (!matrix || !matrix.a || !matrix.d) return;

    const [
      originalX,
      originalY,
      originalWidth,
      originalHeight,
    ] = this.original;

    const [oldX, oldY, width, height] = this.box;

    const maxX = originalX + originalWidth - width;
    const maxY = originalY + originalHeight - height;

    const nextX = Math.max(
      originalX,
      Math.min(maxX, oldX + deltaX / matrix.a),
    );

    const nextY = Math.max(
      originalY,
      Math.min(maxY, oldY + deltaY / matrix.d),
    );

    this.box = [nextX, nextY, width, height];
    this.paint();

    // Al bordo della mappa, passa lo scorrimento alla pagina.
    if (scrollPage) {
      const usedY = (nextY - oldY) * matrix.d;
      const remainingY = deltaY - usedY;

      if (Math.abs(remainingY) > 0.5) {
        window.scrollBy({
          top: remainingY,
          left: 0,
          behavior: 'instant',
        });
      }
    }
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