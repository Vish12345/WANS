import {bootstrap, Component, NgFor, View} from 'angular2/angular2';
import {HTTP_BINDINGS, Http} from 'angular2/http';
import {Product} from './app.product';

@Component({
    selector: 'app',
    bindings: [HTTP_BINDINGS]
})
@View({
    template: `
    <div>
      <h1>!!!Products!!!</h1>
    <ul>
        <li *ng-for="#prd of products">
          {{prd.id}}<br/>
           {{prd.urlName}}<br/>
            {{prd.headline}}<br/>
             {{prd.caption}}<br/>
              {{prd.bestPrice}}<br/>
               {{prd.images}}<br/>
                {{prd.newBestPrice}}<br/>
                 {{prd.nbReviews}}<br/>
        </li>
      </ul>
    </div>
  `,
    directives: [NgFor]
})

export class App{
    products:Product[];

    constructor(http:Http) {
        http.get('http://ws.priceminister.com/rest/navigation/v1/list?kw=hello&pageNumber=1&advertType=ALL&channel=hackaton&loadProducts=true&withoutStock=false')
            .toRx()
            .map(res => <Product>res.json().result.products)
            .do(products => console.log(products))
            .subscribe(
                products => this.products = products);
    }
}


bootstrap(App)
    .catch(err => console.error(err));
  