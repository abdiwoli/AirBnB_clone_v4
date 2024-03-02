$(document).ready(function() {
        var checkedAmenities = {};
        function updateCheckedAmenities() {
            var $checkedAmenitiesList = $('.popover h4');
            var checkedAmenitiesText = "Amenities: ";

            for (var amenityId in checkedAmenities) {
                if (checkedAmenities.hasOwnProperty(amenityId) && checkedAmenities[amenityId]) {
                    checkedAmenitiesText += checkedAmenities[amenityId].name + ", ";
                }
            }

            $checkedAmenitiesList.text(checkedAmenitiesText.replace(/,\s*$/, ''));
        }

        $('.popover input[type="checkbox"]').on('change', function() {
            var amenityId = $(this).data('id');
            var amenityName = $(this).data('name');

            if ($(this).prop('checked')) {
                checkedAmenities[amenityId] = {
                    id: amenityId,
                    name: amenityName
                };
            } else {
                delete checkedAmenities[amenityId];
            }

            updateCheckedAmenities();
        });
    });
