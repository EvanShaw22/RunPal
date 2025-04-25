import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonButtons, IonBackButton, IonHeader, IonTitle, IonToolbar, IonLabel, IonItem, IonButton, IonText, IonInput, AlertController } from '@ionic/angular/standalone';
import { Storage } from '@ionic/storage-angular';
import { Router } from '@angular/router';


@Component({
  selector: 'app-input',
  templateUrl: './input.page.html',
  styleUrls: ['./input.page.scss'],
  standalone: true,
  imports: [IonContent, IonButtons, IonBackButton, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, IonLabel, IonItem, IonButton, IonText, IonInput]
})
export class InputPage implements OnInit {

  //initialise variables
  public distance: number = 0;
  public runTime: number = 0;
  public submitted: boolean = false;

  public existingTimes: any;
  public existingDistances: any;
  public timeStamps: any;

  public prevRun: any = [];

  private timeKey: string = 'runTimingsRP3'; 
  private distanceKey: string = 'runDistancesRP3';
  private timestampsKey: string = 'runTimestampsRP3';

  constructor(private storage:Storage, private router:Router, private alertController: AlertController) { }

  async submitRun() {

    //await needed to make wait
    await this.storage.create();

    //reads in data that is already stored - might not exist
    this.existingTimes = await this.storage.get(this.timeKey);

    if(Array.isArray(this.existingTimes)) {
      //push new value to the array
      this.existingTimes.push(this.runTime);

      //saves it to local storage
      await this.storage.set(this.timeKey, this.existingTimes);

    } else {
      //key doesnt exist so initlaise it
      console.log("Key did not exist");

      await this.storage.set(this.timeKey, [this.runTime]);
   
    }

    //divide by 1000 to change from ms to seconds - time stamp needed to track times of runs
    var unixTimestamp = Math.floor(Date.now() / 1000);

    //reads in data that is already stored - might not exist
    this.timeStamps = await this.storage.get(this.timestampsKey);
    //this saves unix timestamps
    if(Array.isArray(this.timeStamps)) {
      this.timeStamps.push(unixTimestamp);

      await this.storage.set(this.timestampsKey, this.timeStamps);

    } else {
      
      //initialises an array with the unix timestamp
      await this.storage.set(this.timestampsKey, [unixTimestamp]);
   
    }
    



    this.existingDistances = await this.storage.get(this.distanceKey);

    if(this.existingDistances && Array.isArray(this.existingDistances)) {
      this.existingDistances.push(this.distance);

      await this.storage.set(this.distanceKey, this.existingDistances);
    } else {
      //key doesnt exist so initlaise it
      await this.storage.set(this.distanceKey, [this.distance]);
    }
    
    //displays an alert to say information has been submitted
    this.presentAlert();
    
    this.router.navigate(['/home']);
  }

  //called each time page is loaded
  async ionViewWillEnter() {
    await this.storage.create();
    //this.distance = await this.storage.get('distance');
    //this.runTime = await this.storage.get('runTime');
  }

  async presentAlert() {
    const alert = await this.alertController.create({
      header: 'Run Submitted',
      subHeader: 'Track your performance',
      message: 'You ran ' + this.distance + ' km in ' + this.runTime + ' minutes.',
      buttons: ['Ok'],
    });

    await alert.present();
  }

  ngOnInit() {
  }

}
