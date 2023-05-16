import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserContextService } from 'src/app/utils/contexts/usercontext.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  selectedTab = 1;

  constructor(
    private userContext: UserContextService,
    private router: Router
  ) { }

  ngOnInit() {
  }

  logout() {
    this.userContext.clean();

    this.router.navigate(['home']);
  }

}
