import { Component, inject, OnDestroy, OnInit } from "@angular/core";
import { QuestionBase } from "../../../shared/generic/questions/question-base.generic";
import { Subject } from "rxjs";
import { TextboxQuestion } from "../../../shared/generic/questions/question-textbox";
import { MessageService } from "primeng/api";
import { UserService } from "../../../core/services/user.service";
import { CookieService } from "ngx-cookie-service";
import { Router } from "@angular/router";

@Component({
  selector: "app-login-form",
  standalone: false,
  templateUrl: "./login-form.component.html",
  styleUrl: "./login-form.component.css",
  providers: [MessageService]
})
export class LoginFormComponent implements OnInit, OnDestroy {
  questions: QuestionBase<string>[] = [];

  private _userService = inject(UserService);
  private _cookieService = inject(CookieService);
  private _router = inject(Router);
  private _messageService = inject(MessageService);

  private destroy$ = new Subject<void>();

  ngOnInit(): void {
    this.loginQuestions();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  onSubmit(data: any) {
    this._userService.authUser(data).subscribe({
      next: (response) => {
        this._cookieService.set('USER_INFO', response.token);
        this._router.navigate(['/dashboard']);
        this._messageService.add({
          severity: 'success',
          summary: 'Login Successful!',
          detail: 'You haved successfully logged in!',
          life: 2000
        });
      },
      error: () => {
        this._messageService.add({
          severity: 'error',
          summary: 'Login Failed',
          detail: 'Please check your credentials and try again.',
          life: 2000
        })
      }
    })

  }

  loginQuestions(): void {
    this.questions = [
      new TextboxQuestion({
        key: "email",
        label: "Email",
        type: "email",
        required: true,
        order: 1,
      }),
      new TextboxQuestion({
        key: "password",
        label: "Password",
        type: "password",
        required: true,
        order: 2,
      }),
    ];
  }
}
