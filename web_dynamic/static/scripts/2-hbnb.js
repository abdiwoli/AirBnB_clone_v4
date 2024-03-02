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

	// Function to update API status
	function updateApiStatus() {
		var apiUrl = 'http://0.0.0.0:5001/api/v1/status/';
		var $apiStatusDiv = $('#api_status');

		// Fetch the API status
		$.ajax({
			type: 'GET',
			url: apiUrl,
			success: function (data) {
				if (data.status === 'OK') {
					$apiStatusDiv.addClass('available');
				} else {
					$apiStatusDiv.removeClass('available');
				}
			},
			error: function (error) {
				console.error('Error fetching API status:', error);
				$apiStatusDiv.removeClass('available');
			}
		});
	}
	// Call the function to update API status on page load
	updateApiStatus();


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
	);
	});
