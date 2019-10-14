import { Component, OnInit, Input, HostListener, ViewChild, ElementRef, ViewEncapsulation } from '@angular/core';
import * as moment from 'moment';
import { ConsultationsService } from 'src/app/shared/services/consultations.service';
import { UserService } from 'src/app/shared/services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile-card',
  templateUrl: './profile-card.component.html',
  styleUrls: ['./profile-card.component.scss'],
  encapsulation: ViewEncapsulation.None,

})
export class ProfileCardComponent implements OnInit {

  @ViewChild('shareOptionsElement', { static: false }) shareOptionsElement: ElementRef;
  @ViewChild('spreadButtonElement', { static: false }) spreadButtonElement: ElementRef;

  @Input() profile: any;
  @Input() summaryData: any;

  enableSubmitResponse: boolean;
  currentUser: any;
  showShareOptions: boolean;
  currentUrl = '';
  showConfirmEmailModal: boolean;

  constructor(private consultationsService: ConsultationsService,
              private userService: UserService,
              private router: Router ) { }

  ngOnInit() {
      this.currentUrl = window.location.href;
      this.CheckSubmitResponseEnabled();
      this.getCurrentUser();
  }

  getCurrentUser() {
    this.userService.userLoaded$
    .subscribe((data) => {
      if (data) {
        this.currentUser = this.userService.currentUser;
      } else {
        this.currentUser = null;
      }
    });
  }

  @HostListener('document:click', ['$event.target'])
  onClick(targetElement) {
    if (this.showShareOptions) {
      if (this.shareOptionsElement.nativeElement.contains(targetElement) ||
          this.spreadButtonElement.nativeElement.contains(targetElement)) {
            return;
      } else {
        this.showShareOptions = false;
      }
    }
  }

  getRemainigDays(deadline) {
    const today = moment();
    const lastDate = moment(deadline);
    const difference = lastDate.diff(today, 'days');
    if (difference <= 0) {
      return difference === 0 ? 'Last day to respond' : 'Closed';
    } else {
      return `${difference} Days Remaining`;
    }
  }

  convertDateFormat(date) {
    return moment(date).format('Do MMM YY');
  }

  getTwitterUrl(link) {
    const today = moment();
    const lastDate = moment(this.profile.responseDeadline);
    const difference = lastDate.diff(today, 'days');
    let remainingDays = '';
    if (difference <= 0) {
      remainingDays =  difference === 0 ? ', last day for you to share your feedback too!' : '.';
    } else {
      remainingDays =  `, only ` + `${difference} Days Remaining for you to share your feedback too!`;
    }
    const text  = `It’s your turn citizen! I shared my feedback on ` +
                  `${this.profile.title}${remainingDays}`;
    const url = `https://twitter.com/intent/tweet?text=${text}&url=${link}`;
    return url;
  }

  createCalendarEvent() {
    if (this.profile && this.profile.title && this.profile.responseDeadline) {
      let startDate: any =  new Date(this.profile.responseDeadline).setHours(0, 0, 0);
      startDate = new Date(startDate).toISOString();
      let endDate: any  = new Date(this.profile.responseDeadline).setHours(23, 59, 59);
      endDate = new Date(endDate).toISOString();
      const calendarUrl = `https://calendar.google.com/calendar/r/eventedit?text=` +
      `Civis consultation response deadline- ${this.profile.title}` +
      `&dates=${startDate.split('-').join('').split(':').join('').split('.000').join('')}/` +
      `${endDate.split('-').join('').split(':').join('').split('.000').join('')}` +
      `&details=&sf=true&output=xml`;
      return calendarUrl;
    }
    return '';
  }

  CheckSubmitResponseEnabled() {
    this.consultationsService.enableSubmitResponse
    .subscribe((value) => {
      if (value) {
        this.enableSubmitResponse = true;
      } else {
        this.enableSubmitResponse = false;
      }
    });
  }

  stepNext(hasResponseSubmited) {
    if (!this.currentUser) {
      this.router.navigateByUrl('/auth');
      return;
    }

    if (this.currentUser && !this.currentUser.confirmedAt) {
      this.showConfirmEmailModal = true;
      return;
    }

    if (!hasResponseSubmited) {
      this.consultationsService.scrollToCreateResponse.next(true);
    }
    if (this.enableSubmitResponse) {
      this.consultationsService.openFeedbackModal.next(true);
    }
  }
}
