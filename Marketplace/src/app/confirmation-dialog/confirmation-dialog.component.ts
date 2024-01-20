import { Component, OnInit } from '@angular/core';
import { Product } from '../shared/models/product';
import { produitService } from '../produits/produit.Service';

@Component({
  selector: 'app-confirmation-dialog',
  templateUrl: './confirmation-dialog.component.html',
  styleUrls: ['./confirmation-dialog.component.css']
})
export class ConfirmationDialogComponent implements OnInit {
  produits!: Product[];
  selectedProduit: Product = { name: "", description: "", price: 0, category: { id: 0, name: "" } };

  constructor(private produitService: produitService) { }

  ngOnInit() {
    this.getProduit();
  }

  getProduit() {
    this.produitService.getProduits().subscribe({
      next: (res: any) => {
        this.produits = res;
        // For example, let's assume you want to select the first product from the response
        if (this.produits.length > 0) {
          this.selectedProduit = this.produits[0];
        }
        console.log('success');
      },
      error: (error: any) => {
        console.log('ERROR');
      }
    });
  }
}
