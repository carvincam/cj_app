import { Component } from '@angular/core';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {
theme:string = "";

  constructor() {}

switchThemeDefault(){
    this.theme = "";
    document.body.classList.remove("dark");
    document.body.classList.remove("neutral");
  }

  switchThemeNeutral(){
      this.theme = "neutral";
      document.body.classList.remove("dark");
      document.body.classList.add("neutral");
    }

    switchThemeDark(){
        this.theme = "dark";
        document.body.classList.remove("neutral"); 
        document.body.classList.add("dark");
      }
}


