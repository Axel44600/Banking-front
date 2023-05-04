import {Component, Input, OnInit} from '@angular/core';
import {UserService} from "../../services/services/user.service";
import {HelperService} from "../../services/helper/helper.service";
import {UserDto} from "../../services/models/user-dto";

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {


  @Input() isAdmin = false;
  role = 'user';
  user: UserDto = {email: "", firstname: "", lastname: "", password: ""};



  constructor(
    private userService: UserService,
    private helperService: HelperService
  ) {
  }

  ngOnInit(): void {
    if(this.isAdmin) {
      this.role = 'admin';
    }

    this.userService.findById({
      'id': this.helperService.userId
    }).subscribe({
      next: value => {
        this.user = value;
      }
    })

  }
}
