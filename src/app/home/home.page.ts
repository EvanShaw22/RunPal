import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DataService } from '../services/data.service';
import { IonHeader, IonIcon, IonList, IonNote, IonLabel, IonToolbar, IonButtons, IonTitle, IonContent, IonButton, IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonItem, IonCardTitle } from '@ionic/angular/standalone';
import { Geolocation } from '@capacitor/geolocation';
import { Router, RouterLink } from '@angular/router';
import { Storage } from '@ionic/storage-angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true,
  imports: [RouterLink, IonIcon, IonButtons ,IonNote, IonLabel, IonList, IonHeader, IonToolbar, IonTitle, IonContent, CommonModule, FormsModule, IonButton, IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle, IonItem],
  providers: [DataService]
})
export class HomePage implements OnInit {

  //below vars are used for the geolocation plugin
  coordinates: any = "";
  lat: string = "";
  long: String = "";

  //used for weatherapi
  temp: string = "";
  weather:any = "";
  windSpeed: any = "";

  //local storage running values
  runTimes: any = [];
  distances: any = [];
  
  public timeStamps: any;

  //openweather icon url is stored here
  icon: string = "";

  //these are the keys used to acces local storage
  private timeKey: string = 'runTimingsRP3'; 
  private distanceKey: string = 'runDistancesRP3';
  private timestampsKey: string = 'runTimestampsRP3';


  //converts timestamp to a date
  unixTimestampToDate(unixTimestamp : number) : string{
    //Convert to ms 
    var date = new Date(unixTimestamp * 1000);
    
    return date.toLocaleString();

  }

  //reads in all the data from local storage
  async loadSavedRuns () {
    await this.storage.create();

    this.runTimes = await this.storage.get(this.timeKey);
    this.distances = await this.storage.get(this.distanceKey);
    this.timeStamps = await this.storage.get(this.timestampsKey);
  }
  //router
  goToInput() {
    this.router.navigate(['/input']);
  }

  ngOnInit() : void {
    //get gps and load saved runs on init
    this.getGPS();
    this.loadSavedRuns();

  }

  async getWeather() {
    this.dataService.GetWeatherData(this.lat, this.long).subscribe(data =>
      {
        this.weather = data.weather[0].main;
        
        //This url is an icon represtning current weather
        this.icon = "https://openweathermap.org/img/wn/" + data.weather[0].icon + "@4x.png";
        //The value given by the API is in m/s multiply by 3.6 for kmph
        this.windSpeed = (data.wind.speed * 3.6).toFixed(1);
        
        //Limits the temperature in degrees to 1 decimal place
        this.temp = (data.main.temp - 273.15).toFixed(1);
      }
      )
  }

  async getGPS() {
    this.coordinates = await Geolocation.getCurrentPosition({
      enableHighAccuracy: true,
      timeout: 10000
    });
    this.lat = this.coordinates.coords.latitude;
    this.long = this.coordinates.coords.longitude; 

    await this.getWeather();
  }



  constructor(private dataService: DataService,private router: Router,private storage:Storage) {}
}
