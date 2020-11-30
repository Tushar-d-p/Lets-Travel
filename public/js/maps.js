let platform = new H.service.Platform({
    'apikey': 'v8jSSl6Tj9QHqc5nweUj3Rf5Cs7rKQUEppOa_9C4uV0'
  });



function landmarkGeocode() {
    let title = document.querySelector("h1").textContent;

    var geocoder = platform.getSearchService(),
        landmarkGeocodingParameters = {
          q: title,
          at: '0,0',
          limit: 1
        };
  
    geocoder.discover(
      landmarkGeocodingParameters,
      showMap,
      (e) => console.log(e)
    );
  }

function showMap(result){
    let location = result.items[0].position;

    console.log(location);

    // Obtain the default map types from the platform object:
    let defaultLayers = platform.createDefaultLayers();

    // Instantiate (and display) a map object:
    let map = new H.Map(
        document.querySelector('.map'),
        defaultLayers.vector.normal.map,
        {
        zoom: 12,
        center: { lat: location.lat, lng: location.lng }
        });

    let ui = H.ui.UI.createDefault(map, defaultLayers); 
}

landmarkGeocode();