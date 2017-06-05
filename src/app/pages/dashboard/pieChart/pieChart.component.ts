import {Component, OnInit, ViewContainerRef} from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import {PieChartService} from './pieChart.service';
import {ToastyService, ToastyConfig, ToastOptions, ToastData} from 'ng2-toasty';

import 'easy-pie-chart/dist/jquery.easypiechart.js';
import {DefaultModal} from "../../ui/components/modals/default-modal/default-modal.component";
import {LocalDataSource} from "ng2-smart-table";

@Component({
  selector: 'pie-chart',
  templateUrl: './pieChart.html',
  styleUrls: ['./pieChart.scss']
})
// TODO: move easypiechart to component
export class PieChart implements OnInit{

  activeTemp;
  inactiveTemp;

  activeHumidity;
  inactiveHumidity;

  activeLight;
  inactiveLight;

  source: LocalDataSource = new LocalDataSource();

  constructor(private toastyService:ToastyService, private toastyConfig: ToastyConfig, private modalService: NgbModal, private _pieChartService: PieChartService) {
    this.toastyConfig.theme = 'default';
   // this.tableData()
    this.getData().then((data) => {
      this.source.load(data);
    });
  }

  ngOnInit() {
    this.getActiveTemp()
    this.getInactiveTemp()
    this.getActiveHumidity()
    this.getInactiveHumidity()
    this.getActiveLight()
    this.getInactiveLight()

  }

  //temp modals
  modalStopTemp(): void {
    const activeModal = this.modalService.open(DefaultModal, {size: 'sm'});
    activeModal.componentInstance.modalHeader = 'Temperatuur Sensor Stoppen';
  }

  modalRestartTemp(): void {
    const activeModal = this.modalService.open(DefaultModal, {size: 'sm'});
    activeModal.componentInstance.modalHeader = 'Temperatuur Sensor Herstarten';
  }

  modalDeleteTemp(): void {
    const activeModal = this.modalService.open(DefaultModal, {size: 'sm'});
    activeModal.componentInstance.modalHeader = 'Temperatuur Sensor Verwijderen';
  }

  //luchtvochtigheid modals
  modalStopHumidity(): void {
    const activeModal = this.modalService.open(DefaultModal, {size: 'sm'});
    activeModal.componentInstance.modalHeader = 'Luchtvochtigheid Sensor Stoppen';
  }

  modalRestartHumidity(): void {
    const activeModal = this.modalService.open(DefaultModal, {size: 'sm'});
    activeModal.componentInstance.modalHeader = 'Luchtvochtigheid Sensor Herstarten';
  }

  modalDeleteHumidity(): void {
    const activeModal = this.modalService.open(DefaultModal, {size: 'sm'});
    activeModal.componentInstance.modalHeader = 'Luchtvochtigheid Sensor Verwijderen';
  }

  //licht modals
  modalStopLight(): void {
    const activeModal = this.modalService.open(DefaultModal, {size: 'sm'});
    activeModal.componentInstance.modalHeader = 'Licht Sensor Stoppen';
  }

  modalRestartLight(): void {
    const activeModal = this.modalService.open(DefaultModal, {size: 'sm'});
    activeModal.componentInstance.modalHeader = 'Licht Sensor Herstarten';
  }

  modalDeleteLight(): void {
    const activeModal = this.modalService.open(DefaultModal, {size: 'sm'});
    activeModal.componentInstance.modalHeader = 'Licht Sensor Verwijderen';
  }

  //actieve en inactive sensors van temp in een variable zetten.
  getActiveTemp(){
    this._pieChartService.getActiveTemp()
      .subscribe(
        (data => {
            this.activeTemp = data.json(),
              this.tableData(this.activeTemp, 'Temperatuur', 'Actief'),
            console.log(this.activeTemp)
          }
        )
      )
  }

  getInactiveTemp(){
    this._pieChartService.getInactiveTemp()
      .subscribe(
        (data => {
            this.inactiveTemp = data.json(),
              this.tableData(this.inactiveTemp, 'Temperatuur', 'Inactief'),
            console.log(this.inactiveTemp)
          }
        )
      )
  }

  //actieve en inactive sensors van luchtvochtigheid in een variable zetten.
  getActiveHumidity(){
    this._pieChartService.getActiveHumidity()
      .subscribe(
        (data => {
            this.activeHumidity = data.json(),
              this.tableData(this.activeHumidity, 'Luchtvochtigheid', 'Actief'),
            console.log(this.activeHumidity)
          }
        )
      )
  }

  getInactiveHumidity(){
    this._pieChartService.getInactiveHumidity()
      .subscribe(
        (data => {
            this.inactiveHumidity = data.json(),
              this.tableData(this.inactiveHumidity, 'Luchtvochtigheid', 'Inactief'),
              console.log(this.inactiveHumidity)
          }
        )
      )
  }

  //actieve en inactive sensors van licht in een variable zetten.
  getActiveLight(){
    this._pieChartService.getActiveLight()
      .subscribe(
        (data => {
            this.activeLight = data.json(),
              this.tableData(this.activeLight, 'Licht', 'Actief'),
              console.log(this.activeLight)
          }
        )
      )
  }

  getInactiveLight(){
    this._pieChartService.getInactiveLight()
      .subscribe(
        (data => {
            this.inactiveLight = data.json(),
              this.tableData(this.inactiveLight, 'Licht', 'Inactief'),
              console.log(this.inactiveLight)
          }
        )
      )
  }

  //een notificatie als iets gewijzigt is.
  addToast(title) {
    // Just add default Toast with title only
    // Or create the instance of ToastOptions
    var toastOptions:ToastOptions = {
      title: title,
      msg: "",
      showClose: true,
      timeout: 5000,
      theme: 'default',
    };
    // Add see all possible types in one shot
    this.toastyService.success(toastOptions);
  }

  //maak nieuwe sensor aan voor temp
  createTemp(title){
    this._pieChartService.createSensorTemp()
      .subscribe(
        (data => {
         // this.activeTemp.length = this.activeTemp.length + 1,
          this.addToast(title)
        })
      )
  }

  //maak nieuwe sensor aan voor luchtvochtigheid
  createHumidity(title){
    this._pieChartService.createSensorHumidity()
      .subscribe(
        (data => {
          // this.activeHumidity.length = this.activeHumidity.length + 1,
          this.addToast(title)
        })
      )
  }

  //maak nieuwe sensor aan voor licht
  createLight(title){
    this._pieChartService.createSensorLight()
      .subscribe(
        (data => {
          // this.activeLight.length = this.activeLight.length + 1,
          this.addToast(title)
        })
      )
  }

  //table
  query: string = '';

  settings = {
    columns: {
      id: {
        title: 'ID',
        type: 'number'
      },
      typesensor: {
        title: 'Sensor Type',
        type: 'string'
      },
      statussensor: {
        title: 'Status',
        type: 'string'
      }
    }
  };

  tableData(sensor, type, status){
    for(var i = 0; i < sensor.length; i++){
      this.smartTableData.push({id: sensor[i], typesensor: type, statussensor: status})
    }
    // for(var i = 0; i < this.inactiveTemp.length; i++){
    //   this.smartTableData.push({id: this.inactiveTemp[i], typesensor: 'Temperatuur', statussensor: 'Inactief'})
    // }
    // for(var i = 0; i < this.activeHumidity.length; i++){
    //   this.smartTableData.push({id: this.activeHumidity[i], typesensor: 'Luchtvochtigheid', statussensor: 'Actief'})
    // }
    // for(var i = 0; i < this.inactiveHumidity.length; i++){
    //   this.smartTableData.push({id: this.inactiveHumidity[i], typesensor: 'Luchtvochtigheid', statussensor: 'Inactief'})
    // }
    // for(var i = 0; i < this.activeLight.length; i++){
    //   this.smartTableData.push({id: this.activeLight[i], typesensor: 'Licht', statussensor: 'Actief'})
    // }
    // for(var i = 0; i < this.inactiveLight.length; i++){
    //   this.smartTableData.push({id: this.inactiveLight[i], typesensor: 'Licht', statussensor: 'Inactief'})
    // }
  }

  smartTableData = [];

  getData(): Promise<any> {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(this.smartTableData);
      }, 2000);
    });
  }

}