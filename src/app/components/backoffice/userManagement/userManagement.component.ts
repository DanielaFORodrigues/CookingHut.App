import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';
import { UserContextService } from 'src/app/utils/contexts/usercontext.service';

@Component({
  selector: 'app-userManagement',
  templateUrl: './userManagement.component.html',
  styleUrls: ['./userManagement.component.css']
})
export class UserManagementComponent implements OnInit {

  users!: User[] | null;

  constructor(
    private userContext: UserContextService,
    private userService: UserService,
    private router: Router) { }

  ngOnInit() {
    const session = this.userContext.getCurrentSession();

    if (session == null || session.isAdministrator == false) {
      this.router.navigate(['home']);
    }

    this.userService.getAll().subscribe(response => {
      this.users = response;

      const myUserIndex = this.users.findIndex(u => u.id == session?.id)
      if (myUserIndex > -1) {
        this.users.splice(myUserIndex, 1);
      }
    },
    (error: HttpErrorResponse) => {
      this.router.navigate(['home']);
    });
  }

  blockOrUnblock(userId: number) {
    const isBlocked = this.users?.find(u => u.id == userId)?.isBlocked;

    if (isBlocked !== null) {

      this.userService.block(userId, !isBlocked).subscribe(response => {

        if (isBlocked) {
          alert("User Desbloqueado Com Sucesso!");
        }
        else {
          alert("User Bloqueado Com Sucesso!");
        }

        window.location.reload();
      },
      (error: HttpErrorResponse) => {
        alert("Não Foi Possível Efectuar a Operação!");
      });
    }
  }

  promoteOrUnpromoteAdmin(userId: number) {
    const isAdministrator = this.users?.find(u => u.id == userId)?.isAdministrator;

    if (isAdministrator !== null) {

      this.userService.promoteAdmin(userId, !isAdministrator).subscribe(response => {

        if (isAdministrator) {
          alert("User Despromovido Com Sucesso!");
        }
        else {
          alert("User Promovido Com Sucesso!");
        }

        window.location.reload();
      },
      (error: HttpErrorResponse) => {
        alert("Não Foi Possível Efectuar a Operação!");
      });
    }
  }

}
