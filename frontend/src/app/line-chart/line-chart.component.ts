import { Component, OnInit } from '@angular/core';
import {BSEStockDataModel,BSEStockDataModelUpdated} from './models/bseStockData';
import {LineChartService} from './line-chart.service';

import * as d3 from 'd3';
import * as d3Scale from 'd3-scale';
import * as d3Shape from 'd3-shape';
import * as d3Array from 'd3-array';
import * as d3Axis from 'd3-axis';


@Component({
  selector: 'app-line-chart',
  templateUrl: './line-chart.component.html',
  styleUrls: ['./line-chart.component.scss']
})
export class LineChartComponent implements OnInit {
  title = 'Line Chart';
  data : any  = [];updatedData : BSEStockDataModelUpdated[] = [];
  private margin = {top: 20, right: 20, bottom: 30, left: 50};
  private width: number;
  private height: number;
  private x: any;
  private y: any;
  private svg: any; 
  private line: d3Shape.Line<[number, number]>; // this is line defination

  constructor(private readonly lineChartService :LineChartService) { 
    this.width = 960 - this.margin.left - this.margin.right;
    this.height = 500 - this.margin.top - this.margin.bottom;
  
  }

  ngOnInit(): void {
    this.getClosingData();

    let rectangle = d3.range(3).map(function() {
      return {
        x: Math.floor(Math.random()*width),
        y: Math.floor(Math.random()*height)
      };
    });
    
    let dragRect = svg.selectAll('g').data(rectangle).enter()
      .append("g")
    
    dragRect.append("rect")
      .attr("x",function(d){return d['x'];})
      .attr("y",function(d){return d['y'];})
      .attr("height", 50)
      .attr("width", 50)
      .style("fill", "steelblue")
    
    svg.selectAll('rect')
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")")
      .data(rectangle)
      .call(d3.drag()
        .on("start", dragstarted)
        .on("drag", dragged)
        .on("end", dragended)
      );
   
  }

  ngAfter

  private buildSvg() {
    
        this.svg = d3.select('svg')
            .append('g')
            .attr('transform', 'translate(' + this.margin.left + ',' + this.margin.top + ')');
        
        
    }
    private addXandYAxis() {
         // range of data configuring
         this.x = d3Scale.scaleTime().range([0, this.width]);
         this.y = d3Scale.scaleLinear().range([this.height, 0]);
         console.log(this.updatedData);
         this.x.domain(d3Array.extent(this.updatedData, (d) => d["Date"] ));
         this.y.domain(d3Array.extent(this.updatedData, (d) => d["Close"] ));

        // Configure the Y Axis
        this.svg.append('g')
            .attr('transform', 'translate(0,' + this.height + ')')
            .call(d3Axis.axisBottom(this.x));
        // Configure the Y Axis
        this.svg.append('g')
            .attr('class', 'axis axis--y')
            .call(d3Axis.axisLeft(this.y));
    }

    private drawLineAndPath() {
        this.line = d3Shape.line()
            .x( (d: any) => this.x(d.Date) )
            .y( (d: any) => this.y(d.Close) );
        // Configuring line path
        this.svg.append('path')
            .datum(this.updatedData)
            .attr('class', 'line')
            .attr('d', this.line);
    }

 async getClosingData() {
   try {
     this.lineChartService.getBSEData().subscribe(res => 
      {this.data = res;
        this.updatedData = this.prepareData(this.data);
        this.buildSvg();
        this.addXandYAxis();
        this.drawLineAndPath();},error => { 
    console.log(error)});
    
   } catch(error) {
     alert(error);
   }
 
}

 prepareData(data : any[])  {

  data.forEach(el => {
    el['Date'] = new Date(el['Date']);
  });
  return data;

}

//only interested in "drag" event listener, not "start" or "end"        
 setDragBounds(subject) {
  dragBounds.top = 0 - margin.top;
  dragBounds.left = 0 - margin.left;
  dragBounds.bottom = height - tickHeight - subject.attr('height');
  dragBounds.right = width - margin.right - subject.attr('width');
}

 dragstarted(d){
  /* 
    Calculate drag bounds at dragStart because it's one event vs many 
    events if done in 'dragged()'
  */    
  setDragBounds(d3.select(this)) 
  d3.select(this).raise().classed("active", true);
}

 dragged(d){
  d3.select(this)
    .attr("x", getX(d.x = d3.event.x) )
    .attr("y", getY(d.y = d3.event.y) );
}

 getX(x) {
  return x < dragBounds.left ? dragBounds.left
    : x > dragBounds.right ? dragBounds.right 
    : x
}

 getY(y) {
  return y < dragBounds.top ? dragBounds.top
    : y > dragBounds.bottom ? dragBounds.bottom 
    : y
}

 dragended(d){
  d3.select(this).classed("active", false);
}


 }


