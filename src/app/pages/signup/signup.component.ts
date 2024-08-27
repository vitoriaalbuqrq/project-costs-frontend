import { Component } from '@angular/core';
import { DefaultLoginLayoutComponent } from '../../components/default-login-layout/default-login-layout.component';
import { FormControl, FormGroup, FormRecord, ReactiveFormsModule, Validators } from '@angular/forms';
import { PrimaryInputComponent } from '../../components/primary-input/primary-input.component';
import { Router } from '@angular/router';
import { LoginService } from '../../services/login.service';
import { ToastrService } from 'ngx-toastr';
import { MatIconModule } from '@angular/material/icon';
import { LoadingspinnerComponent } from "../../components/loadingspinner/loadingspinner.component";
import { CommonModule } from '@angular/common';

interface SignupForm {
  name: FormControl,
  email: FormControl,
  password: FormControl,
  passwordConfirm: FormControl
}

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [
    CommonModule,
    DefaultLoginLayoutComponent,
    ReactiveFormsModule,
    PrimaryInputComponent,
    MatIconModule,
    LoadingspinnerComponent
],
  providers: [
    LoginService
  ],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss'
})
export class SignUpComponent {
  signupForm!: FormGroup<SignupForm>;
  isLoading: boolean = false;

  constructor(
    private router: Router,
    private loginService: LoginService,
    private toastService: ToastrService,
  ){
    this.signupForm = new FormGroup({
      name: new FormControl('', [Validators.required, Validators.minLength(3)]),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(6)]),
      passwordConfirm: new FormControl('', [Validators.required, Validators.minLength(6)]),
    })
  }

  submit() {
    if (this.signupForm.valid) {
      this.isLoading = true;
      this.loginService.signup(
        this.signupForm.value.name,
        this.signupForm.value.email,
        this.signupForm.value.password
      ).subscribe({
        next: () => {
          this.toastService.success("Cadastro realizado com sucesso!");
          this.router.navigate(['login']);
        },
        error: () => {
          this.toastService.error("Erro inesperado! Tente novamente mais tarde");
        },
        complete: () => {
          this.isLoading = false;
        }
      });
    }
  }

  navigate(){
    this.router.navigate(["login"])
  }
}