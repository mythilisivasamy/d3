import { Component, OnInit } from '@angular/core';
import * as d3 from 'd3';
import * as d3Scale from 'd3';
import * as  d3Axis from 'd3';
import { ticks } from 'd3';

//import {d3Scale,d3Shape,d3Array,d3Axis,d3} from 'd3';
import { Population} from '../data';
import {ServiceService} from '../service';

@Component({
  selector: 'app-barchart',
  template: `
    <p>
    <svg width="960" height="600"></svg>
    </p>
  `,
  styles: [
  ]
})
export class BarchartComponent implements OnInit {
  data!:Population[];
  private margin = {top: 20, right: 20, bottom: 40, left: 100};
  private width: number=960;
  private height: number=500;
  private innerWidth=this.width- this.margin.left - this.margin.right;
  private innerHeight=this.height- this.margin.top - this.margin.bottom;
  private xScale: any;
  private yScale: any;
  private svg: any;

  constructor(private ds:ServiceService) { 
    this.data=this.ds.getData();
  }

  ngOnInit(): void {
    this.buildSvg();
    this.addXandYAxis();
    this.drawBarChart();
  }

  buildSvg(){
    this.svg=d3.select('svg')
    .append('g')
    .attr('transform', 'translate(' + this.margin.left + ',' + this.margin.top + ')');
  }

  addXandYAxis(){
    let temp:number[]=[];
    this.data.forEach(d=>{
      temp.push(d.population * 1000);
    })
   // console.log(Math.max(...temp));
    this.xScale=d3Scale.scaleLinear()
                .domain([0,Math.max(...temp)])
                .range([0,this.innerWidth]);

    this.yScale=d3Scale.scaleBand()
                .domain(this.data.map(d=>d.country))
                .range([0,this.innerHeight])
                .padding(0.1);
    this.svg.append('g')
        .attr('transform', 'translate(100,' + this.innerHeight + ')')
        .call(d3Axis.axisBottom(this.xScale));
    // Configure the Y Axis
    this.svg.append('g')
    .attr('transform',`translate(${this.margin.left},${this.margin.top})`)
      .call(d3Axis.axisLeft(this.yScale))

  }

  drawBarChart(){
   this.svg
     .selectAll('rect')
     .data(this.data)
     .enter()
      .append('rect')
    .attr('x',100)
    .attr('y',(d:Population)=>this.yScale(d.country))
    .attr('width',(d:Population)=>this.xScale(d.population * 1000))
    .attr('height',30)
    .attr('style','fill:red')
    
  }

}
