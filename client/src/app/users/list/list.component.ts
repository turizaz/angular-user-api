import {Component, OnDestroy, OnInit} from '@angular/core';
import { UsersService } from '../services/users.service';
import UserModel from '../models/user.model';
import {ActivatedRoute, Router} from '@angular/router';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit, OnDestroy {
  public users: UserModel[];
  public searchPattern: string;
  public page: string;
  public total: number;
  private searchService: Subscription;
  private itemsPerPage = 10;
  public errors = false;
  constructor(private usersService: UsersService, private router: Router, private activeRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activeRoute.paramMap.subscribe(params => {
      this.page = params.get('page');
      this.loadUsers(this.page, this.searchPattern);
    });
  }

  ngOnDestroy(): void {this.searchService.unsubscribe(); }

  async applySearch(): Promise<boolean> {
    try {
      await this.loadUsers(this.page, this.searchPattern);
      return true;
    } catch (e) {
      return false;
    }
  }

  async delete(id: number): Promise<boolean> {
    try {
      await this.usersService.delete(id).toPromise();
      this.loadUsers(this.page, this.searchPattern);
      return true;
    } catch (e) {
      return false;
    }
  }

  toNumber(val): number {
    return Number(val);
  }

  loadUsers(page, searchPattern): void {
    this.searchService = this.usersService.get(page, searchPattern).subscribe((users: UserModel[]) => {
      this.resetUsersList();
      if (users.length) {
        this.total = users[0].total;
        this.users = users;
      }
    }, error => {
      this.resetUsersList();
      this.errors = error;
    });
  }

  private resetUsersList(): void {
    this.users = [];
    this.total = 0;
  }

  hasPrev(pageString: string, totalString: number | string): boolean {
    const page = this.toNumber(pageString);
    const total = this.toNumber(totalString);
    return (page * this.itemsPerPage) < total && page > 0;
  }
  hasNext(pageString: string, totalString: string| number): boolean {
    const page = this.toNumber(pageString);
    const total = this.toNumber(totalString);
    return ((page + 1) * this.itemsPerPage) < total;
  }
}
