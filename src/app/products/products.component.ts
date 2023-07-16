import { Component, OnInit } from "@angular/core";
import { FirebaseService } from "../firebase.service";
import { Product } from "../types/product";

@Component({
  selector: "app-products",
  templateUrl: "./products.component.html",
  styleUrls: ["./products.component.css"],
})
export class ProductsComponent implements OnInit {
  searchError: string = "";
  error: boolean = false;
  isLoading: boolean = true;
  selectedCategory: string = "all";
  selectedSecondCategory: string = "none";
  array: Product[] = [];
  fetchedProducts: Product[] = [];

  constructor(public firebaseService: FirebaseService) {}

  ngOnInit(): void {
    this.firebaseService.getProducts().subscribe({
      next: (products: Product[]) => {
        this.fetchedProducts = products;
        this.array = this.firebaseService.getArrayValues(this.fetchedProducts);
        this.isLoading = false;
      },
      error: (err: any) => {
        this.isLoading = false;
        console.error("Error:", err);
      },
    });
  }

  selectCategory(category: string) {
    this.selectedCategory = category;
    this.filterProducts();
  }

  selectSecondCategory(category: string) {
    this.selectedSecondCategory = category;
    this.filterProducts();
  }

  onSearchChange(event: any): void {
    const value = event.target.value;
    this.searchError = "";
    this.filterProducts();

    if (value) {
      this.array = this.array.filter((x) =>
        x.name.toLowerCase().includes(value.toLowerCase())
      );
      if (this.array.length === 0) {
        this.searchError = "Could not find what you were looking for!";
      }
    }
  }

  private filterProducts(): void {
    switch (this.selectedCategory) {
      case "all":
        this.array = this.firebaseService.getArrayValues(this.fetchedProducts);
        break;
      case "- $100":
        this.array = this.firebaseService
          .getArrayValues(this.fetchedProducts)
          .filter((x) => this.getDiscountedPrice(x) <= 100);
        break;
      case "- $500":
        this.array = this.firebaseService
          .getArrayValues(this.fetchedProducts)
          .filter(
            (x) =>
              this.getDiscountedPrice(x) <= 500 &&
              this.getDiscountedPrice(x) > 100
          );
        break;
      case "- $1000":
        this.array = this.firebaseService
          .getArrayValues(this.fetchedProducts)
          .filter(
            (x) =>
              this.getDiscountedPrice(x) <= 1000 &&
              this.getDiscountedPrice(x) > 500
          );
        break;
      case "- $5000":
        this.array = this.firebaseService
          .getArrayValues(this.fetchedProducts)
          .filter(
            (x) =>
              this.getDiscountedPrice(x) <= 5000 &&
              this.getDiscountedPrice(x) > 1000
          );
        break;
      case "above $5000":
        this.array = this.firebaseService
          .getArrayValues(this.fetchedProducts)
          .filter((x) => this.getDiscountedPrice(x) > 5000);
        break;
      default:
        break;
    }

    // Apply the second category filter
    switch (this.selectedSecondCategory) {
      case "none":
        // Do nothing, no additional filtering required
        break;
      case "Free shipping":
        this.array = this.array.filter((x) => x.shipping === 0);
        break;
      case "Promotions":
        this.array = this.array.filter((x) => x.promotion);
        break;
      default:
        break;
    }
  }

  private getDiscountedPrice(product: Product): number {
    if (product.promotion) {
      const discount = product.price * (product.promotion / 100);
      return product.price - discount;
    } else {
      return product.price;
    }
  }
}
