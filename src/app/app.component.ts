import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

import { BackendService } from './content/helper/backend.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  public title = 'nih-app';
  public users: any;
  public items: any;
  public errors: any;

  private subscription: any;

  public constructor(private readonly backendService: BackendService) {
    this.subscription = new Subscription();
    this.items = [];
    this.errors = ['Loading...'];
  }

  /**
   * Load the users when application starts
   */
  public ngOnInit(): void {
    const sub1 = this.backendService.getUsers().subscribe((data: any) => {
      this.users = [];
      this.errors = [];

      data.forEach((el: any) => {
        this.users.push(el);
      })

      if (this.users.length === 0) {
        this.errors.push('Users not found from API call');
      }
    }, (error) => {
      this.errors = [];
      this.errors.push(error.message);
    });
    this.subscription.add(sub1);
  }

  public ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  /**
   * Remove selected user from the list
   *
   * @param user user to remove
   */
  public removeUser(user: any) {
    this.items = [];
    const index = this.users.indexOf(user);
    this.users.splice(index, 1);
    this.items.push(user);
  }

  public close() {
    this.items = [];
  }

}
