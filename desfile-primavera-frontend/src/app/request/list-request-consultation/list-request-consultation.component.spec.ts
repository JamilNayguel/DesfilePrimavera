import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListRequestConsultationComponent } from './list-request-consultation.component';

describe('ListRequestConsultationComponent', () => {
  let component: ListRequestConsultationComponent;
  let fixture: ComponentFixture<ListRequestConsultationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListRequestConsultationComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListRequestConsultationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
