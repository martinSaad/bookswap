import { Component } from '@angular/core';
import {Router, NavigationEnd} from "@angular/router";
import {Meta} from "@angular/platform-browser";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  constructor(public router: Router,
              public metaService: Meta) {

    //set tags
    this.setTags();
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        ga('set', 'page', event.urlAfterRedirects);
        ga('send', 'pageview');
      }
    });
  }

  onDeactivate() {
    document.body.scrollTop = 0;
  }

  setTags(){
    this.metaService.addTag({ property: 'og:title', content: 'BookSwap' });
    this.metaService.addTag({ property: 'og:image', content: 'https://github.com/martinSaad/bookswap/blob/master/angular-src/src/assets/images/home.jpg' });
    this.metaService.addTag({ property: 'og:description', content: 'Expand your knowledge & imagination. Swap books for FREE with people around the world.' });
    this.metaService.addTag({ property: 'og:url', content: 'http://www.bookswap.online' });
  }
}
