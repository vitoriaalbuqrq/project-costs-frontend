import { Component } from '@angular/core';
import { NavbarComponent } from "../../components/navbar/navbar.component";
import { RouterOutlet } from '@angular/router';
import { FormComponent } from "../../components/form/form.component";
import { FooterComponent } from "../../components/footer/footer.component";

@Component({
  selector: 'app-user',
  standalone: true,
  imports: [RouterOutlet, NavbarComponent, FormComponent, FooterComponent],
  templateUrl: './user.component.html',
  styleUrl: './user.component.scss'
})
export class UserComponent {

}
