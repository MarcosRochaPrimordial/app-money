import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/core/services/auth.service';
import { UserStorageService } from 'src/app/core/services/user-storage.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {

  userImageProfile = '';
  userNameProfile = '';

  constructor(
    private userStorage: UserStorageService,
    private authService: AuthService,
  ) { }

  ngOnInit(): void {
    this.userImageProfile = this.userStorage.user.photoUrl;
    this.userNameProfile = this.userStorage.user.name;
  }

  signout() {
    this.authService.singout();
  }

}
