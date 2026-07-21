import { Component, computed, input, model, signal, SimpleChanges } from '@angular/core';
import { MatBadgeModule } from '@angular/material/badge';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';


@Component({
  selector: 'cf-toolbar',
  imports: [MatIconModule, MatButtonModule, MatBadgeModule],
  templateUrl: './toolbar.component.html',
  styleUrl: './toolbar.component.css'
})

export class ToolbarComponent {
  isSideBarOpen = model<boolean>(true);
  isSideBarCollapsed = model<boolean>(true);
  isDrawerOpen = model<boolean>(false);

  isSideBarEnabled = input<boolean>(true);
  isDrawerEnabled = input<boolean>(true);
  drawerBadgeText = input<string | number | null>(null);
  drawerBadgeHidden = input<boolean>(true);
  drawerIconClass = input<string>();

  isCompletelyOpen = computed(() => this.sideBarStateOrder().length == 0 || this.currentSideBarState() == this.sideBarStateOrder()[this.sideBarStateOrder().length - 1]);

  sideBarStateOrder = input<('closed' | 'collapsed' | 'open')[]>(['collapsed', 'open']);
  currentSideBarState = signal<'closed' | 'collapsed' | 'open' | undefined>(undefined);

  ngOnInit() {
    let state = this.getDefaultState();

    this.currentSideBarState.set(this.setToValidState(state));
  }

  setToValidState(state: 'closed' | 'collapsed' | 'open'): 'closed' | 'collapsed' | 'open' {
    if (this.sideBarStateOrder().length) {
      let index = this.sideBarStateOrder().indexOf(state);

      if (index < 0)
        state = this.sideBarStateOrder()[0];
    }

    return state;
  }

  getDefaultState(): 'closed' | 'collapsed' | 'open' {
    let state: 'closed' | 'collapsed' | 'open' = 'closed';
    if (this.isSideBarOpen() && !this.isSideBarCollapsed())
      state = 'open';
    else if (this.isSideBarOpen() && this.isSideBarCollapsed())
      state = 'collapsed';

    return state;
  }

  setDefaultState(state: 'closed' | 'collapsed' | 'open') {
    if (state === 'closed') {
      this.isSideBarOpen.set(false);
      this.isSideBarCollapsed.set(true);
    }
    else if (state === 'collapsed') {
      this.isSideBarCollapsed.set(true);
    }
    else if (state === 'open') {
      this.isSideBarCollapsed.set(false);
      this.isSideBarOpen.set(true);
    }
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['sideBarStateOrder']) {
      this.cycleSideBarStates(true);
    }

    if (changes['isSideBarCollapsed']) {
      this.currentSideBarState.set(undefined);
      this.cycleSideBarStates(true);
    }
  }

  cycleSideBarStates(automaticHandler = false) {
    if (!this.currentSideBarState()) {
      let state = this.setToValidState(this.getDefaultState());      
      this.currentSideBarState.set(state);
      this.setDefaultState(state);

      return;
    }

    if (this.sideBarStateOrder().length) {
      let index = this.sideBarStateOrder().indexOf(this.currentSideBarState()!);

      if (!automaticHandler)
        index = index + 1;
      else
        index = Math.max(0, index);

      if (index == this.sideBarStateOrder().length)
        index = 0;

      this.currentSideBarState.set(this.sideBarStateOrder()[index]);
    }
    else
      this.currentSideBarState.set('closed');

    this.isSideBarOpen.set(this.currentSideBarState() != 'closed');

    this.isSideBarCollapsed.set(this.currentSideBarState() == 'collapsed');
  }

  toggleDrawer() {
    this.isDrawerOpen.set(!this.isDrawerOpen());
  }
}
