import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DataService } from 'src/app/data-service/data.service';
import { AddSkillComponent } from '../add-skill/add-skill.component';
import { DeleteSkillComponent } from '../delete-skill/delete-skill.component';

@Component({
  selector: 'app-update-skill',
  templateUrl: './update-skill.component.html',
  styleUrls: ['./update-skill.component.css']
})
export class UpdateSkillComponent implements OnInit {
  user_id: any;
  skillSetData: any;
  constructor(private dataService: DataService, public dialog: MatDialog) {
    this.user_id = localStorage.getItem('user_id');
  }

  ngOnInit(): void {
    this.getskillList()
  }
  getskillList() {
    this.dataService.getSkill(this.user_id).subscribe(
      data => this.showSkillSet(data),
    )
  }
  showSkillSet(data: any) {
    console.log(data)
    this.skillSetData = data.data;
  }

  deleteBlog(id: any) {
    let deletedata = {
      id: id,
      body: 'Skill'
    }
    const dialogRef = this.dialog.open(DeleteSkillComponent, {
      width: '400px',
      autoFocus: false,
      data: deletedata
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(result)
      if (result == 'yes') {
        this.dataService.deleteSkill(id).subscribe(
          data => this.showSkillSetData(data),
        )
      }
    });
  }
  showSkillSetData(data: any) {
    if (data.status == true) {
      this.getskillList();
    }
  }
  addSkill() {
    const dialogRef = this.dialog.open(AddSkillComponent, {
      width: '600px',
      autoFocus: false,
      data: { flag: 'Save' }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(result)
      if (result === true) {
        this.getskillList()
      }
    });
  }
  updateSkill() {
    const dialogRef = this.dialog.open(AddSkillComponent, {
      width: '600px',
      autoFocus: false,
      data: { flag: 'Update', dataSkill: this.skillSetData }
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log(result)
      if (result === true) {
        this.getskillList()
      }
    });
  }
}
