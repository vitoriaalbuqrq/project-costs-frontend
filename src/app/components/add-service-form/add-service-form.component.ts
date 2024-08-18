import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormInputComponent } from "../form/form-input/form-input.component";
import { FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-add-service-form',
  standalone: true,
  imports: [FormInputComponent, ReactiveFormsModule],
  templateUrl: './add-service-form.component.html',
  styleUrl: './add-service-form.component.scss'
})
export class AddServiceFormComponent {
  @Input() formGroup!: FormGroup;
  
  @Output() formSubmit = new EventEmitter();

  onSubmit(){
    this.formSubmit.emit()
  }
}
