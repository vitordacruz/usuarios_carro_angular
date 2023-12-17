import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddCarroComponent } from './add-carro.component';

describe('AddCarroComponent', () => {
  let component: AddCarroComponent;
  let fixture: ComponentFixture<AddCarroComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddCarroComponent]
    });
    fixture = TestBed.createComponent(AddCarroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
