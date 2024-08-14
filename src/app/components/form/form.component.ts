import { FormGroup, ReactiveFormsModule } from "@angular/forms";
import { PrimaryInputComponent } from "../primary-input/primary-input.component";
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Category } from "../../models/enum/category.enum";
import { FormInputComponent } from "./form-input/form-input.component";
import { CommonModule } from "@angular/common";

@Component({
  selector: 'app-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, PrimaryInputComponent, FormInputComponent],
  templateUrl: './form.component.html',
  styleUrl: './form.component.scss'
})

export class FormComponent {
  @Input() formGroup!: FormGroup;
  @Input() categories: Category[] = [];
  @Input() title: string = "";
  @Input() subtitle: string = "";
  @Input() primaryBtnText: string = "";
  @Input() disablePrimaryButton: boolean = true;
  
  @Output() formSubmit = new EventEmitter();

  onSubmit(){
    this.formSubmit.emit()
  }
}
