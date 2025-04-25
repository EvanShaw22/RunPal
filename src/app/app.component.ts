import { Component } from '@angular/core';
import { DataService } from './services/data.service';
import { IonApp, IonRouterOutlet } from '@ionic/angular/standalone';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  imports: [IonApp, IonRouterOutlet],
  providers: [DataService]
})
export class AppComponent {

  constructor() {}
  
}
