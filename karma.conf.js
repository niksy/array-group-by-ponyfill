'use strict';

const path = require('path');
const fs = require('fs');
const { default: resolve } = require('@rollup/plugin-node-resolve');
const commonjs = require('@rollup/plugin-commonjs');
const nodeBuiltins = require('rollup-plugin-node-builtins');
const globals = require('rollup-plugin-node-globals');
const { default: babel } = require('@rollup/plugin-babel');
const istanbul = require('rollup-plugin-istanbul');
const rollupConfig = require('./rollup.config');

let config;

const isCI =
	typeof process.env.CI !== 'undefined' && process.env.CI !== 'false';
const isPR =
	typeof process.env.GITHUB_HEAD_REF !== 'undefined' &&
	process.env.GITHUB_HEAD_REF !== '';
const local = !isCI || (isCI && isPR);

const port = 0;

if (local) {
	config = {
		browsers: ['Chrome']
	};
} else {
	config = {
		hostname: 'bs-local.com',
		browserStack: {
			username: process.env.BROWSER_STACK_USERNAME,
			accessKey: process.env.BROWSER_STACK_ACCESS_KEY,
			startTunnel: true,
			project: 'array-group-by-ponyfill',
			name: 'Automated (Karma)',
			build: 'Automated (Karma)'
		},
		customLaunchers: {
			'BS-Chrome': {
				'base': 'BrowserStack',
				'project': 'array-group-by-ponyfill',
				'build': 'Automated (Karma)',
				'browser': 'Chrome',
				'browser_version': '72',
				'name': 'Chrome',
				'os': 'Windows',
				'os_version': '7'
			},
			'BS-Edge': {
				'base': 'BrowserStack',
				'project': 'array-group-by-ponyfill',
				'build': 'Automated (Karma)',
				'browser': 'Edge',
				'browser_version': '15',
				'name': 'Edge',
				'os': 'Windows',
				'os_version': '10'
			},
			'BS-Firefox': {
				'base': 'BrowserStack',
				'project': 'array-group-by-ponyfill',
				'build': 'Automated (Karma)',
				'browser': 'Firefox',
				'browser_version': '65',
				'name': 'Firefox',
				'os': 'Windows',
				'os_version': '7'
			}
		},
		browsers: ['BS-Chrome', 'BS-Edge', 'BS-Firefox']
	};
}

module.exports = function (baseConfig) {
	baseConfig.set({
		basePath: '',
		frameworks: ['mocha'],
		files: [{ pattern: 'test/**/*.js', watched: false }],
		exclude: [],
		preprocessors: {
			'test/**/*.js': ['rollup', 'sourcemap']
		},
		reporters: ['mocha', 'coverage'],
		port: port,
		colors: true,
		logLevel: baseConfig.LOG_INFO,
		autoWatch: false,
		client: {
			captureConsole: true
		},
		browserConsoleLogOptions: {
			level: 'log',
			format: '%b %T: %m',
			terminal: true
		},
		rollupPreprocessor: {
			plugins: [
				istanbul({
					exclude: ['test/**/*.js', 'node_modules/**/*']
				}),
				nodeBuiltins(),
				babel({
					exclude: 'node_modules/**',
					babelHelpers: 'runtime'
				}),
				resolve({
					preferBuiltins: true
				}),
				commonjs(),
				babel({
					include: 'node_modules/{has-flag,supports-color}/**',
					babelHelpers: 'runtime',
					babelrc: false,
					configFile: path.resolve(__dirname, '.babelrc')
				}),
				globals(),
				...rollupConfig.plugins.filter(
					({ name }) =>
						!['babel', 'package-type', 'types'].includes(name)
				)
			],
			output: {
				format: 'iife',
				name: 'arrayGroupByPonyfill',
				sourcemap: baseConfig.autoWatch ? false : 'inline', // Source map support has weird behavior in watch mode
				intro: 'window.TYPED_ARRAY_SUPPORT = false;' // IE9
			}
		},
		coverageReporter: {
			dir: path.join(__dirname, 'coverage'),
			reporters: [{ type: 'html' }, { type: 'text' }],
			check: {
				global: JSON.parse(
					fs.readFileSync(path.join(__dirname, '.nycrc'), 'utf8')
				)
			}
		},
		singleRun: true,
		concurrency: Infinity,
		...config
	});
};
