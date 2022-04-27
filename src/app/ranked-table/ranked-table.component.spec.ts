import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RankedTableComponent } from './ranked-table.component';

describe('RankedTableComponent', () => {
  let component: RankedTableComponent;
  let fixture: ComponentFixture<RankedTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RankedTableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RankedTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
