import { TestBed, async } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { CreateComponent } from './create.component';
import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture } from '@angular/core/testing';
import {UsersService} from '../services/users.service';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {of} from 'rxjs';
let fixture: ComponentFixture<CreateComponent>;
let component: CreateComponent;
let userService: UsersService;
let spy: jasmine.Spy;
import { Router } from '@angular/router';
const mockRouter = {
  navigate: jasmine.createSpy('navigate')
};

describe('Create Component', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule, HttpClientModule, FormsModule, ReactiveFormsModule],
      providers: [UsersService, { provide: Router, useValue: mockRouter}],
      declarations: [CreateComponent],
    }).compileComponents().then(() => {
      fixture = TestBed.createComponent(CreateComponent);
      userService = fixture.debugElement.injector.get(UsersService);
      spy = spyOn(userService, 'create').and.returnValue(of(null));
      component = fixture.componentInstance;
      fixture.detectChanges();
    });
  }));

  it('should create component', () => {
    expect(component).toBeTruthy();
  });

  it('form invalid when input not properly', () => {

    expect(component.userForm.valid).toBeFalsy();
    component.userForm.controls.email.setValue('test@test.com');
    component.userForm.controls.name.setValue('john');
    component.userForm.controls.surname.setValue('Doe');
    expect(component.userForm.valid).toBeFalsy();

    component.userForm.controls.email.setValue('test@test');
    component.userForm.controls.name.setValue('John');
    component.userForm.controls.surname.setValue('Doe');
    expect(component.userForm.valid).toBeFalsy();

  });

  it('form valid when input properly', async () => {
    expect(component.userForm.valid).toBeFalsy();
    component.userForm.controls.email.setValue('test@test.com');
    component.userForm.controls.name.setValue('John');
    component.userForm.controls.surname.setValue('Doe');
    expect(component.userForm.valid).toBeTruthy();

    await component.onSubmit(new Event('input'));
    expect(spy.calls.count()).toEqual(1);
  });

});
