'use strict';

const JsonPackageFinder = require('json-package-finder');

class BowerPackageFinder extends JsonPackageFinder {
  constructor (bowerJson) {
    super({
      json: bowerJson,
      dependencyPaths: ['dependencies', 'devDependencies']
    });
  }
  static make (bowerJson) {
    return new BowerPackageFinder(bowerJson);
  }
  find (query) {
    return super.find(query).map(this._transform.bind(this));
  }
  _transform (result) {
    return {
      plugin: 'bower',
      src: 'bowerJson',
      packageName: result.key,
      version: result.value,
      dependencyGroup: result.path
    };
  }
}

module.exports = BowerPackageFinder;
