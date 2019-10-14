import { Component } from '@angular/core';
import { QuestionModel } from './QuestionModel';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  myarray: String[] = [];
  i: number = 0;
  newstr: String;
  quizlist: QuestionModel[] = [
    {
      ID: 1, question: "Which is the largest country in the world by population?", anslistobj: ["India", "USA", "China", "Russia"], answer: "China"
    },
    {
      ID: 2, question: "When did the second world war end?", anslistobj: ["1945", "1939", "1944", "1942"], answer: "1945"
    },
    {
      ID: 3, question: "Which was the first country to issue paper currency?", anslistobj: ["USA", "France", "Italy", "China"], answer: "China"
    },
    {
      ID: 4, question: "Which city hosted the 1996 Summer Olympics?", anslistobj: ["Atlanta", "Sydney", "Athens", "Beijing"], answer: "Atlanta"
    },
    {
      ID: 5, question: "Who invented telephone?", anslistobj: ["Albert Einstein", "Alexander Graham Bell", "Isaac Newton", " Marie Curie"], answer: "Alexander Graham Bell"
    }
  ];
  isStart = false;
  isDisplay = true;
  displayFinalMessage = false;
  quizlength: number;
  question: String;
  selectedvalue: String;
  option: any[];
  selectedQuestions: any[];
  finalMessage: string;
  score: number = 0;
  answerkey: SelectAnswer[] = [];
  skip = true;
  alertMessage: string;

  loadQuiz() {
    this.isDisplay = false;
    this.isStart = true;
    this.selectedQuestions = this.quizlist;
    this.question = this.selectedQuestions[0].question;
    this.option = this.selectedQuestions[0].anslistobj;
    this.i = 0;
    this.quizlength = this.selectedQuestions.length;
    this.alertMessage = "You are not allowed to go back. So, please select carefully before pressing next";
  }
  nextQuestion() {
    if (typeof this.answerkey[this.i] === 'undefined'){
      this.answerkey[this.i] = new SelectAnswer('undefined', 5)
    }

    ++this.i;
    if (this.i < this.selectedQuestions.length) {
      this.question = this.selectedQuestions[this.i].question;
      this.option = this.selectedQuestions[this.i].anslistobj;
    } else {
      this.isDisplay = true;
      this.finalScore();
    }
  }

  // previousQuestion() {
  //   --this.i;
  //   this.question = this.selectedQuestions[this.i].question;
  //   this.option = this.selectedQuestions[this.i].anslistobj;
  // }

  selectQuestion(e, str: String, answer) {
    if (e.target.checked) {
      if (this.answerkey.length > 0) {
     
        this.answerkey.splice(this.i, 1, new SelectAnswer(str, answer));
      } else {
        this.answerkey.splice(this.i, 0, new SelectAnswer(str, answer));
      }
    }
    else {
      this.answerkey.splice(0, 1);
    }
  }

  finalScore() {
    for (var i = 0; i < this.answerkey.length; i++) {
      if (this.answerkey[i].choosen == this.quizlist[i].answer) this.score++;
    }
    this.displayFinalMessage = true;
    this.finalMessage = "Your Final Score is " + this.score;
  }
}

export class SelectAnswer {
  choosen: String;
  answer: number;
  constructor(choosen: String, answer: number) {
    this.choosen = choosen;
    this.answer = answer;
  }
}