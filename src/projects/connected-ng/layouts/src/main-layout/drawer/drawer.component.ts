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
 
  openChanged(opened: boolean) {
    console.log(opened);
    this.isOpen.set(opened);
  }
}
