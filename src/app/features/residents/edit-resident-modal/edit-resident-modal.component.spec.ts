import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditResidentModalComponent } from './edit-resident-modal.component';

describe('EditResidentModalComponent', () => {
  let component: EditResidentModalComponent;
  let fixture: ComponentFixture<EditResidentModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditResidentModalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditResidentModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
