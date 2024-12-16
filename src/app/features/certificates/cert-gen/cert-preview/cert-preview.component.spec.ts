import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CertPreviewComponent } from './cert-preview.component';

describe('CertPreviewComponent', () => {
  let component: CertPreviewComponent;
  let fixture: ComponentFixture<CertPreviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CertPreviewComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CertPreviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
