const gulp          = require('gulp');
const babel         = require('rollup-plugin-babel');
const rollup        = require('rollup');
const commonjs      = require('rollup-plugin-commonjs');
const nodeResolve   = require('rollup-plugin-node-resolve');

// Concatenate & Minify src and dependencies
gulp.task('build', function() {

	return rollup.rollup({
			input: './src/converter.js',
			output: {
				format: 'umd',
				name: 'converter'
			},
			plugins: [
				babel({
					exclude: 'node_modules/**' // only transpile our source code
				}),
				nodeResolve({
					// pass custom options to the resolve plugin
					customResolveOptions: {
						moduleDirectory: 'node_modules'
					},
					jsnext: true,
					module: true,
					main: true,  // for commonjs modules that have an index.js
					browser: true
				}),
				commonjs({
					include:
						'node_modules/**'
				})
			]
		})

		// and output to ./dist/app.js as normal.
		.then(bundle => {
			return bundle.write({
				file: './dist/converter.js',
				format: 'umd',
				name: 'converter',
				sourcemap: true
			});
		});

});

// Watch Files For Changes
gulp.task('watch', function() {
	return gulp.watch('src/*.js', gulp.series('build'));
});

// Default Task
gulp.task('default', gulp.series('build', 'watch'));