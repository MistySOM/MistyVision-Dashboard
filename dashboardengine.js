// Import modules for video player, data model, display view, and chart view
import VideoPlayer from './videoplayer.js';
import DashboardDataModel from './dashboarddatamodel.js';
import DataDisplayView from './datadisplayview.js';
import ChartViewModel from './chartviewmodel.js';
import ChartView from './chartview.js';

// Wait for the DOM content to be fully loaded before executing the script
// Initialize the video player, the data model for the dashboard, the data display view,
// the chart view model, and the chart view
document.addEventListener('DOMContentLoaded', function() {
    const videoPlayer = new VideoPlayer();
    const dataModel = new DashboardDataModel();
    const dataDisplayView = new DataDisplayView(dataModel, videoPlayer);
    const chartViewModel = new ChartViewModel(dataModel);
    const chartView = new ChartView(chartViewModel);
});