import { PrimaryInputComponent } from "../primary-input/primary-input.component";
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-form',
  standalone: true,
  imports: [PrimaryInputComponent],
  templateUrl: './form.component.html',
  styleUrl: './form.component.scss'
})

export class FormComponent {
  @Input() title: string = "";
  @Input() subtitle: string = "";
  @Input() primaryBtnText: string = "";
  @Input() disablePrimaryButton: boolean = true;
  @Output("submit") onSubmit = new EventEmitter();

  submit(){
    this.onSubmit.emit()
  }
}
