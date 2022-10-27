// Add console.log to chec kand see if our code is working
console.log("working");

// We create the tile layer that will be the background of our map.
let streets = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/streets-v11/tiles/{z}/{x}/{y}?access_token={accessToken}', {
attribution: 'Map data © <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    accessToken: API_KEY
});

// We create the dark view tile layer that will be an option for our map.
let dark = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/dark-v10/tiles/{z}/{x}/{y}?access_token={accessToken}', {
attribution: 'Map data © <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    accessToken: API_KEY
});

// create a base layer to hold the maps
let baseMaps = {
    Street : streets,
    Dark : dark
};

// create the map object using setView
let map = L.map('mapid', {
    center : [39.000, -105.844],
    zoom : 7,
    layers : [streets] //this is the default layers shown
});

// Add counties to map
let counties = "Counties_in_Colorado.geojson"

d3.json(counties).then(function(data) {
  // add to map
  L.geoJSON(data, {
    onEachFeature : function(feature, layer) {
      // console.log(feature.properties);
      layer.bindPopup("<h3>" + feature.properties.county + " County</h3>")
    }
  }).addTo(map)
});

// Add fire data.
let fireData = "WFIGS_-_Wildland_Fire_Locations_Full_History.geojson"

d3.json(fireData).then(function(data) {
    // putting the data on a map
    L.geoJSON(data, {
        onEachFeature : function(feature, layer) {
            // console.log(feature.properties);
            // console.log(layer);
            layer.bindPopup("<h3> Fire Discovery Date: " + feature.properties.FireDiscoveryDateTime + "</h3><hr><h4>Estimated Total Cost: " + feature.properties.EstimatedCostToDate + "</h4><br><h4>County: " +feature.properties.POOCounty);
        }
    }).addTo(map);
});

//add the layer control
L.control.layers(baseMaps).addTo(map);
