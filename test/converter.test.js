const assert = require('assert');
const CoordinateConverter = require('../dist/converter');

describe('CoordinateConverter', function () {

	describe('#xyToLatLon()', function () {

		it('should match expected value for positive XY offset', () => {

			const originLat = -41.45223111;
			const originLon = 147.14035111;
			const x = 10;
			const y = 10;
			const expectedLat = -41.45214107;
			const expectedLon = 147.14047078;
			const value = CoordinateConverter.xyToLatLon(x, y, originLat, originLon);

			assert.equal(value.lon, expectedLon, `Longitude matches expected value (${expectedLon})`);
			assert.equal(value.lat, expectedLat, `Latitude matches expected value (${expectedLat})`);
		});

		it('should match expected value for negative XY offset', () => {

			const originLat = -41.45223111;
			const originLon = 147.14035111;
			const x = -10.34;
			const y = -7.43;
			const expectedLat = -41.45229801;
			const expectedLon = 147.14022737;
			const value = CoordinateConverter.xyToLatLon(x, y, originLat, originLon);

			assert.equal(value.lon, expectedLon, `Longitude matches expected value (${expectedLon})`);
			assert.equal(value.lat, expectedLat, `Latitude matches expected value (${expectedLat})`);
		});
	});
});
