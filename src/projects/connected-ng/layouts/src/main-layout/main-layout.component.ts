import { Component, EventEmitter, computed, effect, input, model, WritableSignal } from '@angular/core';
import { SideBarComponent } from './side-bar/side-bar.component';
import { DrawerComponent } from './drawer/drawer.component';
import { MainLayoutContentComponent } from './main-layout-content/main-layout-content.component';
import {
  MatBottomSheet,
  MatBottomSheetModule,
  MatBottomSheetRef,
} from '@angular/material/bottom-sheet';
import { SizeProviderService, SizeBreakpoints } from '@connected-ng/style-kit'
import { inject } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { ComponentType } from '@angular/cdk/portal';
import { ToolbarComponent } from './toolbar/toolbar.component';



@Component({
  selector: 'cf-main-layout',
  imports: [
    MatButtonModule,
    SideBarComponent,
    DrawerComponent, MainLayoutContentComponent, MatIconModule, MatBottomSheetModule,
    ToolbarComponent],
  providers: [SizeProviderService],
  templateUrl: './main-layout.component.html',
  styleUrl: './main-layout.component.scss'
})
export class MainLayoutComponent {
  isSideBarOpen = model<boolean>(false);
  isSideBarCollapsed = model<boolean>(false);
  isDrawerOpen = model<boolean>(false);

  sideBarStateOrder = input<('closed' | 'collapsed' | 'open')[]>(['collapsed', 'open']);
  
  drawerOpenChanged(value: boolean) {
    this.isDrawerOpen.set(value);
  }

  sizeProvider = inject(SizeProviderService);

  currentSize: WritableSignal<SizeBreakpoints> = this.sizeProvider.getSizeChangeSignal();

  sizeClasses = computed(() => {
    switch (this.currentSize()) {
      case SizeBreakpoints.Small: return ['media-small'];
      case SizeBreakpoints.XSmall: return ['media-xsmall'];
      case SizeBreakpoints.Medium: return ['media-medium'];
    }

    return ['media-medium'];
  })

  ngOnDestroy(): void { }

} 
