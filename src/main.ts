// polyfills
import 'core-js';
import 'zone.js';

import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AppModule } from './components/app/app.module';

platformBrowserDynamic().bootstrapModule(AppModule);
