import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})

@Injectable()
export class DataService {

  constructor(private http:HttpClient) { }


  GetWeatherData(lat: String, lon: String) : Observable<any> {
    const url = "https://api.openweathermap.org/data/2.5/weather?lat=" + lat + "&lon=" + lon + "&APPID=6a66416403ed8e5e6e762cb8c261f303";

    console.log("https://api.openweathermap.org/data/2.5/weather?lat=" + lat + "&lon=" + lon + "&APPID=6a66416403ed8e5e6e762cb8c261f303");

    return this.http.get("https://api.openweathermap.org/data/2.5/weather?lat=" + lat + "&lon=" + lon + "&APPID=6a66416403ed8e5e6e762cb8c261f303");
  }

    

}
