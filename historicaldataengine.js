import HistoricalDataModel from './historicaldatamodel.js';
import HistoricalDataDisplayView from './historicaldatadisplayview.js';

document.addEventListener('DOMContentLoaded', function() {
    const historicalDataModel = new HistoricalDataModel();
    const historicalDataDisplayView = new HistoricalDataDisplayView(historicalDataModel);
});