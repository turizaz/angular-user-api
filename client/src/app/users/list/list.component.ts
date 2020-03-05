import { Component, OnInit } from '@angular/core';
import {UsersService} from '../services/users.service';
import UserModel from '../models/user.model';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  public users;
  public searchPattern;
  public page;
  public total;

  constructor(private usersService: UsersService, private router: Router, private activeRoute: ActivatedRoute) {
    this.activeRoute.paramMap.subscribe(params => {
      this.page = params.get('page')
      this.loadUsers(this.page, this.searchPattern)
    })
  }

  applySearch() {
    this.loadUsers(this.page, this.searchPattern)
  }

  async delete(id: number) {
    await this.usersService.delete(id).toPromise()
    this.loadUsers(this.page, this.searchPattern)
  }

  toNumber(val) {
    return Number(val)
  }

  loadUsers(page, searchPattern) {
    this.usersService.get(page, searchPattern).subscribe((users:UserModel & {total: number}[]) => {
      if(users.length) {
        this.total = users[0].total;
        this.users = users;
      } else {
        this.users = []
        this.total = 0
      }
    })
  }

  ngOnInit(): void {

  }
}
