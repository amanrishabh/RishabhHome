import {AfterViewInit, Component, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';

export interface PeriodicElement {
  name: string;
  position: number;
  skill: string;
  department: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {position: 1, name: 'Aman jain', skill: 'Node js, Angular js', department: 'Frontend '},
  {position: 2, name: 'Ram',skill: 'Node js, Angular js',department: 'Frontend'},
  {position: 3, name: 'Radhe', skill: 'Node js ,Angular js',department: 'Backend'},
  {position: 4, name: 'Veer',skill: 'Node js ,Angular js', department: 'Frontend'},
  {position: 5, name: 'Akshra', skill: 'Node js ,Angular js', department: 'Account'},
  {position: 6, name: 'Raju', skill: 'Node js, Angular js', department: 'Frontend'},
  {position: 7, name: 'Ramesh', skill: 'Node js, Angular js', department: 'HR'},
  {position: 8, name: 'Delta', skill: 'Node js, Angular js', department: 'Frontend'},
  {position: 9, name: 'Ram', skill: 'Node js ,Angular js', department: 'Frontend'},
  {position: 10, name: 'Neon', skill: 'Node js, Angular js', department: 'Frontend'},
];

@Component({
  selector: 'app-users-info',
  templateUrl: './users-info.component.html',
  styleUrls: ['./users-info.component.css']
})
export class UsersInfoComponent implements AfterViewInit {
  displayedColumns: string[] = [ 'position','name', 'skill', 'department'];
  dataSource :any;
  @ViewChild(MatPaginator)
  paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor() {
    // Assign the data to the data source for the table to render
    this.dataSource = new MatTableDataSource(ELEMENT_DATA);
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
