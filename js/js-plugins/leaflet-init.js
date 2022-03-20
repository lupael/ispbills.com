/* -----------------------
* Create the map
* https://leafletjs.com/
* --------------------- */

CRUMINA.maps = {
	maps: {
		mapUSA: {
			config: {
				id: 'map',
				map: {
					center: new L.LatLng(22.57783, 88.43814),
					zoom: 13,
					maxZoom: 18,
					layers: new L.tileLayer('https://{s}.tile.openstreetmap.de/tiles/osmde/{z}/{x}/{y}.png', {
						maxZoom: 18,
						attribution: '',
					})
				},
				icon: {
					iconSize: [40, 51],
					iconAnchor: [22, 94],
					className: 'icon-map'
				}
			},
			markers: [
				{
					coords: [22.57783, 88.43814],
					icon: 'marker-google.png'
				}
			]
		},
		mapAustralia: {
			config: {
				id: 'map1',
				map: {
					center: new L.LatLng(19.0210456,72.829972),
					zoom: 13,
					maxZoom: 18,
					layers: new L.tileLayer('https://{s}.tile.openstreetmap.de/tiles/osmde/{z}/{x}/{y}.png', {
						maxZoom: 18,
						attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
					})
				},
				icon: {
					iconSize: [40, 51],
					iconAnchor: [22, 94],
					className: 'icon-map'
				},
				cluster: {
					iconSize: [40, 40]
				}
			},

			markers: [
				{
					coords: [19.0210456,72.829972],
					icon: 'marker-google.png'
				}
			]

		},
		mapGermany: {
			config: {
				id: 'map2',
				map: {
					center: new L.LatLng(28.5532737,77.2383123),
					zoom: 12,
					maxZoom: 18,
					layers: new L.tileLayer('https://{s}.tile.openstreetmap.de/tiles/osmde/{z}/{x}/{y}.png', {
						maxZoom: 18,
						attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
					})
				},
				icon: {
					iconSize: [40, 51],
					iconAnchor: [22, 94],
					className: 'icon-map'
				},
				cluster: {
					iconSize: [40, 40]
				}
			},
			markers: [
				{
					coords: [28.5532737,77.2383123],
					icon: 'marker-google.png'
				}
			]

		},
		mapSwitzerland: {
			config : {
				id     : 'map3',
				map    : {
					center : new L.LatLng(25.6068005,85.1380012),
					zoom   : 12,
					maxZoom: 18,
					layers : new L.tileLayer('https://{s}.tile.openstreetmap.de/tiles/osmde/{z}/{x}/{y}.png', {
						maxZoom    : 18,
						attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
					})
				},
				icon   : {
					iconSize  : [40, 51],
					iconAnchor: [22, 94],
					className : 'icon-map'
				},
				cluster: {
					iconSize: [40, 40]
				}
			},
			markers: [
				{
					coords: [25.6068005,85.1380012],
					icon  : 'marker-google.png'
				}
			]

		},
		mapUkraine: {
			config : {
				id     : 'map4',
				map    : {
					center : new L.LatLng(23.8288742,91.2804738),
					zoom   : 12,
					maxZoom: 18,
					layers : new L.tileLayer('https://{s}.tile.openstreetmap.de/tiles/osmde/{z}/{x}/{y}.png', {
						maxZoom    : 18,
						attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
					})
				},
				icon: {
					iconSize  : [40, 51],
					iconAnchor: [22, 94],
					className : 'icon-map'
				},
				cluster: {
					iconSize: [40, 40]
				}
			},
			markers: [
				{
					coords: [23.8288742,91.2804738],
					icon  : 'marker-google.png'
				}
			]

		},
	},
	init: function () {
		var _this = this;

		for (var key in this.maps) {
			var data = this.maps[key];

			if (!data.config || !data.markers) {
				continue;
			}

			if (!document.getElementById(data.config.id)) {
				continue;
			}

			var map = new L.map(data.config.id, data.config.map);
			var cluster = L.markerClusterGroup({
				iconCreateFunction: function (cluster) {
					var childCount = cluster.getChildCount();
					var config = data.config.cluster;
					return new L.DivIcon({
						html: '<div><span>' + childCount + '</span></div>',
						className: 'marker-cluster marker-cluster-' + key,
						iconSize: new L.Point(config.iconSize[0], config.iconSize[1])
					});
				}
			});
			data.markers.forEach(function (item) {
				data.config.icon['iconUrl'] = './img/demo-content/icons/' + item.icon;
				var icon = L.icon(data.config.icon);

				var marker = L.marker(item.coords, {icon: icon});
				cluster.addLayer(marker);
			});

			map.addLayer(cluster);
			this.disableScroll(jQuery("#" + data.config.id), map);
		}
	},
	disableScroll: function ($map, map) {
		map.scrollWheelZoom.disable();

		$map.bind('mousewheel DOMMouseScroll', function (event) {
			event.stopPropagation();
			if (event.ctrlKey == true) {
				event.preventDefault();
				map.scrollWheelZoom.enable();
				setTimeout(function () {
					map.scrollWheelZoom.disable();
				}, 1000);
			} else {
				map.scrollWheelZoom.disable();
			}
		});
	}
};

$(document).ready(function () {
	CRUMINA.maps.init();
});