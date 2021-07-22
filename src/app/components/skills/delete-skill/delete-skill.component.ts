
import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
@Component({
  selector: 'app-delete-skill',
  templateUrl: './delete-skill.component.html',
  styleUrls: ['./delete-skill.component.css']
})
export class DeleteSkillComponent implements OnInit {
  id: any;
  constructor(public dialogRef: MatDialogRef<DeleteSkillComponent>,
    @Inject(MAT_DIALOG_DATA) public confrimdata: any) { }

  ngOnInit() {
  }
  deleteResponse(data: any) {
    this.dialogRef.close(data);
  }

}