   $(document).ready(function() {
        var checkedAmenities = {};

        $('.popover input[type="checkbox"]').change(function() {
            var amenityId = $(this).data('id');
            var amenityName = $(this).data('name');

            if ($(this).prop('checked')) {
                checkedAmenities[amenityId] = amenityName;
            } else {
                delete checkedAmenities[amenityId];
            }
            updateCheckedAmenitiesDiv();
        });

        function updateCheckedAmenitiesDiv() {
            var $h4 = $('.amenities h4');
            var content = '';

            for (var amenityId in checkedAmenities) {
                if (checkedAmenities.hasOwnProperty(amenityId)) {
                    content += checkedAmenities[amenityId] + ', ';
                }
            }
	    content = content.slice(0, -2);

            $h4.text(content);
        }
    });
