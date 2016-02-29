/* globals describe it before */

'use strict';

const expect = require('chai').expect;
const BowerPlugin = require('../lib/codentity-plugin-bower');
// fixtures
const filePaths = require('./fixtures/file_paths');
const bowerJson = require('./fixtures/bower_json');
const findResults = require('./fixtures/find_results');

describe('BowerPlugin', function () {
  describe('.make', function () {
    it('returns the same as new', function () {
      const config = {
        bowerJson: { a: true },
        bowerrc: { b: true }
      };
      let plugin = new BowerPlugin(config);
      expect(plugin).to.deep.equal(BowerPlugin.make(config));
    });
  });
  describe('#filter', function () {
    describe('when there is no bower.json', function () {
      it('does not remove any files', function () {
        let output = BowerPlugin.make().filter(filePaths.all);
        expect(output).to.deep.equal(filePaths.withoutBowerComponents);
      });
    });
    describe('when there is a bower.json', function () {
      it('removes the expected files', function () {
        let output = BowerPlugin.make({
          bowerJson: '{}'
        }).filter(filePaths.all);
        expect(output).to.deep.equal(filePaths.withoutBowerComponents);
      });
    });
    describe('when there is a .bowerrc', function () {
      describe('with a directory property', function () {
        it('removes the expected files', function () {
          let output = BowerPlugin.make({
            bowerrc: { directory: './vendor/src' }
          }).filter(filePaths.all);
          expect(output).to.deep.equal(filePaths.withBowerrcDirectory);
        });
      });
      describe('without a directory property', function () {
        it('removes the expected files', function () {
          let output = BowerPlugin.make({
            bowerrc: '{}'
          }).filter(filePaths.all);
          expect(output).to.deep.equal(filePaths.withoutBowerComponents);
        });
      });
    });
  });
  describe('#find', function () {
    describe('when there is no bower.json', function () {
      it('always returns an empty array', function () {
        let output = BowerPlugin.make().find('*');
        expect(output).to.deep.equal([]);
      });
    });
    describe('when there is a bower.json', function () {
      before(function () {
        this.analyzer = BowerPlugin.make({
          bowerJson: bowerJson
        });
      });
      describe('and the package exists', function () {
        it('returns the expected result', function () {
          let output = this.analyzer.find('ang*');
          expect(output).to.deep.equal(findResults);
        });
      });
      describe('and the package cannot be found', function () {
        it('returns an empty array', function () {
          let output = this.analyzer.find('bootstrap');
          expect(output).to.deep.equal([]);
        });
      });
    });
  });
});
