import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DocumentLayoutItemComponent } from './document-layout-item.component';

describe('DocumentLayoutItemComponent', () => {
  let component: DocumentLayoutItemComponent;
  let fixture: ComponentFixture<DocumentLayoutItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DocumentLayoutItemComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DocumentLayoutItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
