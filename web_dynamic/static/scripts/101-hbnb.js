$(document).ready(() => {
  const checkedAmenities = {};
  const amenitiesName = [];
  const checkedStates = {};
  const statesName = [];
  const checkedCities = {};
  const citiesName = [];

  $('input[type="checkbox"]').click(() => {
    // Amenity
    if (!$(this).hasClass('a_checked')) {
      if (!$(this).is(':checked')) {
        delete checkedAmenities[$(this).attr('data-id')];
        amenitiesName.splice(amenitiesName.indexOf($(this).attr('data-name')), 1);
      } else {
        checkedAmenities[$(this).attr('data-id')] = $(this).attr('data-name');
        amenitiesName.push($(this).attr('data-name'));
      }
      $('DIV.amenities h4').text(amenitiesName.join(', '));
    }
    // State
    if (!$(this).hasClass('s_checked')) {
      if (!$(this).is(':checked')) {
        delete checkedStates[$(this).attr('data-id')];
        statesName.splice(statesName.indexOf($(this).attr('data-name')), 1);
      } else {
        checkedStates[$(this).attr('data-id')] = $(this).attr('data-name');
        statesName.push($(this).attr('data-name'));
      }
      $('DIV.locations h4').text(statesName.join(', '));
    }
    // City
    if (!$(this).hasClass('c_checked')) {
      if (!$(this).is(':checked')) {
        delete checkedCities[$(this).attr('data-id')];
        citiesName.splice(citiesName.indexOf($(this).attr('data-name')), 1);
      } else {
        checkedCities[$(this).attr('data-id')] = $(this).attr('data-name');
        citiesName.push($(this).attr('data-name'));
      }
      $('DIV.locations h4').text(citiesName.join(', '));
    }
  });
  // Status of API
  const url = 'http://0.0.0.0:5001/api/v1/status/';
  $.get(url, (data) => {
    if (data.status === 'OK') {
      $('div#api_status').addClass('available');
    } else {
      $('div#api_status').removeClass('available');
    }
  });
  $.ajax({
    type: 'POST',
    url: 'http://0.0.0.0:5001/api/v1/places_search/',
    data: '{}',
    dataType: 'json',
    contentType: 'application/json',
    success: deliverPlaces(data)
  });

  let allData = {};
  $('button').click(() => {
    allData = {
      amenities: Object.keys(checkedAmenities),
      states: Object.keys(checkedStates),
      cities: Object.keys(checkedCities)
    };
    $.ajax({
      type: 'POST',
      url: 'http://0.0.0.0:5001/api/v1/places_search/',
      data: JSON.stringify(allData),
      dataType: 'json',
      contentType: 'application/json',
      success: (data) => {
        $('section.places').empty();
        deliverPlaces(data);
      }
    });
  });
});

const deliverPlaces = () => {
  return data => {
    for (let i = 0; i < data.length; i++) {
      const name = '<h2>' + data[i].name + '</h2>';
      const price_by_night = '<div class="price_by_night">' + data[i].price_by_night + '</div>';
      const title_box = '<div class="title_box">' + name + price_by_night + '</div>';
      let guest = 'Guests';
      let bedroom = 'Bedrooms';
      let bathroom = 'Bathrooms';
      if (data[i].max_guest === 1) {
        guest = 'Guest';
        const max_guest = '<div class="max_guest">' + data[i].max_guest + ' ' + guest + '</div>';
      }
      if (data[i].number_rooms === 1) {
        bedroom = 'Bedroom';
        const number_rooms = '<div class="number_rooms">' + data[i].number_rooms + ' ' + bedroom + '</div>';
      }
      if (data[i].number_bathrooms === 1) {
        bathroom = 'Bathroom';
        const number_bathrooms = '<div class="number_bathrooms">' + data[i].number_bathrooms + ' ' + bathroom + '</div>';
      }
      const information = '<div class="information">' + max_guest + number_rooms + number_bathrooms + '</div>';
      if (data[i].description === '') {
        data[i].description = 'None';
      }
      const description = '<div class="description">' + data[i].description + '</div>';
      const article = '<article>' + title_box + information + description + '</article>';
      $('section.places').html(article);
    }
  };
};
