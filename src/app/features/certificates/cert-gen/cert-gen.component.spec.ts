import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CertGenComponent } from './cert-gen.component';

describe('CertGenComponent', () => {
  let component: CertGenComponent;
  let fixture: ComponentFixture<CertGenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CertGenComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CertGenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
