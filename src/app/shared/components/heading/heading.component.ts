import { ChangeDetectionStrategy, Component, ElementRef, inject, input, OnInit, Renderer2 } from '@angular/core';

@Component({
  selector: 'app-heading',
  imports: [],
  host: {
    '[class]': 'mode()',
  },
  templateUrl: './heading.component.html',
  styleUrl: './heading.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeadingComponent implements OnInit {

  public readonly text = input<string>('');

  public readonly h = input<1 | 2 | 3 | 4 | 5 | 6>(2);

  public readonly mode = input<string>();

  private _elementRef = inject(ElementRef);

  private _renderer = inject(Renderer2);

  public ngOnInit(): void {
    const h = this._renderer.createElement(`h${this.h().toString()}`);
    const text = this._renderer.createText(this.text());

    this._renderer.appendChild(h, text);
    this._renderer.appendChild(this._elementRef.nativeElement, h);
  }

}
