'use strict';

const minimatch = require('minimatch');
const path = require('path');

class BowerFileFilter {
  constructor (bowerJson, bowerrc) {
    this._bowerJson = bowerJson;
    this._bowerrc = bowerrc;
    this._vendorDirQuery = this._getVendorDirQuery();
  }
  static make (bowerJson, bowerrc) {
    return new BowerFileFilter(bowerJson, bowerrc);
  }
  filter (filePaths) {
    let filter = this.createFilter();
    return (filePaths || []).filter(filter);
  }
  createFilter () {
    return this._isNotVendorFile.bind(this);
  }
  _getVendorDirQuery () {
    let vendorDir = this._getVendorDir();
    return path.join(path.relative('.', vendorDir), '**');
  }
  _getVendorDir () {
    if (!this._bowerrc || !this.bowerrc.directory) return 'bower_components';
    return this._bowerrc.directory;
  }
  _isVendorFile (filePath) {
    return minimatch(filePath, this._vendorDirQuery);
  }
  _isNotVendorFile (filePath) {
    return !this._isVendorFile(filePath);
  }
}

module.exports = BowerFileFilter;
