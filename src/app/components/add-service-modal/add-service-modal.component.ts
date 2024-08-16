import { Component } from '@angular/core';
import { MatDialogModule } from '@angular/material/dialog';

@Component({
  selector: 'app-add-service-modal',
  standalone: true,
  imports: [MatDialogModule],
  templateUrl: './add-service-modal.component.html',
  styleUrl: './add-service-modal.component.scss'
})
export class AddServiceModalComponent {

}
