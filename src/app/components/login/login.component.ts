import { Component, OnInit } from '@angular/core';
import { LoginInfo } from './login-info';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { StorageService } from '../../services/storage.service';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { MaterialModule } from '../../material.module';


@Component({
  selector: 'fn-login',
  standalone: true,
  imports: [MaterialModule,FormsModule,ReactiveFormsModule,ReactiveFormsModule,TranslateModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
  providers: [MatSnackBar]
})
export class LoginComponent implements OnInit {
constructor(private fb : FormBuilder,
            private authService : AuthService,
            private matSnackBar : MatSnackBar,
            private router : Router,
            private tranlate : TranslateService){}

loginInfo : LoginInfo = new LoginInfo();
loginForm! : FormGroup;
hide = true;
ngOnInit(): void {
 this.loginForm = new FormGroup({
  username : new FormControl,
  password: new FormControl
 })
 this.loginForm = this.fb.group({
  username : ['' , [Validators.required]],
  password : ['',[Validators.required,Validators.minLength(8)]]
 });
}
login() {
  this.authService.login(this.loginForm.value).subscribe({
    next: (response) => {
      this.matSnackBar.open(response.message, 'Close', {
        duration: 5000,
        horizontalPosition: 'center',
      });
      this.router.navigate(['/projects']);
    },
    error: (error) => {
      this.matSnackBar.open(error.error.message, 'Close', {
        duration: 5000,
        horizontalPosition: 'center',
      });
    },
  });
}
}
