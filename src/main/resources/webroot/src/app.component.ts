import { Component } from 'angular2/core';

@Component({
  selector: 'app',
  template: `
    <h1>{{title}}</h1>
  `
})
    
    
export class AppComponent {
  title = 'Main component';
}