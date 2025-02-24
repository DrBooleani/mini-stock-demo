import { Component, Input } from "@angular/core";
import { QuestionBase } from "../../generic/questions/question-base.generic";
import { FormGroup, ReactiveFormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";

import { InputTextModule } from "primeng/inputtext";
import { DropdownModule } from "primeng/dropdown";
import { MessageModule } from "primeng/message";

@Component({
  selector: "app-dynamic-form-question",
  templateUrl: "./dynamic-form-question.component.html",
  styleUrl: "./dynamic-form-question.component.css",
  imports: [
    CommonModule,
    ReactiveFormsModule,
    InputTextModule,
    DropdownModule,
    MessageModule,
  ],
})
export class DynamicFormQuestionComponent {
  @Input() question!: QuestionBase<string>;
  @Input() form!: FormGroup;

  get isValid() {
    return this.form.controls[this.question.key].valid;
  }
}
