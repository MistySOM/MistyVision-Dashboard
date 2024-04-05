import VideoPlayer from './videoplayer.js';
import DashboardDataModel from './dashboarddatamodel.js';
import DataDisplayView from './datadisplayview.js';
import ChartViewModel from './chartviewmodel.js';
import ChartView from './chartview.js';

document.addEventListener('DOMContentLoaded', function() {
    const videoPlayer = new VideoPlayer();
    const dataModel = new DashboardDataModel();
    const dataDisplayView = new DataDisplayView(dataModel, videoPlayer);
    const chartViewModel = new ChartViewModel(dataModel);
    const chartView = new ChartView(chartViewModel);
});