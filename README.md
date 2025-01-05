# MistyVision-Dashboard
As part of MistyWest’s performance evaluation of MistySOM, an internally developed computer vision SOM (System-on-Module), the team deployed an object detection model to identify vehicle types on a Vancouver road in real-time using a solar-driven camera system. 
<div align="center">
  <img src="images/MistyVision%20Dashboard%20Camera%20Setup.jpeg" alt="MistyVision Dashboard Camera Setup" width="500"/>
</div>

**MistyVision Dashboard is a responsive vehicle identification website that displays the real-time object detection video feed, its information, a dynamic visualization of vehicle counts, as well as a page for historical data and videos downloads.**

## Features
- MistyVision Dashboard Main Page
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

- Historical Data Page
  - For the past 8 hours:
    - Vehicle Count Data Display
    - Video Playback
    - Vehicle Count Data CSV Export
    - Video Download
  <div align="center">
    <img src="images/MV%20-%20Historical%20Data%20Page.png" alt="MV - Historical Data Page" width="800"/>
  </div>

## MistyVision Dashboard is Built Using: / How It's Made
**Tech used:** JavaScript, HTML, CSS, Chart.js
The entire web dashboard is done using purely JavaScript, HTML, and CSS. All the backend services are stored in Azure.

### <ins>MistyVision Dashboard Main Page<ins>


### <ins>Historical Data Page<ins>




## Some Technical Challenges and Achievements
1. Integrating live video stream with playback
2. Customizing Chart.js doughnut chart to reflect UI/UX designer's vision
3. Implementing MVVM architecture for Javascript Codebase
4. Styling the Frontend using raw CSS

## To-Do's:

