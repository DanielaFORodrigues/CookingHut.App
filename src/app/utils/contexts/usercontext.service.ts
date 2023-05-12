import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserContextService {

  constructor() { }

  clean() {
    window.sessionStorage.clear();
  }

  saveUserId(id: Number)
  {
    window.sessionStorage.setItem('userId', id.toString());
  }

  getCurrentUserId()
  {
    const userId = window.sessionStorage.getItem('userId');
    return userId === null ? null : Number(userId);
  }

  isLogged()
  {
    return this.getCurrentUserId() !== null;
  }
}
