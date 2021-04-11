import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { TutorialPagesPage } from './tutorial-pages.page';

describe('TutorialPagesPage', () => {
  let component: TutorialPagesPage;
  let fixture: ComponentFixture<TutorialPagesPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TutorialPagesPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(TutorialPagesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
