import {Component, OnInit} from '@angular/core';

import {ChartistJsService} from './chartistJs.service';
import {PieChartService} from "../../../dashboard/pieChart/pieChart.service";
import {FormBuilder, FormControl, FormGroup} from "@angular/forms";

@Component({
  selector: 'chartist-js',
  templateUrl: './chartistJs.html',
  styleUrls: ['./chartistJs.scss']
})

export class ChartistJs implements OnInit{
  sensorType = ['temperatuur', 'luchtvochtigheid', 'licht'];
 // months = ['Januari','Februari','Maart','April','Mei','Juni','Juli','Augustus','September','Oktober','November','December'];
  months = [1,2,3,4,5,6,7,8,9,11,12];

  years = ['2016','2017','2018']
  allProducts = [];

  totalTemp;
  totalHumidity;
  totalLight;


  lineData;

  data: any;
  labelArray = [];
  meanArray = [];
  productsAfterChangeEvent = [];
  productForm : FormGroup;

  constructor(private dataService: PieChartService, fb: FormBuilder) {
    this.productForm = fb.group({
      months: [],
      years: [],
      productType: [],
      product: [],
    });
    this.data = {
      labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
      datasets: [
        {
          label: 'First Dataset',
          data: [65, 59, 80, 81, 56, 55, 40],
          fill: false,
          borderColor: '#F53636'
        }
      ]
    }
  }

  ngOnInit(){
    this.getTotalIdsTemp()
    this.getTotalIdsHumidity()
    this.getTotalIdsLight()
  }

  test(){
    const productType = this.productForm.get('productType').value;
    this.productsAfterChangeEvent = this.allProducts.filter(p => p.type == productType);
    const months = this.productForm.get('months').value;
    const years = this.productForm.get('years').value;
    console.log(this.productForm.get('years').value)
  }

  getTotalIdsTemp(){
    this.dataService.getTotalTemp()
      .subscribe(
        (data => {
          this.totalTemp = data.json()
          this.alleData(this.totalTemp, 'temperatuur')
        })
      )
  }

  getTotalIdsHumidity(){
    this.dataService.getTotalHumidity()
      .subscribe(
        (data => {
          this.totalHumidity = data.json()
          this.alleData(this.totalHumidity, 'luchtvochtigheid')
        })
      )
  }

  getTotalIdsLight(){
    this.dataService.getTotalLight()
      .subscribe(
        (data => {
          this.totalLight = data.json()
          this.alleData(this.totalLight, 'licht')
        })
      )
  }

  alleData(ids, type){
    for(var i = 0; i < ids.length; i++){
      this.allProducts.push({name: ids[i], type: type})
    }
  }

  update(event: Event){
    const productType = this.productForm.get('productType').value;
    const months = this.productForm.get('months').value;
    const years = this.productForm.get('years').value;
    const id = this.productForm.get('product').value;

    this.dataService.getLineData(productType, years, months, id)
      .subscribe(
        (data => {
          this.lineData = data.json()
          this.createLineData(this.lineData)
        })
      )
    console.log(productType+", "+months+", "+years+", "+id)
  }

  createLineData(linedata){

    this.meanArray = []
    this.labelArray = []

    for(var i = 1; i < linedata.length; i++){

      this.meanArray.push(JSON.parse(JSON.stringify(linedata))[i].mean)
      this.labelArray.push(i)
    }

    console.log(this.meanArray+", "+this.labelArray)

    this.data = {
      labels: this.labelArray,
      datasets: [
        {
          label: 'First Dataset',
          data: this.meanArray,
          fill: false,
          borderColor: '#F53636'
        }
      ]
    }
  }
}
