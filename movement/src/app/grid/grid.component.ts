import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

interface Movement {
  month: string;
  year: string;
  productCode: string;
  productDescription: string;
  releaseNumber: string;
  description: string;
  value: string;
}

@Component({
  selector: 'app-grid',
  templateUrl: './grid.component.html',
  styleUrls: ['./grid.component.scss'],
})
export class GridComponent implements OnInit {

  movements!: Movement[];

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.getMovements();
  }

  getMovements(): void {
    this.http.get<Movement[]>('http://localhost:8080/movement/movements').subscribe((data) => {
      this.movements = data;
    });
  }
}
