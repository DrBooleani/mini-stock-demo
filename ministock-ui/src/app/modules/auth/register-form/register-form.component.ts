import { Component, OnDestroy, OnInit } from '@angular/core';
import { QuestionBase } from '../../../shared/generic/questions/question-base.generic';
import { Subject } from 'rxjs';
import { TextboxQuestion } from '../../../shared/generic/questions/question-textbox';

@Component({
  selector: 'app-register-form',
  standalone: false,
  templateUrl: './register-form.component.html',
  styleUrl: './register-form.component.css'
})
export class RegisterFormComponent implements OnInit, OnDestroy {
 questions: QuestionBase<string>[] = [];
  private destroy$ = new Subject<void>();

  ngOnInit(): void {
    this.registerQuestions();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  registerQuestions(): void {
    this.questions = [
      new TextboxQuestion({
        key: "name",
        label: "Full Name",
        type: "text",
        required: true,
        order: 1,
      }),
      new TextboxQuestion({
        key: "email",
        label: "Email",
        type: "email",
        required: true,
        order: 2,
      }),
      new TextboxQuestion({
        key: "password",
        label: "Password",
        type: "password",
        required: true,
        order: 3,
      }),
    ];
  }
}
