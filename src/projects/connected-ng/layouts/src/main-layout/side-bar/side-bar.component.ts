import { Component, computed, input, output, signal, SimpleChanges, WritableSignal } from '@angular/core';
import { MatSidenavModule } from '@angular/material/sidenav';
import { SizeProviderService, SizeBreakpoints } from '@connected-ng/style-kit'
import { OnDestroy, inject } from '@angular/core';


@Component({
  selector: 'cf-side-bar',
  imports: [MatSidenavModule],
  providers: [SizeProviderService],
  templateUrl: './side-bar.component.html',
  styleUrl: './side-bar.component.scss'
})

export class SideBarComponent {

  sizeProvider = inject(SizeProviderService);

  visible = input<boolean>();
  collapsed = input<boolean>();

  mode = computed<'side' | 'over'>(() => this.isMobile() ? 'over' : 'side');

  width = computed(() => {
    if (!this.visible())
      return 0;

    if (this.collapsed())
      return '85px';

    return '350px';
  });

  offset = computed(() => {
    if (this.isMobile())
      return 0;
    return this.width();
  });

  fixedInViewport = computed(() => this.isMobile());

  isMobile = computed(() => this.currentSize() == SizeBreakpoints.XSmall);

  currentSize: WritableSignal<SizeBreakpoints> = this.sizeProvider.getSizeChangeSignal();

  sizeClasses = computed(() => {
    switch (this.currentSize()) {
      case SizeBreakpoints.Small: return ['media-small'];
      case SizeBreakpoints.XSmall: return ['media-xsmall'];
      case SizeBreakpoints.Medium: return ['media-medium'];
    }

    return ['media-medium'];
  })

  ngOnDestroy(): void {
  }
}  
