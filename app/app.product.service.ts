import {Injectable}     from 'angular2/core';
import {Http, Response} from 'angular2/http';
import {Product}           from './app.product';
import {Observable}     from 'rxjs/Observable';

@Injectable()
export class ProductService {
    constructor (private http: Http) {}

    getProducts () {
        return this.http.get('http://ws.priceminister.com/rest/navigation/v1/list?kw=hello&pageNumber=1&advertType=ALL&channel=hackaton&loadProducts=true&withoutStock=false')
            .toRx()
            .map(res => <Product[]> res.json().data)
            .catch(this.handleError);
    }
    private handleError (error: Response) {
        // in a real world app, we m'ay send the error to some remote logging infrastructure
        // instead of just logging it to the console
        console.error(error);
        return Observable.throw(error.json().error || 'Server error');
    }
}