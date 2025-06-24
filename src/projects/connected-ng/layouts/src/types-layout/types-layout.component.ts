import { Component, computed, inject, input, signal, TemplateRef } from '@angular/core';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatTableModule} from '@angular/material/table';
import { CommonModule, NgTemplateOutlet } from '@angular/common';

@Component({
  selector: 'cf-types-layout',
  imports: [MatTableModule, MatButtonModule, MatIconModule, CommonModule, NgTemplateOutlet],
  templateUrl: './types-layout.component.html',
  styleUrl: './types-layout.component.scss'
}) 
export class TypesLayoutComponent<T> {
  items = input<T[]>([]);
 
  detailTemplate = input<TemplateRef<any>>();
   
  columnsToDisplay = input.required<string[]>();
  columnsToDisplayWithExpand = computed(() => this.detailTemplate() ? [...this.columnsToDisplay(), 'expand']: this.columnsToDisplay());
  expandedElement?: T; 
  
  /** Checks whether an element is expanded. */
  isExpanded(element: T) {
    return this.expandedElement === element; 
  } 
  
  /** Toggles the expanded state of an element. */
  toggle(element: T) {
    this.expandedElement = this.isExpanded(element) ? undefined : element;
  }
} 