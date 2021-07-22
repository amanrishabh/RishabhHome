import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { MyauthService } from 'src/app/auth-services/authservice';
import { DataService } from 'src/app/data-service/data.service';
import { FormGroup, FormControl, Validators, FormBuilder }  from '@angular/forms';

@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.component.css']
})
export class RegisterPageComponent implements OnInit {
  constructor(private snackBar: MatSnackBar,private myRoute: Router,
    private formBuilder: FormBuilder, private dataService: DataService,private authService2: MyauthService) { }

   sginupForm:any= FormGroup;

  ngOnInit() {
   this.createForm();
  }

  private createForm() {
  this.sginupForm = this.formBuilder.group({
    name: new FormControl('', {
      validators: [Validators.required, Validators.maxLength(55)],
      updateOn: 'change'
    }),
    email: new FormControl('', {
      validators: [Validators.required, Validators.maxLength(55)],
      updateOn: 'change'
    }),

    phonenumber: new FormControl('', {
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
getError() {
  return ' *This is required feild'
}
cancel(): void {
  this.sginupForm.reset();
}

onSubmit() {
    this.dataService.registerData(this.sginupForm.value).subscribe(
      data => this.closeDialog(data),
      err => console.log(err)
    )
}

closeDialog(data:any) {
  console.log(data)
  if(data.status === true){
    this.myRoute.navigate(['/login']);
    this.openSnackBar(data.message, 'Dissmiss')
    this.sginupForm.reset();
  }

  if(data.status ===false){
    this.openSnackBar(data.message, 'Dissmiss')
  }
  }
}
