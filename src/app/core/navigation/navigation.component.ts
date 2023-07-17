import { Component } from "@angular/core";

@Component({
  selector: "app-navigation",
  templateUrl: "./navigation.component.html",
  styleUrls: ["./navigation.component.css"],
})
export class NavigationComponent {
  isBurgerMenuOn: boolean = false;
  isDropDownOn: boolean = false;

  onBurgerClick() {
    if (this.isDropDownOn) {
      this.isDropDownOn = false;
    }
    this.isBurgerMenuOn = !this.isBurgerMenuOn;
  }

  onDropDownClick() {
    if (this.isBurgerMenuOn) {
      this.isBurgerMenuOn = false;
    }
    this.isDropDownOn = !this.isDropDownOn;
  }
}
