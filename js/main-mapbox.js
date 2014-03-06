var map = L.mapbox.map('map', 'examples.map-9ijuk24y')
    .setView([47.3, 2.5], 3);
map.zoomControl.setPosition('bottomright');

map.featureLayer.setGeoJSON([
    {
        type: 'Feature',
        geometry: {
            type: 'Point',
            coordinates: [-77, 37.9]
        },
        properties: {
            title: 'La Paillasse',
            description: '206 rue Machin',
            'marker-id': 'marker-1',
            'marker-color': '#f86767'
        }
    },
    {
        type: 'Feature',
        geometry: {
            type: 'Point',
            coordinates: [-78, 36.5]
        },
        properties: {
            title: 'ElectroLab',
            description: '68 rue Truc',
            'marker-id': 'marker-2',
            'marker-color': '#f86767'
        }
    }
]);

var info = document.getElementById('info');

// Iterate through each feature layer item, build a
// marker menu item and enable a click event that pans to + opens
// a marker that's associated to the marker item.
map.featureLayer.eachLayer(function(marker) {
  var link = info.appendChild(document.createElement('a'));
  link.className = 'item list-group-item';
  link.href = '#';

  // Populate content from each markers object.
  link.innerHTML = '<img class="logo-communaute" src="" alt=""><div><h4 class="list-group-item-heading">' + marker.feature.properties.title +
    '</h4><p class="list-group-item-text">' + marker.feature.properties.description + '</p></div>';
  link.onclick = function() {
    if (/active/.test(this.className)) {
      this.className = this.className.replace(/active/, '').replace(/\s\s*$/, '');
    } else {
      var siblings = info.getElementsByTagName('a');
      for (var i = 0; i < siblings.length; i++) {
        siblings[i].className = siblings[i].className
          .replace(/active/, '').replace(/\s\s*$/, '');
      };
      this.className += ' active';

      // When a menu item is clicked, animate the map to center
      // its associated marker and open its popup.
      map.panTo(marker.getLatLng());
      marker.openPopup();
    }
    return false;
  };
});

// Define the geocoding place
map.addControl(L.mapbox.geocoderControl('examples.map-vyofok3q', {
        keepOpen: false,
        position: 'topright'
}));

// Add locate button
L.control.locate().addTo(map).setPosition('topright');