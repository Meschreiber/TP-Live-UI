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
        var dayNum = whichDay();
        days[dayNum - 1].hotel = selectedHotel;
        //console.log(days[dayNum - 1].hotel);
        $('.hotel-list').append($('<li>' + selectedHotel + '</li><br>'));
    })

    // restaurants event listener
      $('#restButton').on('click', function() {
      var selectedRestaurant = $('.btn-primary').siblings('[data-type="restaurants"]').find("option:selected").text();
      $('.restaurant-list').append($('<li>' + selectedRestaurant + '</li><br>'));
       var dayNum = whichDay();
       days[dayNum - 1].restaurants.push(selectedRestaurant);
    })

    // activities event listener
        // restaurants event listener
      $('#actButton').on('click', function() {
      var selectedActivity = $('.btn-primary').siblings('[data-type="activities"]').find("option:selected").text();
      $('.activities-list').append($('<li>' + selectedActivity + '</li><br>'));
      var dayNum = whichDay();
      days[dayNum - 1].activities.push(selectedActivity);
      console.log(days[dayNum - 1])
    })

    // removes last hotel
    $('#removeHotel').on('click', function() {
      $('#removeHotel').siblings('li').last().remove()
      $('#removeHotel').siblings('br').last().remove()

    })

    // removes last restaurant
    $('#removeRest').on('click', function() {
      $('#removeRest').siblings('li').last().remove()
      $('#removeHotel').siblings('br').last().remove()
    })

    // removes last activity
    $('#removeAct').on('click', function() {
      $('#removeAct').siblings('li').last().remove()
      $('#removeHotel').siblings('br').last().remove()
    })

    // adds another day button
    $('#day-add').on('click', function() {
      var num = +$('div.day-buttons').find('button:nth-last-child(2)').text() + 1;
      $('.day-btn').removeClass('current-day');
      $('#day-add').before($('<button class="btn btn-circle day-btn current-day">' + num + '</button>'))
      createDay();
      $('#itinerary').find('li', 'br').remove();

    });


    //Click on a button --> it becomes current day, other selected days become unselected
$('.day-buttons').on('click', function(e) {
  if($(e.target).attr("id") === undefined) {
    $('.day-btn').removeClass('current-day');
    $(e.target).addClass('current-day');
}
  var numDay = whichDay();
  displayDay(numDay);
  });

    // Models to store information from days

    var Day = function(){

      this.hotel = null;
      this.restaurants = [];
      this.activities = [];
    };

    var days = [new Day];

    function createDay(){
      days.push(new Day);
    }


    function whichDay(){
      // returns the number of the day that is selected
      return $('.day-buttons').find('.current-day').text();
    }

    function displayDay(numDay) {
      $('#itinerary').find('li').remove();
      $('#itinerary').find('br').remove();

      if(days[numDay-1].hotel) {
      $('.hotel-list').append($('<li>' + days[numDay - 1].hotel + '</li><br>'));
}
      var restaurants = days[numDay - 1].restaurants;
      restaurants.forEach(function(restaurant) {
        $('.restaurant-list').append($('<li>' + restaurant + '</li><br>'));
      })

      var activities = days[numDay - 1]. activities;
      activities.forEach(function(activity) {
        $('.activities-list').append($('<li>' + activity + '</li><br>'));
      })

    }

});
