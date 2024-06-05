// Import modules for data model and display view
import HistoricalDataModel from './historicaldatamodel.js';
import HistoricalDataDisplayView from './historicaldatadisplayview.js';

// Wait for the DOM content to be fully loaded before executing the script
// Initialize the data model for the historical data page and the data display view
document.addEventListener('DOMContentLoaded', function() {
    const historicalDataModel = new HistoricalDataModel();
    const historicalDataDisplayView = new HistoricalDataDisplayView(historicalDataModel);
});