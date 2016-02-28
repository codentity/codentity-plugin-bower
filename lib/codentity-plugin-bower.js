'use strict';

const CodentityPlugin = require('codentity-plugin');
const BowerPackageFinder = require('./package-finder');
const minimatch = require('minimatch');

class BowerPlugin extends CodentityPlugin {
  constructor (config) {
    super('bower');
    this._bowerJson = config.bowerJson;
    this._bowerrc = config.bowerrc;
  }
  static make (config) {
    return new BowerPlugin(config);
  }
  find (query) {
    return BowerPackageFinder.make(this._bowerJson).find(query);
  }
  filter (filePaths) {
    // TODO use bowerrc filter
    return filePaths.filter((filePath) => {
      return !minimatch(filePath, 'bower_components/**');
    });
  }
}

BowerPlugin.requirements = {
  bowerJson: 'bower.json',
  bowerrc: '.bowerrc',
};

module.exports = BowerPlugin;
