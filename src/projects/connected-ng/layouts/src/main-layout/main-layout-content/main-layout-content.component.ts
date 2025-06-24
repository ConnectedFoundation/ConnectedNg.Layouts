import { Component, ElementRef, inject, input } from '@angular/core';

@Component({
  selector: 'cf-main-layout-content',
  imports: [],
  templateUrl: './main-layout-content.component.html',
  styleUrl: './main-layout-content.component.css'
})
export class MainLayoutContentComponent {
  for = input.required<'drawer' | 'side-bar' | 'main' | 'toolbar'>();

  constructor(){

  }
}
