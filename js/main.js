/* =====================
 Copy your code from Week 4 Lab 2 Part 2 part2-app-state.js in this space
===================== */

// changed the map to light-all 
var map = L.map('map', {
  center: [39.9522, -75.1639],
  zoom: 12
});

var Stamen_TonerLite = L.tileLayer('http://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png', {
  attribution: 'Map tiles by <a href="http://stamen.com">Stamen Design</a>, <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a> &mdash; Map data &copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
  subdomains: 'abcd',
  minZoom: 0,
  maxZoom: 20,
  ext: 'png'
}).addTo(map);

//fucntions to perform the task
var parsedData = function (data) {
  return JSON.parse(data);
};

var makeMarkers = function(json, Lat, Long){
  var markers=[];
  _.each(json, function (x) {
    markers.push(L.marker([x[Lat], x[Long]]));
  });
  return markers;
};

var plotMarkers = function (marker) {
  _.each(marker, function (x) {
    x.addTo(map);
  });
};

var removeMarkers = function (markers) {
  _.each(markers, function (x) {
    map.removeLayer(x);
  });
};

// read the user defined variables

var read = function() {
  var inputs = {url : $('#urlTxt').val(),
               Lat: $('#coord-y').val(),
               Long: $('#coord-x').val()};
  return inputs;
};

var Markers = []; // declaring an empty array so we can use it later to remove the markers

// function to execute the query and map the markers on click
$('#mapButton').click(function(){
  var data = read();
  var req = $.ajax(data.url);
  req.done(function(obj) {
    var parsed = parsedData(obj);
    console.log(parsed);
    Markers = makeMarkers(parsed,data.Lat,data.Long);
    plotMarkers(Markers);

  });
});

$('#buttons').click(function(){
  removeMarkers(Markers);
});
