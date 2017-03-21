$(function initializeMap () {

  const fullstackAcademy = new google.maps.LatLng(40.705086, -74.009151);

  const styleArr = [
    {
      featureType: 'landscape',
      stylers: [{ saturation: -100 }, { lightness: 60 }]
    },
    {
      featureType: 'road.local',
      stylers: [{ saturation: -100 }, { lightness: 40 }, { visibility: 'on' }]
    },
    {
      featureType: 'transit',
      stylers: [{ saturation: -100 }, { visibility: 'simplified' }]
    },
    {
      featureType: 'administrative.province',
      stylers: [{ visibility: 'off' }]
    },
    {
      featureType: 'water',
      stylers: [{ visibility: 'on' }, { lightness: 30 }]
    },
    {
      featureType: 'road.highway',
      elementType: 'geometry.fill',
      stylers: [{ color: '#ef8c25' }, { lightness: 40 }]
    },
    {
      featureType: 'road.highway',
      elementType: 'geometry.stroke',
      stylers: [{ visibility: 'off' }]
    },
    {
      featureType: 'poi.park',
      elementType: 'geometry.fill',
      stylers: [{ color: '#b6c54c' }, { lightness: 40 }, { saturation: -40 }]
    }
  ];

  const mapCanvas = document.getElementById('map-canvas');

  const currentMap = new google.maps.Map(mapCanvas, {
    center: fullstackAcademy,
    zoom: 13,
    mapTypeId: google.maps.MapTypeId.ROADMAP,
    styles: styleArr
  });

  // const iconURLs = {
  //   hotel: '/images/lodging_0star.png',
  //   restaurant: '/images/restaurant.png',
  //   activity: '/images/star-3.png'
  // };

  function drawMarker (type, coords) {
    const latLng = new google.maps.LatLng(coords[0], coords[1]);
    const marker = new google.maps.Marker({
      position: latLng
    });
    marker.setMap(currentMap);
  }

  // drawMarker('hotel', [40.705137, -74.007624]);
  // drawMarker('restaurant', [40.705137, -74.013940]);
  // drawMarker('activity', [40.716291, -73.995315]);

    hotels.forEach(function(element){
        $('[data-type="hotels"]').append("<option>"+ element.name + "</option>");
    });

    restaurants.forEach(function(element){
        $('[data-type="restaurants"]').append("<option>"+ element.name + "</option>");
    });

    activities.forEach(function(element){
        $('[data-type="activities"]').append("<option>"+ element.name + "</option>");
    });


    // hotels event listener
    $('#hotelButton').on('click', function() {
        // if there is not already a selected hotel
        if($('.hotel-list').has('li').length){
          console.log('It has kids.');
          $('.hotel-list').children('li').remove();
          $('.hotel-list').children('br').remove();
        }
        var selectedHotel = $('.btn-primary').siblings('[data-type="hotels"]').find("option:selected").text();
        $('.hotel-list').append($('<li>' + selectedHotel + '</li><br>'));
    })

    // restaurants event listener
      $('#restButton').on('click', function() {
      var selectedRestaurant = $('.btn-primary').siblings('[data-type="restaurants"]').find("option:selected").text();
      $('.restaurant-list').append($('<li>' + selectedRestaurant + '</li><br>'));
    })

    // activities event listener
        // restaurants event listener
      $('#actButton').on('click', function() {
      var selectedActivity = $('.btn-primary').siblings('[data-type="activities"]').find("option:selected").text();
      $('.activities-list').append($('<li>' + selectedActivity + '</li><br>'));
    })

});
