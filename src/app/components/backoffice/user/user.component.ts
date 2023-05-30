import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserContextService } from 'src/app/utils/contexts/usercontext.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  isAdministrator = false;
  selectedTab = 1;

  constructor(
    private userContext: UserContextService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {
    this.activatedRoute.queryParams.subscribe(params => {
      const selectedTab = params['selectedTab'];

      if (selectedTab) {
        this.selectedTab = selectedTab;
      }
    });

    this.isAdministrator = this.userContext.isAdministrator();
  }

  logout() {
    this.userContext.clean();

    this.router.navigate(['home']);
  }

}
