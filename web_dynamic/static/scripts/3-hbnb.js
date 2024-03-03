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

	// Function to update places based on search
	function updatePlacesSearch() {
		var placesSearchUrl = 'http://0.0.0.0:5001/api/v1/places_search/';

		// Send a POST request to places_search
		$.ajax({
			type: 'POST',
			url: placesSearchUrl,
			contentType: 'application/json',
			data: JSON.stringify({}),
			success: function(response) {
				// Clear existing places
				$('.places').empty();

				// Loop through the result and create article tags
				for (var i = 0; i < response.length; i++) {
					var place = response[i];
					var articleHTML = '<article><div class="title_box"><h2>' +
						place.name + '</h2><div class="price_by_night">$' +
						place.price_by_night + '</div></div><div class="information">' +
						'<div class="max_guest">' + place.max_guest + ' Guest' +
						(place.max_guest !== 1 ? 's' : '') + '</div><div class="number_rooms">' +
						place.number_rooms + ' Bedroom' + (place.number_rooms !== 1 ? 's' : '') +
						'</div><div class="number_bathrooms">' + place.number_bathrooms +
						' Bathroom' + (place.number_bathrooms !== 1 ? 's' : '') + '</div></div>' +
						'<div class="description">' + place.description + '</div></article>';
					$('.places').append(articleHTML);
				}
			},
			error: function(error) {
				console.error('Error fetching places:', error);
			}
		});
	}

	// Call the function to update API status and places on page load
	updatePlacesSearch();
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
