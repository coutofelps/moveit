import { Component } from '@angular/core';
import { DefaultLoginLayoutComponent } from '../../components/default-login-layout/default-login-layout.component';
import { FormGroup, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { PrimaryInputComponent } from '../../components/primary-input/primary-input.component';
import { Router } from '@angular/router';
import { LoginService } from '../../services/login.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    DefaultLoginLayoutComponent,
    ReactiveFormsModule,
    PrimaryInputComponent
  ],
  providers: [
    LoginService
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})

export class LoginComponent {
  loginForm!: FormGroup;

  constructor(
    private router: Router,
    private loginService: LoginService
  ) {
    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(6)])
    })
  }

  submit() {
    this.loginService.login(this.loginForm.value.email, this.loginForm.value.password).subscribe({
      next: () => console.log("Success!"),
      error: () => console.log("Error.")
    })
  }

  navigate() {
    this.router.navigate(['/signup'])
  }
}
