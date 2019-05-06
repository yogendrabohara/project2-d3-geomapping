// Creating map object
var map = L.map("map", {
    center: [40.7128, -74.0059],
    zoom: 2
  });
  
  // Adding tile layer
  L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
    attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
    maxZoom: 18,
    id: "mapbox.streets",
    accessToken: API_KEY
  }).addTo(map);

//var geojson = L.geoJson(data).addTo(map);




function getColor(s) {
  return s > 7 ? 'red' :
        s > 6  ? 'blue' :
        s > 5  ? 'yellow' :
        s > 4  ? 'green' :
        s > 3   ? '#FD8D3C' :
        s > 2  ? '#FED976' :
                  '#FFEDA0';
}



function style(feature) {
  return {
      fillColor: getColor(feature.score),
      weight: 2,
      opacity: 1,
      color: 'black',
      dashArray: '3',
      fillOpacity: 0.5
  };
}

var geojson = L.geoJson(data, {style: style}).addTo(map);

geojson.eachLayer(function (layer) {
  layer.bindPopup(layer.feature.properties.name + "<br>Happiness Rank: " +layer.feature.rank  + "<br>Happiness Score: " + layer.feature.score);
});


var legend = L.control({position: 'bottomright'});

 legend.onAdd = function (map) {

     var div = L.DomUtil.create('div', 'info legend'),
         grades = [0, 2, 3, 4, 5, 6, 7],
         labels = [];

     // loop through our density intervals and generate a label with a colored square for each interval
     for (var i = 0; i < grades.length; i++) {
         div.innerHTML +=
             '<i style="background:' + getColor2(grades[i] + 1) + '"></i>' +
             grades[i] + (grades[i + 1] ? '&ndash;' + grades[i + 1] + '<br>' : '+');
     }

     return div;
 };

 function getColor2(d) {
  return d > 5  ? 'red' :
         d > 4  ? '#FD8D3C' :
         d > 3   ? 'orange' :
         d > 2   ? 'yellow' :
         d > 1   ? 'lightgreen' :
                    'green';
 }

 legend.addTo(map);

