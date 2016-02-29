'use strict';

const CodentityPlugin = require('codentity-plugin');
const BowerPackageFinder = require('./package-finder');
const BowerFileFilter = require('./file-filter');

class BowerPlugin extends CodentityPlugin {
  constructor (config) {
    super('bower');
    this._bowerJson = config.bowerJson;
    this._bowerrc = config.bowerrc;
  }
  static make (config) {
    return new BowerPlugin(config);
  }
  filter (filePaths) {
    const filter = BowerFileFilter.make(this._bowerJson, this._bowerrc);
    return filter.filter(filePaths);
  }
  find (query) {
    return BowerPackageFinder.make(this._bowerJson).find(query);
  }
}

BowerPlugin.requirements = {
  bowerJson: 'bower.json',
  bowerrc: '.bowerrc'
};

module.exports = BowerPlugin;
