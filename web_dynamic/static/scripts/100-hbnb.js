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


    $('button').click(function() {
        $.ajax({
            type: 'POST',
            url: '/api/v1/places_search',
            contentType: 'application/json',
            data: JSON.stringify({
                amenities: Object.values(checkedAmenities),
                states: Object.values(checkedStates)
            }),
            success: function(response) {
                updatePlacesHTML(response.places);
            },
            error: function(error) {
                console.error(error);
            }
        });
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

    function updatePlacesHTML(places) {
        var $placesContainer = $('.places');
        $placesContainer.empty();

        places.forEach(function(place) {
            var placeHTML = '<article>' +
                                '<div class="title_box">' +
                                    '<h2>' + place.name + '</h2>' +
                                    '<div class="price_by_night">$' + place.price_by_night + '</div>' +
                                '</div>' +
                                '<div class="information">' +
                                    '<div class="max_guest">' + place.max_guest + ' Guest' + (place.max_guest !== 1 ? 's' : '') + '</div>' +
                                    '<div class="number_rooms">' + place.number_rooms + ' Bedroom' + (place.number_rooms !== 1 ? 's' : '') + '</div>' +
                                    '<div class="number_bathrooms">' + place.number_bathrooms + ' Bathroom' + (place.number_bathrooms !== 1 ? 's' : '') + '</div>' +
                                '</div>' +
                                '<div class="user">' +
                                    '<b>Owner:</b> ' + place.user.first_name + ' ' + place.user.last_name +
                                '</div>' +
                                '<div class="description">' +
                                    place.description +
                                '</div>' +
                            '</article>';

            $placesContainer.append(placeHTML);
        });
    }
});
