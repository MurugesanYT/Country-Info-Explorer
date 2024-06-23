$(document).ready(function() {
  $('#search-btn').click(function() {
    var countryName = $('#search-input').val().trim();
    if (countryName !== '') {
      searchCountry(countryName);
    } else {
      $('#result-container').html('<p>Please enter a country name.</p>');
    }
  });

  function searchCountry(countryName) {
    $.ajax({
      method: 'GET',
      url: 'https://api.api-ninjas.com/v1/country?name=' + countryName,
      headers: { 'X-Api-Key': 'gej/LZaIpdCdX1iDG4QG+w==5Ndlcn9fAJpKOTmN' }, // Replace with your API key
      contentType: 'application/json',
      success: function(response) {
        displayCountryInfo(response[0]);
      },
      error: function(jqXHR, textStatus, errorThrown) {
        console.error('Error fetching data:', textStatus, errorThrown);
        $('#result-container').html('<p>Error fetching data. Please try again later.</p>');
      }
    });
  }

  function displayCountryInfo(countryInfo) {
    var html = '<h2>' + countryInfo.name + '</h2>';
    html += '<ul>';
    for (var key in countryInfo) {
      if (countryInfo.hasOwnProperty(key)) {
        if (key === 'currency') {
          html += '<li><strong>' + key.replace(/_/g, ' ').toUpperCase() + ':</strong> ' + countryInfo[key].name + '</li>';
        } else {
          html += '<li><strong>' + key.replace(/_/g, ' ').toUpperCase() + ':</strong> ' + countryInfo[key] + '</li>';
        }
      }
    }
    html += '</ul>';
    $('#result-container').html(html);
  }
});
