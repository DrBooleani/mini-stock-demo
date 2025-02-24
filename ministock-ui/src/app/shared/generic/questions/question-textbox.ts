import { QuestionBase } from "./question-base.generic";

export class TextboxQuestion extends QuestionBase<string> {
  override controlType: string = 'textbox';
}