import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MyauthService } from 'src/app/auth-services/authservice';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(private authService: MyauthService,public dialog: MatDialog,) { }

  ngOnInit(): void {
  }
  profile(){

  }
  logout(){
    this.authService.logout();
  }

}
