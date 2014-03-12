//Initialization
var centerLng = -95.3994;
var centerLat = 29.71985;
//unit in meters
var centerRadius = 200;
var longitude;
var latitude;
var accuracy;
var timestamp;

// calculate distance between two locations, distance unit in meters
function distance(lat1, lon1, lat2, lon2) {

	var radlat1 = Math.PI * lat1 / 180;
	var radlat2 = Math.PI * lat2 / 180;
	var radlon1 = Math.PI * lon1 / 180;
	var radlon2 = Math.PI * lon2 / 180;
	var theta = lon1 - lon2;
	var radtheta = Math.PI * theta / 180;
	var dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
	dist = Math.acos(dist);
	dist = dist * 180 / Math.PI;
	dist = dist * 60 * 1.1515;
	dist = dist * 1.609344 * 1000;
	return dist;
};

//if (!Titanium.Geolocation.isLocationProviderEnabled(Titanium.Geolocation.PROVIDER_NETWORK))
//{
// do stuff
//    alert('geolocation service not enabled');
//}
//else
//{

var networkProvider = Ti.Geolocation.Android.createLocationProvider({
	name : Ti.Geolocation.PROVIDER_GPS,
	// unit - seconds
	minUpdateTime : 30,
	// unit - meters
	minUpdateDistance : 0
});

var networkRule = Ti.Geolocation.Android.createLocationRule({
	provider : Ti.Geolocation.PROVIDER_PROVIDER_GPS,
	// Updates should be accurate to 100m
	accuracy : 0,
	// Updates should be no older than 5m
	// maxAge: 300000,
	// But  no more frequent than once per 10 seconds
	// minAge: 10000,
});

//
// if(!Ti.Geolocation.Android.getManualMode)
// {
// Ti.Geolocation.Android.manualMode = true;
// }

//remove previous rules;
//Ti.Geolocation.Android.removeLocationProvider(networkProvider);
//Ti.Geolocation.Android.removeLocationRule(networkRule);

//add current rules;
Ti.Geolocation.Android.addLocationProvider(networkProvider);
Ti.Geolocation.Android.addLocationRule(networkRule);
if (Ti.Filesystem.isExternalStoragePresent())
	var txt = Ti.Filesystem.getFile(Ti.Filesystem.externalStorageDirectory, 'logfile.txt');
else
	alert("External storage is not present in the tablet. Please insert a micro sd card.");

Titanium.Geolocation.getCurrentPosition(function(e) {
	if (e.success) {
		// do stuff
		var longitude = e.coords.longitude;
		var latitude = e.coords.latitude;
		var accuracy = e.coords.accuracy;
		var timestamp = e.coords.timestamp;
		var altitudeAccuracy = e.coords.altitudeAccuracy;
		// send out location to the server
		// alert('From getcurrentposition function, your location is longitude:' + longitude + 'and latitude:' + latitude + ',haha');
		var myDist = distance(latitude, longitude, centerLat, centerLng);

		Ti.API.info(myDist + '  ' + latitude + '  ' + longitude + '  ' + centerLat + '  ' + centerLng);

		txt.write('Distance: ' + myDist + 'm, Latitude: ' + latitude + ', Longitude: ' + longitude + ', CenterLat: ' + centerLat + ', CenterLng: ' + centerLng + ',\n', true);
	} else if (e.error) {
		alert('fail to get current position');
	}

});

//
// Titanium.Geolocation._hasLocationEvent = false;
//
// Titanium.Geolocation._hasLocationEvent = true;
// Titanium.Geolocation.addEventListener('location',locationHandler);
//
// setTimeout(function(){Titanium.Geolocation.removeEventListener('location',locationHandler);},100000);

