const configDev = require('./config.dev');
const configProd = require('./config.prod');
const configBase = require('./config.base');
const merge = require('webpack-merge');
module.exports = merge(configBase, process.env.NODE_ENV === 'production' ? configProd : configDev);
