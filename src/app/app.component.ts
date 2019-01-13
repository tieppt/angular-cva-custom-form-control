import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'custom-control';
  active = true;
  disabled = false;
  control = new FormControl(false);
  toggleControlDisable() {
    if (this.control.disabled) {
      this.control.enable();
    } else {
      this.control.disable();
    }
  }
}
