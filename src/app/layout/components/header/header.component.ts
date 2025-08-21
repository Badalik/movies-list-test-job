import { Component } from '@angular/core';

import { ContainerComponent } from '@shared/components/container/container.component';

import { LangSwitcherComponent } from '../lang-switcher';
import { LogoComponent } from '../logo';
import { ThemeSwitcherComponent } from '../theme-switcher';

@Component({
  selector: 'app-header',
  imports: [
    ContainerComponent,
    ThemeSwitcherComponent,
    LogoComponent,
    LangSwitcherComponent,
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {}
