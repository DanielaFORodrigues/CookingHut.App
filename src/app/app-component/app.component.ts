import { Component } from '@angular/core';
import { UserContextService } from '../utils/contexts/usercontext.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'CookingHutApp';

  constructor(private userContext: UserContextService) { }

  ngOnInit() {

  }

  isUserLogged() {
    return this.userContext.isLogged();
  }
}
