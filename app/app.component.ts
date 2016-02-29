import {bootstrap, Component, NgFor, View} from 'angular2/angular2';
import {HTTP_BINDINGS, Http} from 'angular2/http';


@Component({
    selector: 'app',
    bindings: [HTTP_BINDINGS]
})
@View({
    template: `
    <div>
      <h1>!!!Greetings!!!</h1>
      <ul>
         <li> {{greeting}}
        </li>
      </ul>
    </div>
  `,
    directives: [NgFor]
})

export class App {
    constructor(http:Http) {
        http.get('http://ws.priceminister.com/rest/navigation/v1/list?kw=hello&pageNumber=1&advertType=ALL&channel=hackaton&loadProducts=true&withoutStock=false').subscribe(
                res => {
            console.log(res);
            console.log(res.json());
            this.greeting = res.json();
        });
    }
    active:boolean = false;
    toggleActiveState() {
        this.active = !this.active;
    }
}

bootstrap(App)
    .catch(err => console.error(err));
  