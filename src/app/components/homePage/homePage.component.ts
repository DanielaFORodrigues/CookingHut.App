import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HomePageService } from 'src/app/services/homePage.service';

@Component({
  selector: 'app-homePage',
  templateUrl: './homePage.component.html',
  styleUrls: ['./homePage.component.css']
})
export class HomePageComponent implements OnInit {

  constructor(private homePageService: HomePageService, private router: Router) { }

  ngOnInit() {
  }
}

