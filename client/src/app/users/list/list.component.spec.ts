import { TestBed, async } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ListComponent } from './list.component';
import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture } from '@angular/core/testing';
import {UsersService} from '../services/users.service';
import {of} from 'rxjs';
import UserModel from '../models/user.model';

let fixture: ComponentFixture<ListComponent>;
let component: ListComponent;
let userService: UsersService;
let spy: jasmine.Spy;
let mockUsers: UserModel[];

describe('List Component', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule, HttpClientModule],
      providers: [UsersService],
      declarations: [ListComponent],
    }).compileComponents().then(() => {
      fixture = TestBed.createComponent(ListComponent);
      component = fixture.componentInstance;
      userService = fixture.debugElement.injector.get(UsersService);
      mockUsers = [
        {name: 'John', surname: 'Doe', email: 'john.doe@mail.com', total: 2},
        {name: 'Mao', surname: 'Zedong', email: 'mao.zedong@mail.com', total: 2 }
      ];
      spy = spyOn(userService, 'get').and.returnValue(of(mockUsers));
      fixture.detectChanges();
    });
  }));

  it('should create component', () => {
    expect(component).toBeTruthy();
    expect(spy.calls.count()).toEqual(1);
  });

  it('should get users list', () => {
    component.loadUsers(1, null);
    expect(spy.calls.count()).toEqual(2);
    expect(component.users).toEqual(mockUsers);
  });
});
