$(document).ready(function() {
    var checkedAmenities = {};
    var checkedStates = {};

    $('.amenities .popover input[type="checkbox"]').change(function() {
        var amenityId = $(this).data('id');
        var amenityName = $(this).data('name');

        if ($(this).prop('checked')) {
            checkedAmenities[amenityId] = amenityName;
        } else {
            delete checkedAmenities[amenityId];
        }

        updateCheckedContent('.amenities h4', checkedAmenities);
    });

    $('.locations .popover input[type="checkbox"]').change(function() {
        var stateId = $(this).data('id');
        var stateName = $(this).data('name');

        if ($(this).prop('checked')) {
            checkedStates[stateId] = stateName;
        } else {
            delete checkedStates[stateId];
        }

        updateCheckedContent('.locations h4', checkedStates);
    });




    function updateCheckedContent(loc, checked) {
        var $h4 = $(loc);
        var content = '';

        for (var id in checked) {
            if (checked.hasOwnProperty(id)) {
                content += checked[id] + ', ';
            }
        }
        content = content.slice(0, -2);

        $h4.text(content);
    }



      $.get('http://172.24.230.196:5000/api/v1/status', function (data, textStatus) {
    if (textStatus === 'success') {
        if (data.status === 'OK') {
        $('#api_status').css('background-color', '#ff545f');
        } else {
        $('#api_status').css('background-color', 'green');
      }
    }
  });
});k
