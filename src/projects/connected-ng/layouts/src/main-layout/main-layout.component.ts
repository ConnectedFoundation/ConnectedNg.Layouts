import { Component, computed, contentChildren, input, model, TemplateRef, viewChild, viewChildren, WritableSignal } from '@angular/core';
import { SideBarComponent } from './side-bar/side-bar.component';
import { DrawerComponent } from './drawer/drawer.component';
import { SizeProviderService, SizeBreakpoints } from '@connected-ng/style-kit'
import { inject } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { ToolbarComponent } from './toolbar/toolbar.component';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { CdkPortalOutlet, ComponentType, Portal } from '@angular/cdk/portal';

@Component({
  selector: 'cf-main-layout',
  imports: [
    MatButtonModule,
    SideBarComponent,
    DrawerComponent, MatIconModule,
    ToolbarComponent,
    CdkPortalOutlet
  ],
  providers: [SizeProviderService],
  templateUrl: './main-layout.component.html',
  styleUrl: './main-layout.component.scss'
})
export class MainLayoutComponent {
  isSideBarOpen = model<boolean>(false);
  isSideBarCollapsed = model<boolean>(false);
  isDrawerOpen = model<boolean>(false);

  isSideBarEnabled = input<boolean>(true);
  isDrawerEnabled = input<boolean>(true);
  drawerPosition = input<'start' | 'end'>('end');
  drawerMode = input<'side' | 'over'>('over');

  fabVisible = input<boolean>(false);
  fabEnabled = input<boolean>(true);


  private _bottomSheet = inject(MatBottomSheet);
  fabActionsTemplate = viewChild<TemplateRef<unknown>>('bottomSheetOutlet');
  fabActionsTemplateChildren = viewChildren('bottomSheetOutlet');

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

  openBottomSheetActions() {
    if (this.fabActionsTemplate())
      this._bottomSheet.open(this.fabActionsTemplate()!);
  }
}
