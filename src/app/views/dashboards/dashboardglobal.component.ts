import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { isError } from 'util';
import { NgForm } from '@angular/forms/src/directives/ng_form';
import { DataSetItem } from '../../models/datasetitem';


@Component({
  selector: 'dashboardglobal',
  templateUrl: './dashboardglobal.component.html',
  styleUrls : ['./dashboardglobal.component.css']

})


export class DashboardGlobalComponent {
  constructor () {
    
  }
}