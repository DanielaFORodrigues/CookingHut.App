import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';
import { Constants } from 'src/app/utils/pipes/constant';

@Component({
  selector: 'app-register',
  templateUrl: './userRegistry.component.html',
  styleUrls: ['./userRegistry.component.css'],
  providers: [MessageService]
})
export class UserRegistryComponent implements OnInit {

  userRegistry: User = {
    id: 0,
    name: '',
    surname: '',
    birthDate: new Date(),
    country: '',
    city: "",
    email: '',
    password: '',
    confirmPassword:'',
    isAdministrator: false,
    isBlocked: false,
  };


  constructor(private userService: UserService, private router: Router, private messageService: MessageService) { }


  ngOnInit() {
  }

register() {
  this.userService.register(this.userRegistry).subscribe( response => {
    Constants.userSession = response;
    if(response != undefined)
      this.router.navigate(['login']);
    else
      this.messageService.add({ severity: 'error', summary: 'Erro de registo', detail: 'Email Inválido ou já Existente' });
  });

  
}
validatePassword() {

}

}

