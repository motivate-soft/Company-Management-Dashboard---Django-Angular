import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GeneralSettingComponent } from './general-setting.component';

describe('GeneralSettingComponent', () => {
  let component: GeneralSettingComponent;
  let fixture: ComponentFixture<GeneralSettingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GeneralSettingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GeneralSettingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
