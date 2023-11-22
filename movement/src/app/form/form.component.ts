import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

interface Product {
  productCode: string;
  productDescription: string;
}

interface Cosif {
  cosifCodeClassification: string;
  cosifCode: string;
}

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit {
  form!: FormGroup;
  products!: Product[];
  cosifs!: Cosif[];

  constructor(private fb: FormBuilder, private http: HttpClient) { }

  ngOnInit(): void {
    this.initializeForm();
    this.getProducts();
  }

  initializeForm(): void {
    this.form = this.fb.group({
      month: ['', Validators.required],
      year: ['', Validators.required],
      productCode: ['', Validators.required],
      cosifCode: ['', Validators.required],
      value: ['', Validators.required],
      description: ['', Validators.required],
    });
    this.form.disable();
  }

  getProducts(): void {
    this.http.get<Product[]>('http://localhost:8080/product/products').subscribe((data) => {
      this.products = data;
    });
  }

  selectedProductCode: string = '';

  getCosifs(event: any) {

    const productCode = event.target.value;

    if (productCode) {

      this.http.get<Cosif[]>(`http://localhost:8080/cosif/cosifbyproduct/${productCode}`).subscribe((data) => {
        this.cosifs = data;
      });
    }
  }

  cleanForm(): void {
    this.form.reset();
  }

  newForm(): void {
    this.form.enable();
  }

  @Output() movementInclude = new EventEmitter<void>();

  addForm(): void {
    const formData = this.form.value;
    this.http.post('http://localhost:8080/movement', formData).subscribe(() => {
      this.cleanForm();
      this.form.disable();
      this.movementInclude.emit();
    });
  }

}
