import { ChangeDetectionStrategy, Component, signal, input, inject, computed, ContentChildren, QueryList, contentChildren } from '@angular/core';
import { MatExpansionModule, MatExpansionPanel } from '@angular/material/expansion';
import { MatButton, MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import {
  MatBottomSheet,
  MatBottomSheetModule,
  MatBottomSheetRef,
} from '@angular/material/bottom-sheet';
import { ComponentType } from '@angular/cdk/portal';
import { DocumentLayoutItemComponent } from './document-layout-item/document-layout-item.component';
import { NgForOf, NgTemplateOutlet } from '@angular/common';


 
@Component({
  selector: 'cf-document-layout',
  imports: [
    MatExpansionModule,
    MatExpansionPanel,
    MatButtonModule,
    MatIconModule, 
    NgForOf,
    NgTemplateOutlet
  ],
  templateUrl: './document-layout.component.html',
  styleUrl: './document-layout.component.scss'
})
export class DocumentLayoutComponent {
 
  itemsArray = contentChildren<DocumentLayoutItemComponent>(DocumentLayoutItemComponent);

  private _bottomSheet = inject(MatBottomSheet);

  fabVisible = computed(() => !!this.fabActionsComponent());
     
  fabActionsComponent = input<ComponentType<unknown>>();

  openBottomSheetActions() {
    this._bottomSheet.open(this.fabActionsComponent()!)
  } 
  readonly panelOpenState = signal(false);
}
