import HistoricalDataModel from './historicaldatamodel.js';
//import HistoricalDataViewModel from './historicaldataviewmodel.js';
import HistoricalDataDisplayView from './historicaldatadisplayview.js';

document.addEventListener('DOMContentLoaded', function() {
    const historicalDataModel = new HistoricalDataModel();
//    const historicalDataViewModel = new HistoricalDataViewModel(historicalDataModel);
    const historicalDataDisplayView = new HistoricalDataDisplayView(historicalDataModel);
});