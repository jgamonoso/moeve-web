import {
  AfterViewInit,
  Directive,
  ElementRef,
  inject,
  Input,
  NgZone,
  OnDestroy,
} from '@angular/core';

/**
 * Añade automáticamente el atributo `title` si el contenido del host
 * está visualmente truncado (scrollWidth > clientWidth).
 * - Si se pasa un texto con [appAutoTooltip] se usa ese; si no, usa el texto del host.
 * - Recalcula en resize y cuando cambia el texto (mutations).
 */
@Directive({
  selector: '[appAutoTooltip]',
  standalone: true,
})
export class AutoTooltipDirective implements AfterViewInit, OnDestroy {
  @Input('appAutoTooltip') text: string | null | undefined;

  private ro?: ResizeObserver;
  private mo?: MutationObserver;

  private readonly el = inject<ElementRef<HTMLElement>>(ElementRef);
  private readonly zone = inject(NgZone);

  ngAfterViewInit(): void {
    // Observa cambios de tamaño
    this.zone.runOutsideAngular(() => {
      this.ro = new ResizeObserver(() => this.update());
      this.ro.observe(this.el.nativeElement);

      // Observa cambios en el contenido (traducciones, etc.)
      this.mo = new MutationObserver(() => this.update());
      this.mo.observe(this.el.nativeElement, {
        childList: true,
        characterData: true,
        subtree: true,
      });

      // Primer cálculo
      requestAnimationFrame(() => this.update());
    });
  }

  private isTruncated(node: HTMLElement): boolean {
    // pequeño margen para evitar falsos positivos
    return node.scrollWidth - node.clientWidth > 1;
  }

  private update(): void {
    const host = this.el.nativeElement;
    const tooltipText = (this.text ?? host.textContent ?? '').trim();

    if (!tooltipText) {
      host.removeAttribute('title');
      return;
    }

    if (this.isTruncated(host)) {
      host.setAttribute('title', tooltipText);
    } else {
      host.removeAttribute('title');
    }
  }

  ngOnDestroy(): void {
    this.ro?.disconnect();
    this.mo?.disconnect();
  }
}
