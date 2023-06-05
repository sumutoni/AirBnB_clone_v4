$(document).ready(() => {
  const checkedAmenities = {};
  const amenities = [];
  $('input[type="checkbox"]').click(() => {
    if (!$(this).is(':checked')) {
      delete checkedAmenities[$(this).attr('data-id')];
      amenities.splice(amenities.indexOf($(this).attr('data-name')), 1);
    } else {
      checkedAmenities[$(this).attr('data-id')] = $(this).attr('data-name');
      amenities.push($(this).attr('data-name'));
    }
    $('DIV.amenities h4').text(amenities.join(', '));
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
});
