// Import modules for data model and display view
import HistoricalDataModel from './historicaldatamodel.js';
import HistoricalDataDisplayView from './historicaldatadisplayview.js';

// Wait for the DOM content to be fully loaded before executing the script
document.addEventListener('DOMContentLoaded', function() {
    // Initialize the data model for the historical data page
    const historicalDataModel = new HistoricalDataModel();

    // Initialize the data display view, passing the data model
    const historicalDataDisplayView = new HistoricalDataDisplayView(historicalDataModel);
});