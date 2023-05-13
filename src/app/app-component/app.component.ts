import { Component } from '@angular/core';
import { UserContextService } from '../utils/contexts/usercontext.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'CookingHutApp';

  constructor(
    private userContext: UserContextService,
    private router: Router) { }

  ngOnInit() {

  }

  isUserLogged() {
    return this.userContext.isLogged();
  }

  logout() {
    this.userContext.clean();

    this.router.navigate(['home']);
  }

  getUserNameToDisplay() {
    return this.userContext.getCurrentSession()?.name;
  }
}
