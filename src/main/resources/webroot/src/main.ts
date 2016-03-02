import {bootstrap}    from 'angular2/platform/browser'

import {App} from './app.component'

// Add all operators to Observable
import 'rxjs/Rx';

bootstrap(App).catch(err => console.error(err));
