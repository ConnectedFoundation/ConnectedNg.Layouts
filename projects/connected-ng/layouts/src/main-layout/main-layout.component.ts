import { Component } from '@angular/core';
import { SideBarComponent } from './side-bar/side-bar.component';
import { DrawerComponent } from './drawer/drawer.component';

@Component({
  selector: 'cf-main-layout',
  imports: [SideBarComponent, DrawerComponent],
  templateUrl: './main-layout.component.html',
  styleUrl: './main-layout.component.css'
})
export class MainLayoutComponent {

}
