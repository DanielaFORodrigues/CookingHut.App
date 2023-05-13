import { Injectable } from '@angular/core';
import { Login } from 'src/app/models/login';
import { Session } from 'src/app/models/session';

@Injectable({
  providedIn: 'root'
})
export class UserContextService {

  userSessionStoreField: string = "userSession";

  constructor() { }

  clean() {
    window.localStorage.clear();
  }

  save(user: Login)
  {
    const session: Session = {
      id: user.id,
      name: user.name,
      email: user.email,
    };

    window.localStorage.setItem(this.userSessionStoreField, JSON.stringify(session));
  }

  getCurrentSession() : Session | null
  {
    const sessionJson = window.localStorage.getItem(this.userSessionStoreField);

    if (sessionJson === null) {
      return null;
    }

    return JSON.parse(sessionJson);
  }

  isLogged()
  {
    return this.getCurrentSession() !== null;
  }
}
