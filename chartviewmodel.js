import DashboardDataModel from './dashboarddatamodel.js';

export default class ChartViewModel {
    data = [];
    labels = [];
    totalCount = 0;
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
        this.data = [this.model.carCount, this.model.truckCount, this.model.busCount];
        this.labels = ["CARS", "TRUCKS", "BUSES"];
        this.averageCount = this.model.totalCount;
        this.notify();
    }
}