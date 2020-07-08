import { Component } from '@angular/core';
import { LocalNotifications } from '@ionic-native/local-notifications/ngx';




@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  constructor(private localNotifications: LocalNotifications) {

  }

  

  hour: number
  min: number
  sec: number
  ms: number
  
  public timeBegan = null
  public timeStopped:any = null
  public stoppedDuration:any = 0
  public started = null
  public running = false
  public blankTime = "00:00:00.000"
  public time = "00:00:00.000"

  public textGO = "START"
  public textType: any = []
  public laps: any = []
  public laps2: any = []

 
  start() {
    if(this.running) return;
    if (this.timeBegan === null) {
        this.reset();
        this.timeBegan = new Date();
    }
    if (this.timeStopped !== null) {
      let newStoppedDuration:any = (+new Date() - this.timeStopped)
      this.stoppedDuration = this.stoppedDuration + newStoppedDuration;
    }
    this.started = setInterval(this.clockRunning.bind(this), 10);
      this.running = true;
      
    }

    stop() {
      this.running = false;
      this.timeStopped = new Date();
      clearInterval(this.started);
      this.textGO = 'START';
   }

    reset() {
      this.running = false;
      clearInterval(this.started);
      this.stoppedDuration = 0;
      this.timeBegan = null;
      this.timeStopped = null;
      this.time = this.blankTime;
  
    }

    zeroPrefix(num, digit) {
      let zero = '';
      for(let i = 0; i < digit; i++) {
        zero += '0';
      }
      return (zero + num).slice(-digit);
    }

    clockRunning(){
      let currentTime:any = new Date()
      let timeElapsed:any = new Date(currentTime - this.timeBegan - this.stoppedDuration)
      this.hour = timeElapsed.getUTCHours()
      this.min = timeElapsed.getUTCMinutes()
      this.sec = timeElapsed.getUTCSeconds()
      this.ms = timeElapsed.getUTCMilliseconds()
      
    this.time =
      this.zeroPrefix(this.hour, 2) + ":" +
      this.zeroPrefix(this.min, 2) + ":" +
      this.zeroPrefix(this.sec, 2) + "." +
      this.zeroPrefix(this.ms, 3);
      
    }

    changeText() {
      if(this.textGO.includes('STOP')){
        this.textGO = 'START';
      }
      else if(this.textGO.includes('START')){
        this.textGO = 'STOP';
      }
    }

    lapTime() {      
      let lapsTime = this.time;
      if (this.textGO.includes('START')) {
        this.laps.push(lapsTime);
      }
      if (this.textGO.includes('STOP')) {
        this.laps.push(lapsTime);
      }
      this.reset();
      this.start();

      if (this.textGO.includes('START')) {
        this.registerNotification(3000);
      }
  }

  lapType() {
   
    
    if (this.textGO.includes('START')) {
      this.textType.push('INTERVAL');
      
    }
    if (this.textGO.includes('STOP')) {
      this.textType.push('CONTRACTION');
      
    }
   

  }

  public clear(): void {
   
      this.laps = [];
      this.textType = [];
      
      
   
        
  }

  registerNotification(ms: number) {
    this.localNotifications.schedule({
      title: 'my ${ns} notification',
      text: 'my detailed description',
      trigger: {at:new Date(new Date().getTime() + ms)}
    });
  }



}
  
