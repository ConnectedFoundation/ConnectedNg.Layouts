import { Component, EventEmitter, input, model, signal } from '@angular/core';
import { MatSidenavModule } from '@angular/material/sidenav';

@Component({
  selector: 'cf-drawer',
  imports: [MatSidenavModule],
  templateUrl: './drawer.component.html',
  styleUrl: './drawer.component.scss'
})
export class DrawerComponent {
  protected readonly isMobile = signal(false);

  isOpen = model<boolean>(false);

  isCloseDisabled = input<boolean>(false);

  mode = input<'over' | 'side'>('over');

  position = input<'start' | 'end'>('end');

  openChanged(opened: boolean) {
    this.isOpen.set(opened);
  }
}
