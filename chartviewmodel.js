import DashboardDataModel from './dashboarddatamodel.js';

export default class ChartViewModel {
    data = [];
    labels = [];
    totalCount = 0;
    carCount = 0;
    truckCount = 0;
    busCount = 0;
    messageStatus = false;

    subscribe = function(listener){
        this.listeners.push(listener);
    }

    constructor(model) {
        this.model = model;
        this.model.subscribe(this.updateChartData.bind(this));
        this.listeners = [];
        this.notify = function(){
            for(var i = 0; i < this.listeners.length; i++){
                var callback = this.listeners[i];
                callback();
            }
        };
    }

    updateChartData() {
        if (this.model.messageStatus == false) {
            this.totalCount = null;
            this.carCount = null;
            this.truckCount = null;
            this.busCount = null;
            this.messageStatus = this.model.messageStatus;
        } else {
            this.data = [this.model.carCount, this.model.truckCount, this.model.busCount];
            this.labels = ["CARS", "TRUCKS", "BUSES"];
            this.totalCount = this.model.totalCount;
            this.carCount = this.model.carCount;
            this.truckCount = this.model.truckCount;
            this.busCount = this.model.busCount;
            this.messageStatus = this.model.messageStatus;
        }

        this.notify();
    }
}