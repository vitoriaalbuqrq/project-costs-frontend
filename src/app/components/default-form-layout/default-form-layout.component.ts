import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-default-form-layout',
  standalone: true,
  imports: [],
  templateUrl: './default-form-layout.component.html',
  styleUrl: './default-form-layout.component.scss'
})
export class DefaultFormLayoutComponent {
  @Input() title: string = "";
  @Input() primaryBtnText: string = "";
  @Input() disablePrimaryButton: boolean = true;
  @Output("submit") onSubmit = new EventEmitter();

  submit(){
    this.onSubmit.emit()
  }
}
