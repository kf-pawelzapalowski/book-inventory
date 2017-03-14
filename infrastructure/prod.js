var config = {
	name: 'buk-inwentory-prod',
	organization: undefined,
	region: 'eu',
	maintenance: false,
	stack: 'cedar-14',
	config_vars: {
		BOOKS_COLLECTION_NAME: 'buks'
	},
	addons: {},
	collaborators: ['pawel.zapalowski@gmail.com'],
	features: {
		'runtime-dyno-metadata': {
			enabled: false
		},
		'log-runtime-metrics': {
			enabled: false
		},
		'web-auto-scaling': {
			enabled: false
		},
		'http-session-affinity': {
			enabled: false
		},
		preboot: {
			enabled: false
		},
		'spaces-dns-registry': {
			enabled: false
		},
		'http-shard-header': {
			enabled: false
		},
		'http-end-to-end-continue': {
			enabled: false
		},
		'spaces-new-router': {
			enabled: false
		},
		'app-alerting': {
			enabled: false
		}
	},
	formation: [{
		process: 'web',
		quantity: 1,
		size: 'Free'
	}
	],
	log_drains: [],
	buildpacks: ['urn:buildpack:heroku/nodejs']
};

var heroin = require('heroin-js');
var configurator = heroin(process.env.HEROKU_API_TOKEN);
 
configurator(config);