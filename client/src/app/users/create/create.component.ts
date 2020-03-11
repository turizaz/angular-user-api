import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {UsersService} from '../services/users.service';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateComponent implements OnInit {
  userForm: FormGroup;
  public errors = false;
  constructor(private uF: FormBuilder, private router: Router, private usersService: UsersService) { }
  async onSubmit(e: Event) {
    e.preventDefault();
    try {
      await this.usersService.create(this.userForm.value).toPromise();
      await this.router.navigate(['users']);
    } catch (e) {
      this.errors = true;
    }
  }
  ngOnInit(): void {
    this.userForm = this.uF.group({
      name: ['', Validators.pattern(/^[A-Z][a-z0-9_-]{3,19}$/)],
      surname: ['', Validators.pattern(/[a-zA-Z]/)],
      email: ['', Validators.pattern(/^\S+@\S+\.\S+$/)],
    });
  }
}
