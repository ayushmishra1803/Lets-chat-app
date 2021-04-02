import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ChattingLongHoldMenuComponent } from './chatting-long-hold-menu.component';

describe('ChattingLongHoldMenuComponent', () => {
  let component: ChattingLongHoldMenuComponent;
  let fixture: ComponentFixture<ChattingLongHoldMenuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChattingLongHoldMenuComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ChattingLongHoldMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
