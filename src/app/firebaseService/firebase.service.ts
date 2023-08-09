import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Product } from "../interfaces/product";
import { Observable } from "rxjs";
import { environment } from "../../environments/environment";

@Injectable({
  providedIn: "root",
})
export class FirebaseService {
  constructor(private http: HttpClient) {}

  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(
      `${environment.firebaseConfig.databaseURL}/products.json`
    );
  }

  getProductById(productId: string): Observable<Product> {
    return this.http.get<Product>(
      `${environment.firebaseConfig.databaseURL}/products/${productId}.json`
    );
  }

  getPartners() {
    const id: string = "-NbPKwAv85SeASIg2YFv";
    return this.http.get<any>(
      `${environment.firebaseConfig.databaseURL}/partners/${id}.json`
    );
  }

  getArrayValues(products: Object): any {
    if (!products) {
      return [];
    }
    return Object.values(products);
  }

  setIds(products: any, ids: string[]): any {
    for (let product of products) {
      product._id = ids.shift();
    }

    return products;
  }
}
