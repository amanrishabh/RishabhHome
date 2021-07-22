import { Component, Inject, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { MyauthService } from 'src/app/auth-services/authservice';
import { DataService } from 'src/app/data-service/data.service';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-add-skill',
  templateUrl: './add-skill.component.html',
  styleUrls: ['./add-skill.component.css']
})
export class AddSkillComponent implements OnInit {
  updateFlag: any;
  updateValue: any;
  constructor(private snackBar: MatSnackBar, private myRoute: Router, public dialog: MatDialog, @Inject(MAT_DIALOG_DATA) public flagForm: any, public dialogRef: MatDialogRef<AddSkillComponent>,
    private formBuilder: FormBuilder, private dataService: DataService, private authService2: MyauthService) { }
  skillListdataForm: any = FormGroup;
  ngOnInit() {
    this.updateFlag = this.flagForm.flag;
    if (this.updateFlag == "Update") {
      this.updateValue = this.flagForm.dataSkill[0];
    }
    this.createForm();
  }
  skill = new FormControl();

  skillList: string[] = ['Angular Js', 'Angular ', 'Node js', 'Go Lang', 'Reactjs', 'java']
  private createForm() {
    this.skillListdataForm = this.formBuilder.group({
      experience: new FormControl('', {
        validators: [Validators.required, Validators.maxLength(55)],
        updateOn: 'change'
      }),
      primary_skill: new FormControl('', {
        validators: [Validators.required, Validators.maxLength(55)],
        updateOn: 'change'
      }),

      second_skill: new FormControl('', {
        validators: [Validators.required, Validators.maxLength(55)],
        updateOn: 'change'
      }),
    });

    if (this.updateValue && this.updateValue.skill_id !== undefined) {
      this.skillListdataForm.controls['experience'].setValue(this.updateValue.experience)
      this.skillListdataForm.controls['second_skill'].setValue(JSON.parse(this.updateValue.second_skill))
      this.skillListdataForm.controls['primary_skill'].setValue(JSON.parse(this.updateValue.primary_skill))
    }
  }
  ErrorMessage(data:any) {
    return  data +'  is required feild'
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
    this.dialog.closeAll()
    this.skillListdataForm.reset();
  }
  onSubmit() {
    let userData = {
      user_id: localStorage.getItem('user_id'),
      primary_skill: this.skillListdataForm.controls['primary_skill'].value.toString(),
      second_skill: this.skillListdataForm.controls['second_skill'].value.toString(),
      experience: this.skillListdataForm.controls['experience'].value,
    }
    this.dataService.addskillset(userData).subscribe(
      data => this.closeDialog(data),
      err => console.log(err)
    )
    this.skillListdataForm.reset();
  }

  onUpdate() {
    let userData = {
      user_id: localStorage.getItem('user_id'),
      skill_id: this.updateValue.skill_id,
      primary_skill: this.skillListdataForm.controls['primary_skill'].value.toString(),
      second_skill: this.skillListdataForm.controls['second_skill'].value.toString(),
      experience: this.skillListdataForm.controls['experience'].value,
    }
    this.dataService.updateskillset(userData).subscribe(
      data => this.closeDialog(data),
      err => console.log(err)
    )
    this.skillListdataForm.reset();
  }

  closeDialog(data: any) {
    console.log(data)
    if (data.status === true) {
      this.openSnackBar(data.message, 'Dissmiss')
      this.dialogRef.close(true)
    }

    if (data.status === false) {
      this.openSnackBar(data.message, 'Dissmiss')
    }
  }
}
