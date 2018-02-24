# capstone-project
Unit 4

Type or click a place and the website will tell you the Air Quality Index (AQI), which aggregates the levels of various air pollutants.

Table of Contents:
Technology used
Usage
How it works
API documentation

Technology used:
HTML, CSS and JavaScript
Linked to the site via Github: jquery, moments

Usage:
Can be used on any browser, all that needs to be done is enable browser geolocation to show the initial page, which displays AQI in your location

How it works:
When you first open the page, the browser uses geolocation to obtain your coordinates. These are then used in a call to the Air Visual API to get information air quality in your location.
Next, when you type or click a place on the Google Map, the Google Geolocation API will find those coordinates and the Air Visual API will be called again.

API Documentation:
Air Visual API (https://www.airvisual.com/user/api) 
Google Geolocation API (https://developers.google.com/maps/documentation/geolocation/intro)
