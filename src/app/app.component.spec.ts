import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import { HttpClientTestingModule } from '@angular/common/http/testing'
import { HeaderComponent } from './layout/header/header.component';
import { BackendService } from './content/helper/backend.service';
import { of, throwError } from 'rxjs';
import { CardComponent } from './content/card/card.component';

describe('AppComponent', () => {
  let backendServiceSpy: jasmine.SpyObj<BackendService>;
  const spy = jasmine.createSpyObj('BackendService', ['getUsers']);

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        HttpClientTestingModule
      ],
      declarations: [
        AppComponent,
        HeaderComponent,
        CardComponent
      ],
      providers: [
        {
          provide: BackendService, useValue: spy
        }
      ]
    }).compileComponents();

    backendServiceSpy = TestBed.inject(BackendService) as jasmine.SpyObj<BackendService>;
  });

  it('should create the app', () => {
    backendServiceSpy.getUsers.and.returnValue(of([]));
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as title 'nih-app'`, () => {
    backendServiceSpy.getUsers.and.returnValue(of([]));
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const app = fixture.componentInstance;
    expect(app.title).toEqual('nih-app');
  });

  it('should remove item', () => {
    backendServiceSpy.getUsers.and.returnValue(of([{ id: 1 }, { id: 2 }]));
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const component = fixture.componentInstance;

    component.removeUser({ id: 2 });
    expect(component.users.length).toEqual(1);
  });

  it('should close the banner', () => {
    backendServiceSpy.getUsers.and.returnValue(of([]));
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const component = fixture.componentInstance;

    component.close();
    expect(component.items.length).toEqual(0);
  });

  it('should generate error message when API fails', () => {
    backendServiceSpy.getUsers.and.returnValue(throwError({ message: 'Error' }));
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const component = fixture.componentInstance;

    component.close();
    expect(component.errors[0]).toEqual('Error');
  });

});
