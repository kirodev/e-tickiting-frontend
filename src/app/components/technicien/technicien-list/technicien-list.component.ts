import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

import { Technicien } from 'src/app/models/technicien'
import { TechnicienService } from 'src/app/services/technicien.service';

@Component({
  selector: 'app-technicien-list',
  templateUrl: './technicien-list.component.html',
  styleUrls: ['./technicien-list.component.css']
})
export class TechnicienListComponent implements OnInit {

  ELEMENT_DATA: Technicien[] = []

  displayedColumns: string[] = ['position', 'name', 'weight', 'symbol', 'acoes'];
  dataSource = new MatTableDataSource<Technicien>(this.ELEMENT_DATA);

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private technicienService: TechnicienService) { }

  ngOnInit(): void {
    this.findAll();
  }

  findAll() {
    this.technicienService.findAll().subscribe(resposta => {
      this.ELEMENT_DATA = resposta;
      this.dataSource = new MatTableDataSource<Technicien>(this.ELEMENT_DATA);
      this.dataSource.paginator = this.paginator;
    })
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

}
