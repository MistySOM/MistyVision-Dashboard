// Import modules for video player, data model, display view, and chart view
import VideoPlayer from './videoplayer.js';
import DashboardDataModel from './dashboarddatamodel.js';
import DataDisplayView from './datadisplayview.js';
import ChartViewModel from './chartviewmodel.js';
import ChartView from './chartview.js';

// Wait for the DOM content to be fully loaded before executing the script
document.addEventListener('DOMContentLoaded', function() {
    // Initialize the video player
    const videoPlayer = new VideoPlayer();

    // Initialize the data model for the dashboard
    const dataModel = new DashboardDataModel();

    // Initialize the data display view, passing the data model and video player
    const dataDisplayView = new DataDisplayView(dataModel, videoPlayer);

    // Initialize the chart view model, passing the data model
    const chartViewModel = new ChartViewModel(dataModel);

    // Initialize the chart view, passing the chart view model
    const chartView = new ChartView(chartViewModel);
});