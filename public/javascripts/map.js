function initialize() {
  var coor = window.coor;
  if (coor) {
    mapOptions = {
      center: {
        lat: coor[0],
        lng: coor[1],
      },
      zoom: 15,
      scrollwheel: false
    };
    let map = new google.maps.Map(document.getElementById('map'),
      mapOptions);

    let marker = new google.maps.Marker({
      map: map,
      position: {
        lat: coor[0],
        lng: coor[1],
      },
    });

  } else if (coor === undefined) {

    var mapOptions = {
      center: {
        lat: 48.866667,
        lng: 2.333333
      },
      zoom: 12,
      scrollwheel: false
    };

    let map = new google.maps.Map(document.getElementById('map'),
      mapOptions);

    let input = (document.getElementById('pac-input'));

    // Create the autocomplete helper, and associate it with
    // an HTML text input box.
    let autocomplete = new google.maps.places.Autocomplete(input);
    // autocomplete.bindTo('bounds', map);

    // map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);

    let infowindow = new google.maps.InfoWindow();
    let marker = new google.maps.Marker({
      map: map
    });

    google.maps.event.addListener(marker, 'click', function () {
      infowindow.open(map, marker);
    });

    // Get the full place details when the user selects a place from the
    // list of suggestions.
    google.maps.event.addListener(autocomplete, 'place_changed', function () {
      infowindow.close();
      let place = autocomplete.getPlace();
      if (!place.geometry) {
        return;
      }

      if (place.geometry.viewport) {
        map.fitBounds(place.geometry.viewport);
      } else {
        map.setCenter(place.geometry.location);
        map.setZoom(17);
      }


      // update map?
      if ($('#pac-input').val()) {
        console.log(place.geometry.location.lat());
        $('#lat-input').val(place.geometry.location.lat());
        $('#lng-input').val(place.geometry.location.lng());
      }

      // Set the position of the marker using the place ID and location.
      marker.setPlace( /** @type {!google.maps.Place} */ ({
        placeId: place.place_id,
        location: place.geometry.location
      }));
      marker.setVisible(true);

    });
  }
}






function showFeedback(postResponse) {
  console.log('post success');
  console.log(postResponse);
}

function handleError(err) {
  console.log('Oh no! Error:');
  console.log(err);
}

window.onload = function () {
  initialize();
  var buttons = Array.from(document.querySelectorAll('.js-send'));
  buttons.forEach(function (button) {
    button.addEventListener('click', function (event) {
      event.preventDefault();
      let input = document.getElementById("bitch").value
      let color = this.name
      $.ajax({
        // Notice that we are using POST
        type: 'POST',
        url: '/',
        // The data key is for sending data in a POST, PUT or PATCH!
        data: {
          name: input,
          color
        },
        success: showFeedback,
        error: handleError
      });
      location.reload();
    });
  });


}

// Run the initialize function when the window has finished loading.
// google.maps.event.addDomListener(window, 'load', initialize);