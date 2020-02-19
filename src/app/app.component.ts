
import {Component, OnInit} from '@angular/core';
import {TranslateService} from '@ngx-translate/core';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'simulateur';

  isLinear = false;
  newColorFr = false;
  newColorEn = false;

  langue: string;
  constructor(private translate: TranslateService) {
    translate.setDefaultLang('fr');
    
		//récupération de la langue
	
  }

  ngOnInit() { 
    this.newColorFr = true;
    this.langue = 'fr';
  }

  useLanguage(language: string) {
    this.translate.use(language);
    if( language == "fr"){
      this.newColorFr = true,
      this.newColorEn = false;
    }

    if( language == "en"){
      this.newColorFr = false,
      this.newColorEn = true;
    }

    this.langue = this.translate.currentLang;
  }
}
