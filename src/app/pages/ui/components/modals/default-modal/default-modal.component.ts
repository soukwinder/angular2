import {Component, OnInit, ViewContainerRef} from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import {PieChartService} from "../../../../dashboard/pieChart/pieChart.service";
import {ToastyService, ToastyConfig, ToastOptions, ToastData} from 'ng2-toasty';

@Component({
  selector: 'add-service-modal',
  styleUrls: [('./default-modal.component.scss')],
  templateUrl: './default-modal.component.html',
})

export class DefaultModal implements OnInit {

  modalHeader: string;
  modalContent;
  activeTemp;
  inactiveTemp;
  activeHumidity;
  inactiveHumidity;
  activeLight;
  inactiveLight;

  constructor(private toastyService:ToastyService, private toastyConfig: ToastyConfig, private _pieChartService: PieChartService, private activeModal: NgbActiveModal) {
    this.toastyConfig.theme = 'default';
  }

  addToast(title) {
    var toastOptions:ToastOptions = {
      title: title,
      msg: "",
      showClose: true,
      timeout: 5000,
      theme: 'default',
    };
    //this.toastyService.success(toastOptions);
  }

  ngOnInit() {
    this.getActiveTemp()
    this.getInactiveTemp()
    this.getActiveHumidity()
    this.getInactiveHumidity()
    this.getActiveLight()
    this.getInactiveLight()
  }

  //temp services
  getActiveTemp(){
  this._pieChartService.getActiveTemp()
    .subscribe(
      (data => {
          this.activeTemp = data.json()
          console.log(this.activeTemp)
        }
      )
    )
}

  getInactiveTemp(){
    this._pieChartService.getInactiveTemp()
      .subscribe(
        (data => {
            this.inactiveTemp = data.json()
            console.log(this.inactiveTemp)
          }
        )
      )
  }


  stopSensorTemp(id, title){
    this._pieChartService.stopSensorTemp(id)
      .subscribe(
        (data => {
          this.addToast(title)
          location.reload()
        })
      )
  }

  restartSensorTemp(id, title){
    this._pieChartService.restartSensorTemp(id)
      .subscribe(
        (data => {
          this.addToast(title)
          location.reload()
        })
      )
  }

  deleteSensorTemp(id, title){
    this._pieChartService.deleteSensorTemp(id)
      .subscribe(
        (data => {
          this.addToast(title)
          location.reload()
        })
      )
  }


  stopSensorTempButton(title) {
    if($("#exampleSelect1").val() != null && $("#exampleSelect1").val() != 'Selecteer:') {
      this.stopSensorTemp($("#exampleSelect1").val(), title)
    }
    this.activeModal.close();
  }

  restartSensorTempButton(title) {
    if($("#exampleSelect2").val() != null && $("#exampleSelect2").val() != 'Selecteer:') {
      this.restartSensorTemp($("#exampleSelect2").val(), title)
    }
    this.activeModal.close();
  }

  deleteSensorTempButton(title) {
    if($("#exampleSelect3").val() != null && $("#exampleSelect3").val() != 'Selecteer:') {
      this.deleteSensorTemp($("#exampleSelect3").val(), title)
    }
    if($("#exampleSelect4").val() != null && $("#exampleSelect4").val() != 'Selecteer:') {
      this.deleteSensorTemp($("#exampleSelect4").val(), title)
    }
    this.activeModal.close();
  }

  //luchtvochtigheid services
  getActiveHumidity(){
    this._pieChartService.getActiveHumidity()
      .subscribe(
        (data => {
            this.activeHumidity = data.json()
            console.log(this.activeHumidity)
          }
        )
      )
  }

  getInactiveHumidity(){
    this._pieChartService.getInactiveHumidity()
      .subscribe(
        (data => {
            this.inactiveHumidity = data.json()
            console.log(this.inactiveHumidity)
          }
        )
      )
  }


  stopSensorHumidity(id, title){
    this._pieChartService.stopSensorHumidity(id)
      .subscribe(
        (data => {
          this.addToast(title)
          location.reload()
        })
      )
  }

  restartSensorHumidity(id, title){
    this._pieChartService.restartSensorHumidity(id)
      .subscribe(
        (data => {
          this.addToast(title)
          location.reload()
        })
      )
  }

  deleteSensorHumidity(id, title){
    this._pieChartService.deleteSensorHumidity(id)
      .subscribe(
        (data => {
          this.addToast(title)
          location.reload()
        })
      )
  }


  stopSensorHumidityButton(title) {
    if($("#exampleSelect5").val() != null && $("#exampleSelect5").val() != 'Selecteer:') {
      this.stopSensorHumidity($("#exampleSelect5").val(), title)
    }
    this.activeModal.close();
  }

  restartSensorHumidityButton(title) {
    if($("#exampleSelect6").val() != null && $("#exampleSelect6").val() != 'Selecteer:') {
      this.restartSensorHumidity($("#exampleSelect6").val(), title)
    }
    this.activeModal.close();
  }

  deleteSensorHumidityButton(title) {
    if($("#exampleSelect7").val() != null && $("#exampleSelect7").val() != 'Selecteer:') {
      this.deleteSensorHumidity($("#exampleSelect7").val(), title)
    }
    if($("#exampleSelect8").val() != null && $("#exampleSelect8").val() != 'Selecteer:') {
      this.deleteSensorHumidity($("#exampleSelect8").val(), title)
    }
    this.activeModal.close();
  }

  //licht services
  getActiveLight(){
    this._pieChartService.getActiveLight()
      .subscribe(
        (data => {
            this.activeLight = data.json()
            console.log(this.activeLight)
          }
        )
      )
  }

  getInactiveLight(){
    this._pieChartService.getInactiveLight()
      .subscribe(
        (data => {
            this.inactiveLight = data.json()
            console.log(this.inactiveLight)
          }
        )
      )
  }


  stopSensorLight(id, title){
    this._pieChartService.stopSensorLight(id)
      .subscribe(
        (data => {
          this.addToast(title)
          location.reload()
        })
      )
  }

  restartSensorLight(id, title){
    this._pieChartService.restartSensorLight(id)
      .subscribe(
        (data => {
          this.addToast(title)
          location.reload()
        })
      )
  }

  deleteSensorLight(id, title){
    this._pieChartService.deleteSensorLight(id)
      .subscribe(
        (data => {
          this.addToast(title)
          location.reload()
        })
      )
  }


  stopSensorLightButton(title) {
    if($("#exampleSelect9").val() != null && $("#exampleSelect9").val() != 'Selecteer:') {
      this.stopSensorLight($("#exampleSelect9").val(), title)
    }
    this.activeModal.close();
  }

  restartSensorLightButton(title) {
    if($("#exampleSelect10").val() != null && $("#exampleSelect10").val() != 'Selecteer:') {
      this.restartSensorLight($("#exampleSelect10").val(), title)
    }
    this.activeModal.close();
  }

  deleteSensorLightButton(title) {
    if($("#exampleSelect11").val() != null && $("#exampleSelect11").val() != 'Selecteer:') {
      this.deleteSensorLight($("#exampleSelect11").val(), title)
    }
    if($("#exampleSelect12").val() != null && $("#exampleSelect12").val() != 'Selecteer:') {
      this.deleteSensorLight($("#exampleSelect12").val(), title)
    }
    this.activeModal.close();
  }

  closeModal() {
    this.activeModal.close();
  }
}

