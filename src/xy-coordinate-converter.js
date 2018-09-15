
const _RADIANS = 57.2957795;

export default class CoordinateConverter {

	/**
	 * Get the latlon position of an XY position relative to origin.
	 * @param x {Number} x offset in meters
	 * @param y {Number} y offset in meters
	 * @param originLat {Number} latitude of origin in decimal degrees
	 * @param originLon {Number} longitude of origin in decimal degrees
	 * @returns {{lat: *, lon: *}}
	 */
	static xyToLatLon (x, y, originLat, originLon) {

		let xx, yy, r, ct, st, angle;
		angle = this.DEG_TO_RADIANS(0);

		// X,Y to Lat/Lon Coordinate Translation
		r = Math.sqrt(x * x + y * y);

		if (r) {
			ct = x / r;
			st = y / r;
			xx = r * ( (ct * Math.cos(angle)) + (st * Math.sin(angle)) );
			yy = r * ( (st * Math.cos(angle)) - (ct * Math.sin(angle)) );
		}

		let plon = originLon + xx / this.METERS_DEGLON(originLat);
		let plat = originLat + yy / this.METERS_DEGLAT(originLat);

		return {
			lat: +plat.toFixed(8),
			lon: +plon.toFixed(8)
		};
	}

	static DEG_TO_RADIANS (x) {
		return (x / _RADIANS);
	}

	static METERS_DEGLON (x) {
		const d2r = this.DEG_TO_RADIANS(x);
		return ((111415.13 * Math.cos(d2r)) - (94.55 * Math.cos(3.0 * d2r)) + (0.12 * Math.cos(5.0 * d2r)));
	}

	static METERS_DEGLAT (x) {
		const d2r = this.DEG_TO_RADIANS(x);
		return (111132.09 - (566.05 * Math.cos(2.0 * d2r)) + (1.20 * Math.cos(4.0 * d2r)) - (0.002 * Math.cos(6.0 * d2r)));
	}

}