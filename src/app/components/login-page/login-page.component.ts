import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { MyauthService } from 'src/app/auth-services/authservice';
import { DataService } from 'src/app/data-service/data.service';
import { FormGroup, FormControl, Validators, FormBuilder }  from '@angular/forms';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent implements OnInit {

  userData: any;
  loginForm: any= FormGroup;

  constructor(
    private formBuilder: FormBuilder, private dataService: DataService,
    private snackBar: MatSnackBar, public router: Router, private authService: MyauthService) { }

  ngOnInit() {
    this.createForm();
  }
  // create reactive form

  private createForm() {
    this.loginForm = this.formBuilder.group({
      email: new FormControl('', {
        validators: [Validators.required, Validators.maxLength(55)],
        updateOn: 'change'
      }),
      password: new FormControl('', {
        validators: [Validators.required, Validators.maxLength(55)],
        updateOn: 'change'
      }),
    });
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 3000,
      panelClass: ['app-bottom-snackbar']
    });
  }

  ErrorMessage(data:any) {
    return  data +'  is required feild'
  }
  cancel(): void {
    this.loginForm.reset();
  }

  onSubmit() {
    if (this.loginForm.valid) {
      console.log(this.loginForm.value)
      this.dataService.loginData(this.loginForm.value).subscribe(
        data => this.closeloginFrom(data),
        err => console.log(err)
      )
    }
  }

  closeloginFrom(data:any) {
    if (data.status === true) {
      this.userData=data.data
      localStorage.setItem('user_id', this.userData.user_id);
      this.authService.sendToken(data.token)
      this.router.navigate(['/dashboard']);
      this.openSnackBar(data.message, 'Dissmiss')
      this.loginForm.reset();
    }

    if (data.status === false) {
      this.openSnackBar(data.message, 'Dissmiss')
    }
  }
}
