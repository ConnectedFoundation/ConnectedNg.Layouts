import { NgIf } from '@angular/common';
import { Component, computed, contentChild, ElementRef, input, model, signal, TemplateRef, viewChild, ViewChild } from '@angular/core';
import { MatExpansionModule, MatExpansionPanel } from '@angular/material/expansion';

@Component({
  selector: 'cf-document-layout-item',
  imports: [MatExpansionModule, NgIf],
  templateUrl: './document-layout-item.component.html',
  styleUrl: './document-layout-item.component.css'
})
export class DocumentLayoutItemComponent {
  content = viewChild.required<TemplateRef<DocumentLayoutItemComponent>>('content');

  title = input<string>();
  expanded = model<boolean>(false);
  showActionRow = signal<boolean>(true); 
  actionRow = viewChild<ElementRef>('actionRow');
 
  ngAfterViewInit() { 
    this.showActionRow.set(this.actionRow()?.nativeElement.childElementCount > 0);
  }
}


