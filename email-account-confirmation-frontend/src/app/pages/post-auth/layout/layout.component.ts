import { Component, OnInit } from '@angular/core';
import { CommonService } from '../../../services/common.service';
declare var $:any;

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit {

  constructor(private _commonService: CommonService) { }

  userFirstName: string = 'Unknown';
  setTimeOutId;
  ngOnInit(): void {
    this.setTimeOutId=setTimeout(() => {
      document.getElementById('userGreeting').innerText=""
    }, 5000);
    this.userFirstName = this._commonService.getUserName()?.split(' ')[0];

    var sphereContent = $('.sphere'),
				sphereHeight = sphereContent.height(),
				parentHeight = $(window).height(),
				topMargin = (parentHeight - sphereHeight) / 2;

			sphereContent.css({
				"margin-top" : topMargin+"px"
			});

			var heroContent = $('.hero'),
				heroHeight = heroContent.height(),
				heroTopMargin = (parentHeight - heroHeight) / 2;

			heroContent.css({
				"margin-top" : heroTopMargin+"px"
			});
    }



  ngOnDestroy(){
    clearTimeout(this.setTimeOutId);
  }

}
