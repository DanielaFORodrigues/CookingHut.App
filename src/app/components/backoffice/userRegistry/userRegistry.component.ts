import { DatePipe } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
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

  userRegistry!: any;

  form = new FormGroup({
    name: new FormControl('',[Validators.required]),
    surname: new FormControl('',[Validators.required]),
    birthDate: new FormControl('',[Validators.required]),
    country: new FormControl('',[Validators.required]),
    city: new FormControl('',[Validators.required]),
    email: new FormControl('',[Validators.required]),
    password: new FormControl('',[Validators.required]),
    confirmPassword: new FormControl('',[Validators.required]),
  });

  constructor(private userService: UserService,
     private router: Router,
     private messageService: MessageService ) { }


  ngOnInit() {
  }

  register() {
    this.userRegistry=this.form.value;

    if (this.userRegistry.password === this.userRegistry.confirmPassword) {
      this.userService.register(this.userRegistry).subscribe( response => {
        Constants.userSession = response;

        if(response != undefined) {
          alert("Utilizador Registado Com Sucesso!");
          this.router.navigate(['login']);
        }
        else {
          this.showFailedRegisterMessage();
        }
      },
      (error: HttpErrorResponse) => {
          this.showFailedRegisterMessage();
      });
    }
    else {
      alert("A Password e Confirmação de Password Não Coincidem!");
    }
  }

  showFailedRegisterMessage() {
    this.messageService.add({ severity: 'error', summary: 'Erro de registo', detail: 'Email Inválido ou Já Existente.' });
  }

  validatePassword() {
  }

}

