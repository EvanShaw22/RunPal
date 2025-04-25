import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonButtons, IonBackButton, IonCardContent, IonGrid, IonRow, IonCol, IonHeader, IonTitle, IonToolbar, IonNote, IonCard, IonCardHeader, IonCardTitle } from '@ionic/angular/standalone';

@Component({
  selector: 'app-info',
  templateUrl: './info.page.html',
  styleUrls: ['./info.page.scss'],
  standalone: true,
  imports: [IonContent, IonButtons, IonBackButton, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, IonNote, IonCardContent, IonGrid, IonRow, IonCol, IonCard, IonCardHeader, IonCardTitle]
})
export class InfoPage implements OnInit {

  //placeholder info that is display in the html
  mensPaceData = [
    { distance: 4, beginner: '6:45', intermediate: '6:00', advanced: '5:15' },
    { distance: 5, beginner: '6:50', intermediate: '6:05', advanced: '5:20' },
    { distance: 8, beginner: '7:00', intermediate: '6:10', advanced: '5:25' },
    { distance: 10, beginner: '7:05', intermediate: '6:15', advanced: '5:30' },
  ];
  
  womensPaceData = [
    { distance: 4, beginner: '7:15', intermediate: '6:30', advanced: '5:45' },
    { distance: 5, beginner: '7:20', intermediate: '6:35', advanced: '5:50' },
    { distance: 8, beginner: '7:30', intermediate: '6:40', advanced: '5:55' },
    { distance: 10, beginner: '7:35', intermediate: '6:45', advanced: '6:00' },
  ];

  constructor() { }

  ngOnInit() {
  }

}
