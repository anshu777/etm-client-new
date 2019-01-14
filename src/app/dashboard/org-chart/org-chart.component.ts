import { Component } from '@angular/core';


@Component({
    selector:    'et-org-chart',
    templateUrl: './org-chart.component.html'
})

export class OrgChartComponent {
    topEmployee: any = {
        name: 'Janis Martin',
        designation: 'CEO',
        img: './assets/images/a.jpg',
        subordinates: [
            {
                name: 'Matthew Wikes',
                designation: 'VP',
                img: './assets/images/a.jpg',
                subordinates: [
                    {
                        name: 'Tina Landry',
                        designation: 'Budget Analyst',
                        subordinates: []
                    }
 
                ]
            },
            {
                name: 'Patricia Lyons',
                designation: 'VP',
                img: './assets/images/a.jpg',
                subordinates: [
                    {
                        name: 'Dylan Wilson',
                        designation: 'Web Manager',
                        img: './assets/images/a.jpg',
                        subordinates: []
                    },
                    {
                        name: 'Deb Curtis',
                        designation: 'Art Director',
                        img: './assets/images/a.jpg',
                        subordinates: []
                    }
                ]
            },
            {
                name: 'Larry Phung',
                designation: 'VP',
                img: './assets/images/a.jpg',
                subordinates: []
            }
        ]
    };

}
