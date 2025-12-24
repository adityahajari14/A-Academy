interface CalendlyInitInlineWidgetOptions {
  url: string;
  parentElement: HTMLElement;
}

interface Calendly {
  initInlineWidget(options: CalendlyInitInlineWidgetOptions): void;
}

interface Window {
  Calendly?: Calendly;
}

