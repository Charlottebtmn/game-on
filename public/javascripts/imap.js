function initMap() {
  var myLatLng = {
    lat: 48.866667,
    lng: 2.333333
  };

  var map = new google.maps.Map(document.getElementById('imap'), {
    zoom: 2,
    center: myLatLng
  });

  for (let i = 0; i < games.length; i++) {
    var marker = new google.maps.Marker({
      position : {
        lat: games[i].coordinates[0],
        lng: games[i].coordinates[1],
      },
      map: map,
      title: games[i].title,
    });
  }
}

initMap();