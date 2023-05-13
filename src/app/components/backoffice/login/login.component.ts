import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { MessageService } from 'primeng/api';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UserContextService } from 'src/app/utils/contexts/usercontext.service';
import { HttpErrorResponse } from '@angular/common/http';

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

  constructor(
    private userContext: UserContextService,
    private userService:UserService,
    private router: Router,
    private messageService: MessageService) { }

  ngOnInit() {
  }

  login() {

    this.userLogin= this.form.value;
    this.userService.getLogin(this.userLogin).subscribe( response => {

      if(response != undefined){
        this.userContext.save(response);

        this.router.navigate(['user']);
      } else {
        this.showFailedLoginMessage();
      }
    },
    (error: HttpErrorResponse) => {
        this.showFailedLoginMessage();
    });
  }

  showFailedLoginMessage() {
    this.messageService.add({ severity: 'error', summary: 'Erro de Login', detail:'Email ou Password Errados'});
    this.form.reset;
  }

}
