import 'react';

export class AlertBox extends HTMLElement {
  type: string;
  alert: string;
}

declare global {
  interface HTMLElementTagNameMap {
    "alert-box": AlertBox;
  }
}

declare module 'react' {
  namespace JSX {
    interface IntrinsicElements {
      'alert-box': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> & {
        type?: 'note' | 'tip' | 'important' | 'warning' | 'caution';
        'data-oneline'?: string | boolean;
        alert?: string;
        class?: string;
      };
    }
  }
}

export default AlertBox;
