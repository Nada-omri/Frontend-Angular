import { Component, OnInit } from '@angular/core';
import { produitService } from './produit.Service';
import { Product } from '../shared/models/product';
import { Category } from '../shared/models/Category';
import { FormGroup, FormBuilder, Validator, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { FileService } from '../services/file.service';
import { API_URLS } from '../config/api.url.config';
import { HttpErrorResponse, HttpEvent, HttpEventType } from '@angular/common/http';
import { saveAs } from 'file-saver';
import { CategoryService } from '../services/category/category.service';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ConfirmationDialogComponent } from '../confirmation-dialog/confirmation-dialog.component';
import { Brand } from '../shared/models/Brand';
import { BrandService } from '../services/brand/brand.service';
@Component({
  selector: 'app-produits',
  templateUrl: './produits.component.html',
  styleUrls: ['./produits.component.css']
})
export class ProduitsComponent implements OnInit {
  showConfirmationSection = false;
  filenames: string[] = [];

  fileStatus = { status: '', requestType: '', percent: 50 };
  produits!: Product[];
  categories!:Category[];
  brands!:Brand[];
  produitForm: FormGroup;
  operation:string='add';
  selectedProduit: Product = { name: "", description: "", price: 0, category: { id: 0, name: "" }, quantity: 0, brand: { id: 0, name: "" } };

 
 userFile:any;
 imgURL:any;
 Url:string =API_URLS.IMAGE_URL;
 
 public message !: string;
 public imagePath!:any;

  constructor(private produitService: produitService, private fb: FormBuilder, private route :ActivatedRoute,private fileService:FileService ,private dialog: MatDialog, private categoryService:CategoryService,private brandService:BrandService) {
    this.produitForm = this.fb.group({
      name: ['', Validators.required],
      description: '',
      price: '',
      categoryId: '',
      quantity:'',
      brandId:''

    });
  }

  ngOnInit() {
    this.initProduit();
    this.loadProduits();
    this.getCategories();
    this.getbrands();

  }
  
  
  createForm(){
    this.produitForm= this.fb.group({
      name:['',Validators.required],
      description:'',
      price:0,
     brandId:0,
     sellerId:'',
     image:'',
     categoryId:0,
     quantity:0,
  


    });
  }
  openConfirmationDialog() {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent);
  
    dialogRef.afterClosed().subscribe(result => {
      console.log('Dialog Result:', result);
      if (result) { 
        console.log("hellooo");
        this.deleteProduit();
      } else {
        console.log("hii");
      }
    });
  }
  


  loadProduits() {
    this.produitService.getProduits().subscribe(
      (res :any) => (this.produits = res),
      (error:any) => { console.log('ERROR'); },
      () => { console.log('success'); }
    );
  }

  addData() {
    if (this.produitForm.invalid) {
      
      return;
    }
  
    const formData = new FormData();
    formData.append('name', this.produitForm.get('name')?.value);
    formData.append('description', this.produitForm.get('description')?.value);
    formData.append('quantity',this.produitForm.get('quantity')?.value);
    formData.append('image', this.userFile);
    formData.append('price', this.produitForm.get('price')?.value);
    formData.append('brandId', this.produitForm.get('brandId')?.value);
    formData.append('categoryId', this.produitForm.get('categoryId')?.value);
  
    this.produitService.createData(formData).subscribe(
      res => {
        this.initProduit();
        this.loadProduits();
      },
      error => {
        console.log('Error occurred while creating data:', error);
      }
    );
  }

  
  
  getCategories() {
    this.categoryService.getAllcategory().subscribe({
      next: (res: any) => {
        this.categories = res;
        console.log('success');
      },
      error: (error: any) => {
        console.log('ERROR');
      }
    });
  }
  getbrands() {
    this.brandService.getAllbrands().subscribe({
      next: (res: any) => {
        this.brands= res;
        console.log('success');
      },
      error: (error: any) => {
        console.log('ERROR');
      }
    });
  }
  

  updateProduit(){
    console.log(this.selectedProduit.id);
      console.log(this.selectedProduit.id);
      console.log(this.selectedProduit.id);
    this.produitService.updateProduit(this.selectedProduit).subscribe(
      res=>{
        this.initProduit()
        this.loadProduits();
      }
    );
  }
  deleteProduit() {
    if (this.selectedProduit && this.selectedProduit.id !== undefined) {
      console.log(this.selectedProduit.id);
      console.log(this.selectedProduit);
      console.log(this.selectedProduit.id);
      this.produitService.deleteProduit(this.selectedProduit.id).subscribe(
        res => {
          this.selectedProduit = {
        
        
        }
          this.loadProduits();
        }
      );
    } else {
      console.log(this.selectedProduit);
      console.log('Error: The selected product does not have a valid ID.');
    }
  }
  
  initProduit(){

    this.createForm();
  }
  onSelectFile(event:any) {
    if (event.target.files.length > 0)
    {
      const file = event.target.files[0];
      this.userFile = file;
 
    var mimeType = event.target.files[0].type;
    if (mimeType.match(/image\/*/) == null) {
      this.message = "Only images are supported.";
      return;
    }
 
    var reader = new FileReader();
    
    this.imagePath = file;
    reader.readAsDataURL(file); 
    reader.onload = (_event) => { 
      this.imgURL = reader.result; 
    }
  }
     
      
    }
    
    
  }
  