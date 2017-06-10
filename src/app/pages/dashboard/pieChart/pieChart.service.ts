import {Injectable} from '@angular/core';
import {BaThemeConfigProvider, colorHelper} from '../../../theme';
import {Http} from "@angular/http";

@Injectable()
export class PieChartService {

  url = 'http://localhost:3001/'
  url1 = 'http://localhost:3005/'

  constructor(private http: Http) {

  }

  //Temp services
  getActiveTemp(){
    return this.http.get(this.url+'api/streamdata/temp/sensor/active')
  }

  getInactiveTemp(){
    return this.http.get(this.url+'api/streamdata/temp/sensor/inactive')
  }

  getTotalTemp(){
    return this.http.get(this.url+'api/streamdata/temp/sensors/totaal')
  }

  createSensorTemp(){
    return this.http.get(this.url+'api/streamdata/update/temp')
  }

  stopSensorTemp(id){
    return this.http.get(this.url+'api/streamdata/temp/stop/'+id)
  }

  restartSensorTemp(id){
    return this.http.get(this.url+'api/streamdata/temp/restart/'+id)
  }

  deleteSensorTemp(id){
    return this.http.get(this.url+'api/streamdata/temp/remove/'+id)
  }

  //luchtvochtigheid services
  getActiveHumidity(){
    return this.http.get(this.url+'api/streamdata/humidity/sensor/active')
  }

  getInactiveHumidity(){
    return this.http.get(this.url+'api/streamdata/humidity/sensor/inactive')
  }

  getTotalHumidity(){
    return this.http.get(this.url+'api/streamdata/humidity/sensors/totaal')
  }

  createSensorHumidity(){
    return this.http.get(this.url+'api/streamdata/update/humidity')
  }

  stopSensorHumidity(id){
    return this.http.get(this.url+'api/streamdata/humidity/stop/'+id)
  }

  restartSensorHumidity(id){
    return this.http.get(this.url+'api/streamdata/humidity/restart/'+id)
  }

  deleteSensorHumidity(id){
    return this.http.get(this.url+'api/streamdata/humidity/remove/'+id)
  }

  //Licht services
  getActiveLight(){
    return this.http.get(this.url+'api/streamdata/light/sensor/active')
  }

  getInactiveLight(){
    return this.http.get(this.url+'api/streamdata/light/sensor/inactive')
  }

  getTotalLight(){
    return this.http.get(this.url+'api/streamdata/light/sensors/totaal')
  }

  createSensorLight(){
    return this.http.get(this.url+'api/streamdata/update/light')
  }

  stopSensorLight(id){
    return this.http.get(this.url+'api/streamdata/light/stop/'+id)
  }

  restartSensorLight(id){
    return this.http.get(this.url+'api/streamdata/light/restart/'+id)
  }

  deleteSensorLight(id){
    return this.http.get(this.url+'api/streamdata/light/remove/'+id)
  }

  //visualisatie data

  getLineData(sensor, year, month, id){
    return this.http.get(this.url1+sensor+'/'+year+'/'+month+'/'+id)
  }
}
