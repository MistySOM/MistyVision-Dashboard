import DashboardDataModel from './dashboarddatamodel.js';
import ChartViewModel from './chartviewmodel.js';
import ChartView from './chartview.js';

document.addEventListener('DOMContentLoaded', function() {
    const dataModel = new DashboardDataModel();
    const chartViewModel = new ChartViewModel(dataModel);
    const chartView = new ChartView(chartViewModel);
});