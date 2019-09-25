import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddNewMemberComponent } from './add-new-member.component';

describe('AddNewMemberComponent', () => {
  let component: AddNewMemberComponent;
  let fixture: ComponentFixture<AddNewMemberComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddNewMemberComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddNewMemberComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
