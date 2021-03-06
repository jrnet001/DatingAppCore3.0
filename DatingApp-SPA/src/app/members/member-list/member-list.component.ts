import { Pagination, PaginationResult } from './../../_models/pagination';
import { ActivatedRoute } from '@angular/router';
import { AlertifyService } from '../../_services/alertify.service';
import { UserService } from '../../_services/user.service';
import { User } from '../../_models/user';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-member-list',
  templateUrl: './member-list.component.html',
  styleUrls: ['./member-list.component.css']
})
export class MemberListComponent implements OnInit {
  users: User[];
  pagination: Pagination;
  user: User = JSON.parse(localStorage.getItem('user'));
  genderList = [{ value: 'male', display: 'Males' }, { value: 'female', display: 'Females' }]
  userParams: any = {};


  constructor(
    private userService: UserService,
    private alertifyService: AlertifyService,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    //  this.loadUsers();
    this.route.data.subscribe(data => {
      this.users = data['users'].result;
      this.pagination = data['users'].pagination;
    });

    this.userParams.gender = this.user.gender === 'female' ? 'male' : 'female';
    this.userParams.minAge = 18;
    this.userParams.maxAge = 99;
    this.userParams.orderBy = 'lastActive';

  }
  resetFilters() {
    this.userParams.gender = this.user.gender === 'female' ? 'male' : 'female';
    this.userParams.minAge = 18;
    this.userParams.maxAge = 99;
    this.loadUsers();
  }
  pageChanged(event: any): void {
    this.pagination.currentPage = event.page;
    this.loadUsers();
  }

  checkAgeRanges() {
    if (this.userParams.minAge < 0 || this.userParams.minAge > 99) {
      this.alertifyService.error('Min Age must be greater then 0 and less the 99');
      this.resetFilters();

    }

    if (this.userParams.maxAge < 0 || this.userParams.maxAge > 99) {
      this.alertifyService.error('Max Age must be greater then 0 and less the 99');
      this.resetFilters();

    }
  }
  loadUsers() {
    this.checkAgeRanges();
    this.userService.getUsers(this.pagination.currentPage, this.pagination.itemsPerPage, this.userParams).subscribe(
      (res: PaginationResult<User[]>) => {
        this.users = res.result;
        this.pagination = res.pagination;
      },
      error => {
        this.alertifyService.error(error);
      }
    );
  }
}
