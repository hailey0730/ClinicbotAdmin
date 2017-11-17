import { Component, OnInit, AfterViewInit, ElementRef } from '@angular/core';
import { TableData } from '../md/md-table/md-table.component';
import { LegendItem, ChartType } from '../md/md-chart/md-chart.component';

import * as Chartist from 'chartist';
import { dashboardService } from './dashboard.service'
import { Observable } from "rxjs/Observable";
import { DateAdapter } from '@angular/material';
import { MaterialModule, MdDatepickerModule, MdNativeDateModule, MdInputModule, MdSelectModule } from '@angular/material';
import { SelectModule } from 'ng2-select';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { IMyDrpOptions, IMyDateRangeModel } from 'mydaterangepicker';

declare interface DataTable {
    headerRow: string[];
    footerRow: string[];
    dataRows: string[][];
}

declare const require: any;

declare const $: any;

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./css/table.css', './css/search.css'
    ],
    

    //   styleUrls: ['./css/conversation.css'],
    providers: [
        dashboardService
    ]
})
export class DashboardComponent implements OnInit, AfterViewInit {
    constructor(private dashboardService: dashboardService) {

    }
    // constructor(private navbarTitleService: NavbarTitleService, private notificationService: NotificationService) { }
    public dataTable: DataTable;
    
    public tableData: DataTable;
    public figures: JSON[];
    public results: any[];
    public doctors: any[] = [];
    public doctorsSearch: any[];
    public age: number;
    public beginDate: any;
    public endDate: any;
    public doctype: string[];
    myDateRangePickerOptions: IMyDrpOptions = {
        // other options...
        dateFormat: 'dd.mm.yyyy',
    };

    private adminName = "Bob";
    private adminPic = "../../assets/img/faces/avatar.jpg";
    private testlink = "http://www.drcare.ai/php/test.php";
    private simpleChartsLink = "http://hayhay0730.000webhostapp.com/simpleCharts.php";
    private usersDataLink = "http://hayhay0730.000webhostapp.com/loadUsersQuestions.php";
    private conversationLink = "http://hayhay0730.000webhostapp.com/conversation.php";
    private searchResult = "http://www.drcare.ai/Doctor/php/loadQA.php";

    startAnimationForLineChart(chart: any) {
        let seq: any, delays: any, durations: any;
        seq = 0;
        delays = 80;
        durations = 500;
        chart.on('draw', function (data: any) {

            if (data.type === 'line' || data.type === 'area') {
                data.element.animate({
                    d: {
                        begin: 600,
                        dur: 700,
                        from: data.path.clone().scale(1, 0).translate(0, data.chartRect.height()).stringify(),
                        to: data.path.clone().stringify(),
                        easing: Chartist.Svg.Easing.easeOutQuint
                    }
                });
            } else if (data.type === 'point') {
                seq++;
                data.element.animate({
                    opacity: {
                        begin: seq * delays,
                        dur: durations,
                        from: 0,
                        to: 1,
                        easing: 'ease'
                    }
                });
            }
        });

        seq = 0;
    }
    startAnimationForBarChart(chart: any) {
        let seq2: any, delays2: any, durations2: any;
        seq2 = 0;
        delays2 = 80;
        durations2 = 500;
        chart.on('draw', function (data: any) {
            if (data.type === 'bar') {
                seq2++;
                data.element.animate({
                    opacity: {
                        begin: seq2 * delays2,
                        dur: durations2,
                        from: 0,
                        to: 1,
                        easing: 'ease'
                    }
                });
            }
        });

        seq2 = 0;
    }
    // constructor(private navbarTitleService: NavbarTitleService) { }
    public ngOnInit() {

        //get users' questions from server===========================================
        this.dashboardService.getJson(this.usersDataLink).then((data) => {
            this.dataTable = {
                headerRow: data['headerRow'],
                footerRow: data['headerRow'],
                dataRows: data['Users']
               
            };

            // console.log(this.dataTable);

        });

        this.doctype = ["西醫", "中醫", "牙科", "物理治療", "脊骨神經科", "專業治療", "心理學"];
        

        // this.dataTable = {
        //     headerRow: [
        //         "ID", "Category", "Topic", "Question", "Gender", "Age", "Date", "Fname", "Lname", "Actions"
        //     ],
        //     footerRow: [
        //         "ID","Category","Topic","Question","Gender","Age","Date","Fname","Lname","Actions"
        //     ],
        //     dataRows: [
        //         [
        //             "41", "普通科", "主題係主題", "你好", "男性", "32", "07 Nov 2017", "生", "陳"
        //         ],
        //         [
        //             "42","普通科", "有痰", "我有痰，係唔係感冒？", "女性", "23", "07 Nov 2017", "小姐", "趙"
        //         ],
        //         [
        //             "43","普通科","咳","咳咗三日點算好?咳咗三日點算好?咳咗三日點算好?","女性","30","07 Nov 2017","小姐","趙"
        //         ]
        //     ]

        //     };
  
        //test plug in charts data from server===============================================
        // console.log("call loadSimpleCharts from OnInit");
        // this.loadSimpleCharts();

        //testing get json from dashboardService=================================
        //   console.log('outside promise');  //DEBUG
        // this.dashboardService.getJson(this.testlink).then((data) => {
        //     this.figures = data;
            // console.log(this.figures);  //DEBUG
            // $('.card-header').attr('data-background-color', this.figures[2]['backgroundColor']);

        // });

        //initialize multipleBarsChart=========================================
        const dataMultipleBarsChart = {
            labels: ['Jan', 'Feb', 'Mar', 'Apr', 'Mai', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
            series: [
                [542, 443, 320, 780, 553, 453, 326, 434, 568, 610, 756, 895],
                [412, 243, 280, 580, 453, 353, 300, 364, 368, 410, 636, 695]
            ]
        };

        const optionsMultipleBarsChart = {
            seriesBarDistance: 10,
            axisX: {
                showGrid: false
            },
            height: '300px'
        };

        const responsiveOptionsMultipleBarsChart: any = [
            ['screen and (max-width: 640px)', {
                seriesBarDistance: 5,
                axisX: {
                    labelInterpolationFnc: function (value: any) {
                        return value[0];
                    }
                }
            }]
        ];

        const multipleBarsChart = new Chartist.Bar('#multipleBarsChart', dataMultipleBarsChart,
            optionsMultipleBarsChart, responsiveOptionsMultipleBarsChart);

        // start animation for the Emails Subscription Chart
        this.startAnimationForBarChart(multipleBarsChart);


        //initialize PieChart==================================================
        const dataPreferences = {
            labels: ['50%', '12%', '32%', '6%'],
            series: [50, 12, 32, 6]
        };

        const optionsPreferences = {
            height: '230px'
        };

        new Chartist.Pie('#chartPreferences', dataPreferences, optionsPreferences);


        //test search result appearance========================================
        this.dashboardService.getJson(this.searchResult).then((data) => {
            this.results = data;
            
            // console.log(this.results);
        });
        

    }

     

    ngAfterViewInit() {
        // const breakCards = true;
        // if (breakCards === true) {
        //     // We break the cards headers if there is too much stress on them :-)
        //     $('[data-header-animation="true"]').each(function () {
        //         const $fix_button = $(this);
        //         const $card = $(this).parent('.card');
        //         $card.find('.fix-broken-card').click(function () {
        //             const $header = $(this).parent().parent().siblings('.card-header, .card-image');
        //             $header.removeClass('hinge').addClass('fadeInDown');

        //             $card.attr('data-count', 0);

        //             setTimeout(function () {
        //                 $header.removeClass('fadeInDown animate');
        //             }, 480);
        //         });

        //         $card.mouseenter(function () {
        //             const $this = $(this);
        //             const hover_count = parseInt($this.attr('data-count'), 10) + 1 || 0;
        //             $this.attr('data-count', hover_count);
        //             //    if (hover_count >= 20) {
        //             //        $(this).children('.card-header, .card-image').addClass('hinge animated');
        //             //    }
        //         });
        //     });
        // }

        //  Activate the tooltips
        $('[rel="tooltip"]').tooltip();
    
        
    }

    approveQuestion(row) {
        //write row into DB
        console.log(row);
        console.log(this.doctors);
    }

    denyQuestion(row){
        //remove row from DB
        console.log(row);
        const table = $('#datatables').DataTable();
        const $tr = $(this).closest('tr');
        table.row($tr).remove().draw();
    }

    refreshTable(){
        $('#datatables').DataTable({
            'pagingType': 'full_numbers',
            'lengthMenu': [[10, 25, 50, -1], [10, 25, 50, 'All']],
            responsive: true,
            language: {
                search: '_INPUT_',
                searchPlaceholder: 'Search records',
            }

        });

        const table = $('#datatables').DataTable();


        // Delete a record
        table.on('click', '.remove', function (e: any) {
            const $tr = $(this).closest('tr');
            table.row($tr).remove().draw();
            e.preventDefault();
        });

        // Like record
        table.on('click', '.like', function () {
            alert('You clicked on Like button');
        });
    }


    // dateRangeChanged callback function called when the user apply the date range. This is
    // mandatory callback in this option. There are also optional inputFieldChanged and
    // calendarViewChanged callbacks.
    onDateRangeChanged(event: IMyDateRangeModel) {
        // event properties are: event.beginDate, event.endDate, event.formatted,
        // event.beginEpoc and event.endEpoc
        
        this.beginDate = event.beginDate;
        this.endDate = event.endDate;
        
    }
    
    searchHistory(){
        console.log(this.doctorsSearch);
        console.log($('#Category').val());
        console.log($('#Topic').val());
        console.log($('#Question').val());
        console.log($('input[name="optionsRadios"]:checked').val());
        console.log(this.age);
        console.log($('#docName').val());
        console.log($('#Answer').val());
        console.log(this.beginDate);
        console.log(this.endDate);
        console.log(this.doctors);
    }

    


    loadSimpleCharts() {

        this.dashboardService.getJson(this.simpleChartsLink).then((data) => {
            //   console.log(data[0]);  //DEBUG
            //initialize daily sales chart
            const optionsDailySalesChart = {
                lineSmooth: Chartist.Interpolation.cardinal({
                    tension: 0
                }),
                low: 0,
                high: data[0]['scale'], // creative tim: we recommend you to set the high sa the biggest value + something for a better look
                chartPadding: { top: 0, right: 0, bottom: 0, left: 0 },
            };

            const dataDailySalesChart = {
                labels: data[0]['labels'],
                series: data[0]['series']
            };
            //   console.log(dataDailySalesChart);  //DEBUG
            const dailySalesChart = new Chartist.Line('#dailySalesChart', dataDailySalesChart, optionsDailySalesChart);

            this.startAnimationForLineChart(dailySalesChart);

            //initialize completed tasks chart
            const optionsCompletedTasksChart = {
                lineSmooth: Chartist.Interpolation.cardinal({
                    tension: 0
                }),
                low: 0,
                high: data[1]['scale'], // creative tim: we recommend you to set the high sa the biggest value + something for a better
                // look
                chartPadding: { top: 0, right: 0, bottom: 0, left: 0 }
            };

            const dataCompletedTasksChart = {
                labels: data[1]['labels'],
                series: data[1]['series']
            }
            const completedTasksChart = new Chartist.Line('#completedTasksChart', dataCompletedTasksChart,
                optionsCompletedTasksChart);

            this.startAnimationForLineChart(completedTasksChart);

            //initialize website views chart
            const optionsWebsiteViewsChart = {
                axisX: {
                    showGrid: false
                },
                low: 0,
                high: data[2]['scale'],
                chartPadding: { top: 0, right: 5, bottom: 0, left: 0 }
            };
            const responsiveOptions: any = [
                ['screen and (max-width: 640px)', {
                    seriesBarDistance: 5,
                    axisX: {
                        labelInterpolationFnc: function (value) {
                            return value[0];
                        }
                    }
                }]
            ];

            const dataWebsiteViewsChart = {
                labels: data[2]['labels'],
                series: data[2]['series']
            }
            const websiteViewsChart = new Chartist.Bar('#websiteViewsChart', dataWebsiteViewsChart, optionsWebsiteViewsChart, responsiveOptions);

            this.startAnimationForBarChart(websiteViewsChart);
        });
    }


}
