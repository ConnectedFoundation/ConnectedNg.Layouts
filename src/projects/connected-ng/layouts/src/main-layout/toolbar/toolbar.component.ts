import { Component, computed, effect, input, model, signal, SimpleChanges } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';


@Component({
  selector: 'cf-toolbar',
  imports: [MatIconModule, MatButtonModule],
  templateUrl: './toolbar.component.html',
  styleUrl: './toolbar.component.css'
})

export class ToolbarComponent {
  isSideBarOpen = model<boolean>(false);
  isSideBarCollapsed = model<boolean>(false);
  isDrawerOpen = model<boolean>(false);

  isCompletelyOpen = computed(() => this.sideBarStateOrder().length == 0 || this.currentSideBarState() == this.sideBarStateOrder()[this.sideBarStateOrder().length - 1]); 

  sideBarStateOrder = input<('closed' | 'collapsed' | 'open')[]>(['collapsed', 'open']);
  currentSideBarState = signal<'closed' | 'collapsed' | 'open' | undefined>(undefined);

  ngOnInit() {
    this.cycleSideBarStates();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['sideBarStateOrder']) {
      this.cycleSideBarStates(true);
    }
  }

  cycleSideBarStates(automaticHandler = false) {
    if (!this.currentSideBarState()) {
      if (this.sideBarStateOrder().length)
        this.currentSideBarState.set(this.sideBarStateOrder()[0]);
      else
        this.currentSideBarState.set('closed');
    }
    else {
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
    }

    this.isSideBarOpen.set(this.currentSideBarState() != 'closed');

    this.isSideBarCollapsed.set(this.currentSideBarState() == 'collapsed');
  }

  toggleDrawer() {
    this.isDrawerOpen.set(!this.isDrawerOpen());
  }
}
