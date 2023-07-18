import { Component } from "@angular/core";
import { Observable } from "rxjs";
import { AuthService } from "src/app/user/auth.service";

@Component({
  selector: "app-navigation",
  templateUrl: "./navigation.component.html",
  styleUrls: ["./navigation.component.css"],
})
export class NavigationComponent {
  isBurgerMenuOn: boolean = false;
  isDropDownOn: boolean = false;
  isLoggedIn: Observable<boolean>;

  constructor(private authService: AuthService) {
    this.isLoggedIn = this.authService.isLoggedIn();
  }

  onBurgerClick() {
    if (this.isDropDownOn) {
      this.isDropDownOn = !this.isDropDownOn;
    }
    this.isBurgerMenuOn = !this.isBurgerMenuOn;
  }

  onDropDownClick() {
    if (this.isBurgerMenuOn) {
      this.isBurgerMenuOn = !this.isBurgerMenuOn;
    }
    console.log(this.isDropDownOn);

    this.isDropDownOn = !this.isDropDownOn;
    console.log(this.isDropDownOn);
  }
}
