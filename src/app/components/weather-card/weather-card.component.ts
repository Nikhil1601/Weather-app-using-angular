import { Component, OnInit } from '@angular/core';
import { WeatherService } from '../../services/weather.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
// import {dataTemp} from '../../../models/dataTemp' 


@Component({
  selector: 'app-weather-card',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './weather-card.component.html',
  styleUrl: './weather-card.component.css',
  providers:[WeatherService],
})
export class WeatherCardComponent implements OnInit {
  cityName = 'Delhi';
  city ='Delhi'
  data ={
    temp :'',
    feelsLike :'',
    pressure:'',
    humidity:'',
    imgUrl:'',
    visibility:'',
    description:''
  }

  constructor(private readonly weatherService: WeatherService){}
  
  ngOnInit(): void{
    this.loadData()
  }

  loadData(){
    if(this.cityName){
      this.weatherService.fetchData(this.cityName).subscribe({
        next: (data: any) =>{
          this.city = this.cityName;
          this.data.temp = data.main.temp.toString();
          this.data.feelsLike = data.main.feels_like.toString();
          this.data.pressure = data.main.pressure.toString();
          this.data.humidity = data.main.humidity.toString();
          this.data.visibility = ((data.visibility)/1000).toString();
          this.data.description = data.weather[0].description.toString();
          this.data.imgUrl = data.weather[0].icon.toString();
          console.log(this.data)
          console.log(data)
        }, error(e){
          console.log(e)
        }
      })
    }
  }
}
