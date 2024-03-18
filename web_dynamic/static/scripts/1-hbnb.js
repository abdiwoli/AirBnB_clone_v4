$(document).ready(function () {
    let checkedAmenities = {};
  $(document).on('change', "input[type='checkbox']", function () {
    if (this.checked) {
        checkedAmenities[$(this).data('id')] = $(this).data('name');
    } else {
      delete checkedAmenities[$(this).data('id')];
    }
    let lst = Object.values(checkedAmenities);
    if (lst.length > 0) {
      $('div.amenities > h4').text(Object.values(checkedAmenities).join(', '));
    } else {
      $('div.amenities > h4').html('&nbsp;');
    }
  });
  $.get('http://172.24.230.196:5000/api/v1/status', function (data, textStatus) {
    if (textStatus === 'success') {
        if (data.status === 'OK') {
        $('#api_status').css('background-color', '#ff545f');
        } else {
        $('#api_status').css('background-color', 'green');
      }
    }
  });
});
