import { CommonModule } from '@angular/common';
import { Component, inject, Input, OnInit } from '@angular/core';
import { DynamicFormQuestionComponent } from './dynamic-form-question/dynamic-form-question.component';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';

import { ButtonModule } from "primeng/button";
import { ToastModule } from "primeng/toast";
import { MessageService } from "primeng/api";
import { QuestionControlService } from '../services/question-control.service';
import { QuestionBase } from '../generic/questions/question-base.generic';

@Component({
  selector: 'app-dynamic-form',
  standalone: true,
  templateUrl: './dynamic-form.component.html',
  styleUrl: './dynamic-form.component.css',
  imports: [CommonModule, DynamicFormQuestionComponent, ReactiveFormsModule, ButtonModule, ToastModule],
  providers: [QuestionControlService, MessageService]
})
export class DynamicFormComponent implements OnInit {
  @Input() questions: QuestionBase<string>[] | null = null;
  form!: FormGroup;
  payLoad = '';
  myQcs = inject(QuestionControlService);
  messageService = inject(MessageService);

  ngOnInit(): void {
    this.form = this.myQcs.toFormGroup(this.questions as QuestionBase<string>[]);
  }

  onSubmit() {
    if (this.form.valid) {
      this.payLoad = JSON.stringify(this.form.getRawValue());
      this.showSuccessToast("Data was saved successfully!");
    } else {
      this.showErrorToast("An error happened, check the fields!");
    }
  }

  showSuccessToast(detail: string) {
    this.messageService.add({
      severity: 'success',
      summary: 'Success',
      detail,
      life: 2000
    });
  }

  showErrorToast(detail: string) {
    this.messageService.add({
      severity: 'error',
      summary: 'Error',
      detail,
      life: 2000
    });
  }


}
