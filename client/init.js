Meteor.startup(function() {
  GoogleMaps.load({
    libraries: 'places'  // also accepts an array if you need more than one
  });
});