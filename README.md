# MistyVision-Dashboard
As part of MistyWest’s performance evaluation of MistySOM, an internally developed computer vision SOM (System-on-Module), an object detection model was deployed to identify vehicle types on a Vancouver road in real-time using a solar-driven camera system. 
<div align="center">
  <img src="images/MistyVision%20Dashboard%20Camera%20Setup.jpg" alt="MistyVision Dashboard Camera Setup" width="500"/>
</div>

**MistyVision Dashboard is a responsive vehicle type identification website that displays the real-time object detection video feed, its information, a dynamic visualization of vehicle type counts, as well as a page for historical data and videos downloads.**

*The object detection camera system is no longer running, but the Dashboard UI can still be seen here: https://dash.mistysom.com/*

## Feature
### MistyVision Dashboard Main Page
  - Menu Sidebar
  - Live Object Detection Video Stream with Playback
  - Video Stream Information Display
  - A dynamic customized Chart.js doughnut chart displaying real-time vehicle count distribution
  <div align="center">
    <img src="images/MV%20-%20Live.png" alt="MV - Live" width="800"/>
  </div>

- Device Status reflects 4 different states:
  - Live
  - No Live Video
  <div align="center">
    <img src="images/MV%20-%20No%20Live%20Video.png" alt="MV - No Live Video" width="800"/>
  </div>
  
  - No Live Data
  <div align="center">
    <img src="images/MV%20-%20No%20Live%20Data.png" alt="MV - No Live Data" width="800"/>
  </div>
  
  - Offline (No Live Video & No Live Data)
  <div align="center">
    <img src="images/MV%20-%20Offline.png" alt="MV - Offline" width="800"/>
  </div>

### Historical Data Page
  - Real-time Update For the Past 8 Hours:
    - Vehicle Count for Each Vehicle Type
    - Video Playback
    - Vehicle Count Data CSV Export
    - Video Download
  <div align="center">
    <img src="images/MV%20-%20Historical%20Data%20Page.png" alt="MV - Historical Data Page" width="800"/>
  </div>

##  How MistyVision Dashboard is Built
**Tech used:** JavaScript, HTML, CSS, Chart.js

The MistyVision Dashboard is built entirely using JavaScript, HTML, and CSS. All the backend services are stored in Azure.

### <ins>MistyVision Dashboard Main Page<ins>
The Dashboard Main Page uses **object oriented programming principles** and implements the **Model-View-ViewModel** architecture to set up all the different classes to enhance scalibility and maintainability. The *Model* for the main page fetches all the video and vehicle type count data. It also sets up listeners subscription to notify all subscribed listeners using the **Observer Pattern**. .then() promise chaining is used to fetch a WebSocket connection token from an API and establishes a connection. The incoming WebSocket messages are parsed as JSON and update the video related properties and different vehicle type counts.
A separate video player *Model* fetches the live video, sets up the video.js player, and sets up an event listener for various video player events including whether the video is live or not to monitor the video's status. 

The video related properties from the *Model* are then used in the *DataDisplayView* class to update the Dashboard Main Page user interface and the live video player, acting as the *View* in MVVM. By subscribing to the *Model*, the *DataDisplayView* is able to update the UI whenever the *Model's* data changes. This class also sets the "Device Status" between ON, OFFLINE, NO LIVE VIDEO, or NO LIVE DATA based on whether the video is live and JSON data is coming through.

The vehicle type counts properties from the *Model* are processed separately in the *ChartViewModel* class which is the *ViewModel* in MVVM. This class also subscribes to the *Model* and processes the data from the *Model* and prepares it for the customized doughnut chart display on the Dashboard Main Page. Once the chart data is updated, the *View* component responsible for rendering the doughnut chart is notified that data has changed and the chart needs to be refreshed. This allows the *View* to focus only on displaying data, while the *ChartViewModel* handles the data manipulation.

The *ChartView* class represents the *View* in MVVM. Here it displays *ChartViewModel's* data using a Chart.js customized doughnut chart with features including centre text, doughnut segment labels, and vehicle type legend.

### <ins>Historical Data Page<ins>
Similarly to the Dashboard Main Page, the Historical Data Page also implements the Model-View-ViewModel architecture. The Historical Data Page is split into the past 8 hours, with the vehicle count for each vehicle type, video recording, vehicle count data CSV and video download displayed for each hour. The historical data is refreshed in real time every hour on the hour as new vehicle count and video data is recorded A *HistoricalDataModel* is set up and fetches video and vehicle type count data for the past 8 hours which are stored in Azure. Due to the simplicity of the Historical Data Page setup, a separate *ViewModel* was not used. Instead, the data received in the *HistoricalDataModel* is processed directly within the *HistoricalDataDisplayView* and displayed directly in the UI. 

All the styling for both the MistyVision Dashboard pages is done in CSS. The MistyVision Dashboard is made responsive using viewport heights and viewport widths in CSS.

## Some Technical Challenges and Achievements
1. Implemention of Model-View-ViewModel architecture for Javascript codebase
2. Real-time data updating and handling with use of the Observer Pattern
3. Data visualization with custom Chart.js doughnut chart features
4. Customizing Chart.js doughnut chart to reflect UI/UX designer's vision
5. Responsive and adaptable layout and web page design
6. Integration of live video stream with playback
7. Consistent dashboard styling using CSS

## To-Do's & Potential Improvements:
1. Pre-loading data for the Historical Data Page to reduce load times especially when displaying large datasets
2. Responsive web design on mobile devices
3. Improve vehicle data visualizations with additional metrics
   - peak times for vehicle traffic/peak vehicle counts, video playback statistics
4. Visual chart/graph elements for the Historical Data Page
