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
  //benaming alle variables die nodig zijn
  sensorType = ['temperatuur', 'luchtvochtigheid', 'licht'];
  months = [1,2,3,4,5,6,7,8,9,11,12];

  years = ['2016','2017','2018']
  allProducts = [];

  totalTemp;
  totalHumidity;
  totalLight;


  lineData;
  lineDataa;
  lineData1;
  lineData1a;

  number;

  data: any;
  data1: any;
  data2: any;
  labelArray = [];
  meanArray = [];
  meanArray1 = [];
  productsAfterChangeEvent = [];
  productForm : FormGroup;
  productsAfterChangeEvent1 = [];
  productForm1 : FormGroup;

  constructor(private dataService: PieChartService, fb: FormBuilder) {
    //maken van een formgroup, zodat ze aangesproken kunnen worden
    this.productForm = fb.group({
      months: [],
      years: [],
      productType: [],
      product: [],
      product1: [],
    });
    this.productForm1 = fb.group({
      months1: [],
      years1: [],
      productType1: [],
      product: [],
      product1: [],
    });

    this.number = 1;

  }

  ngOnInit(){
    //voert als eerst deze functies uit
    this.getTotalIdsTemp()
    this.getTotalIdsHumidity()
    this.getTotalIdsLight()
  }

  //laat de bijhorende ids zien van de geselecteerde sensors
  test(){
    const productType = this.productForm.get('productType').value;
    this.productsAfterChangeEvent = this.allProducts.filter(p => p.type == productType);
  }
  test1(){
    const productType = this.productForm1.get('productType1').value;
    this.productsAfterChangeEvent1 = this.allProducts.filter(p => p.type == productType);
  }

  //totale actieve en inactieve ids van de sensor temperatuur
  getTotalIdsTemp(){
    this.dataService.getTotalTemp()
      .subscribe(
        (data => {
          this.totalTemp = data.json()
          this.alleData(this.totalTemp, 'temperatuur')
        })
      )
  }

  //totale actieve en inactieve ids van de sensor luchtvochtigheid
  getTotalIdsHumidity(){
    this.dataService.getTotalHumidity()
      .subscribe(
        (data => {
          this.totalHumidity = data.json()
          this.alleData(this.totalHumidity, 'luchtvochtigheid')
        })
      )
  }

  //totale actieve en inactieve ids van de sensor licht
  getTotalIdsLight(){
    this.dataService.getTotalLight()
      .subscribe(
        (data => {
          this.totalLight = data.json()
          this.alleData(this.totalLight, 'licht')
        })
      )
  }

  //voegt de ids toe aan de dropdown list
  alleData(ids, type){
    for(var i = 0; i < ids.length; i++){
      this.allProducts.push({name: ids[i], type: type})
    }
  }

  //update de grafiek met de geselecteerde data
  update(event: Event){
    const productType = this.productForm.get('productType').value;
    const months = this.productForm.get('months').value;
    const years = this.productForm.get('years').value;
    const id = this.productForm.get('product').value;
    const id1 = this.productForm.get('product1').value;

    this.dataService.getLineData(productType, years, months, id)
      .subscribe(
        (data => {
          this.lineData = data.json()
          this.createLineData(this.lineData, id, id1)
        })
      )
    this.dataService.getLineData(productType, years, months, id1)
      .subscribe(
        (data => {
          this.lineDataa = data.json()
        }))
  }

  //update de grafiek met de geselecteerde data
  update1(event: Event){
    const productType = this.productForm1.get('productType1').value;
    const months = this.productForm1.get('months1').value;
    const years = this.productForm1.get('years1').value;
    const id = this.productForm1.get('product').value;
    const id1 = this.productForm1.get('product1').value;


    this.dataService.getLineData(productType, years, months, id)
      .subscribe(
        (data => {
          this.lineData1 = data.json()
          this.createLineData1(this.lineData1, id, id1)
        })
      )
      this.dataService.getLineData(productType, years, months, id1)
        .subscribe(
          (data => {
            this.lineData1a = data.json()
          })
        )
  }

  //maakt de grafiek
  createLineData(linedata, id, id1){
    console.log(id1)
    this.meanArray = []
    this.meanArray1 = []
    this.labelArray = []

    for(var i = 0; i < linedata.length; i++){
      this.meanArray.push(JSON.parse(JSON.stringify(linedata))[i].mean)
      if(id1 == 'Selecteer:' || id1 == null){
        console.log('geen mean')
      } else{
        this.meanArray1.push(JSON.parse(JSON.stringify(this.lineDataa))[i].mean)
      }
      this.labelArray.push(i+1)
    }
    this.data = {
      labels: this.labelArray,
      datasets: [
        {
          label: 'ID: '+id,
          data: this.meanArray,
          fill: false,
          borderColor: '#F53636'
        },
        {
          label: 'ID :'+id1,
          data: this.meanArray1,
          fill: false,
          borderColor: '#F5f500'
        }
      ]
    }
  }

  //maakt de lijngrafiek
  createLineData1(linedata, id, id1){
    this.meanArray = []
    this.meanArray1 = []
    this.labelArray = []

    for(var i = 0; i < linedata.length; i++){
      this.meanArray.push(JSON.parse(JSON.stringify(linedata))[i].mean)
      if(id1 == 'Selecteer:' || id1 == null){
        console.log('geen mean')
      } else{
        this.meanArray1.push(JSON.parse(JSON.stringify(this.lineData1a))[i].mean)
      }
      this.labelArray.push(i+1)
    }

    this.data1 = {
      labels: this.labelArray,
      datasets: [
        {
          label: 'ID: '+id,
          data: this.meanArray,
          fill: false,
          borderColor: '#F53636'
        },
        {
          label: 'ID :'+id1,
          data: this.meanArray1,
          fill: false,
          borderColor: '#F5f500'
        }
      ]
    }
}
}
