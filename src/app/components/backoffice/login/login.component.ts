import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Login } from 'src/app/models/login';
import { UserService } from 'src/app/services/user.service';
import { Constants } from 'src/app/utils/pipes/constant';
import { MessageService } from 'primeng/api';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [MessageService]
})
export class LoginComponent implements OnInit {

  userLogin!: any;

  form = new FormGroup({
    email: new FormControl('',[Validators.required]),
    password: new FormControl('',[Validators.required]),
  });

  messageService:any;

  constructor(private userService:UserService, private router: Router, messageService: MessageService) { }

  ngOnInit() {

  }

  login() {
    console.log(this.messageService);
    this.userLogin= this.form.value;
    this.userService.getLogin(this.userLogin).subscribe( response => {
      Constants.userSession = response;
      if(response != undefined){
        this.router.navigate(['user']);
      } else {
        this.messageService.add({ severity: 'error', summary: 'Erro de Login', detail: 'Email ou Password Errados' });
      }
    });

  }

}
