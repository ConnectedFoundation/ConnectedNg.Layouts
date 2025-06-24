import { Component, computed, input, signal, SimpleChanges } from '@angular/core';
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
  
  width = computed(() => {
    if (!this.visible())
      return 0;

    if (this.collapsed())
      return '85px';

    return '350px';
  });

  fixedInViewport = computed(()=> this.isMobile());
  
  isMobile = computed(() => this.currentSize() == SizeBreakpoints.XSmall);

  currentSize = this.sizeProvider.getSizeChangeSignal(); 

  sizeClasses = computed(() => {
    switch(this.currentSize()){
      case SizeBreakpoints.Small: return ['media-small'];
      case SizeBreakpoints.XSmall: return ['media-xsmall'];
      case SizeBreakpoints.Medium: return ['media-medium'];
    }

    return ['media-medium'];
  })
 
  ngOnDestroy(): void {
  } 
}  
