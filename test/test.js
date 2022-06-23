'use strict';
const expect = require('chai').expect;
const index = require('../dist/index.js');
describe('getPlural function test', () => {
    it('should return Boys', () => {
        let result = index.getPlural('Boy');
        expect(result).to.equal('Boys');
    });
    it('should return Girls', () => {
        let result = index.getPlural('Girl');
        expect(result).to.equal('Girls');
    });
    it('should return Geese', () => {
        let result = index.getPlural('Goose');
        expect(result).to.equal('Geese');
    });
    it('should return Toys', () => {
        let result = index.getPlural('Toy');
        expect(result).to.equal('Toys');
    });
    it('should return Men', () => {
        let result = index.getPlural('Man');
        expect(result).to.equal('Men');
    });
});