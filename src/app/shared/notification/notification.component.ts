import { Component, OnInit } from '@angular/core';
import { ETNotification, ETNotificationType } from './notification.model';
import { ETNotificationService } from '../services/notification.service';

@Component({
	selector: 'et-notification',
	templateUrl: './notification.html'
})

export class ETNotificationComponent implements OnInit {
	alerts: ETNotification[] = [];
	staticAlertClosed = false;
	constructor(private alertService: ETNotificationService) { }

	ngOnInit() {
		this.alertService.getETNotification().subscribe((alert: ETNotification) => {
			if (!alert) {
				// clear alerts when an empty alert is received
				this.alerts = [];
				return;
			}

			// add alert to array
			this.alerts.push(alert);
			setTimeout(() => this.staticAlertClosed = true, 5000);
		});
	}

	removeAlert(alert: ETNotification) {
		this.alerts = this.alerts.filter(x => x !== alert);
	}

	cssClass(alert: ETNotification) {
		if (!alert) {
			return;
		}

		// return css class based on alert type
		switch (alert.type) {
			case ETNotificationType.Success:
				return 'alert alert-success';
			case ETNotificationType.Error:
				return 'alert alert-danger';
			case ETNotificationType.Info:
				return 'alert alert-info';
			case ETNotificationType.Warning:
				return 'alert alert-warning';
		}
	}
}
