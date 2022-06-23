'use strict';
const assert = require('assert')
const createMultilang = require("../lib/index.cjs").MultiLang;
const en = require("./lang/en.json");
const ro = require("./lang/ro.json");
describe('basic', () => {
    let multilang
    beforeEach(() => {
        multilang = new createMultilang({
            locale: 'en',
            fallbackLocale: 'ro',
            messages:{
                "en":en,
                "ro":ro
            },
        })
    })

    describe('multilanguage#translate', () => {
        describe('en locale', () => {
            it('should translate an english', () => {
                assert.deepEqual(multilang.translate('message.hello'),en.message.hello);
            })
        })
        describe('empty string', () => {
            it('should support empty string', () => {
                assert.deepEqual(multilang.translate('message.empty'),en.message.empty);
            })
        })
        describe('don`t exist string', () => {
            it('should support strings that do not exist', () => {
                assert.deepEqual(multilang.translate('message.dontexist'),'message.dontexist');
            })
        })
    })
})
// describe('getPlural function test', () => {
//     it('should return Boys', () => {
//         let result = index.getPlural('Boy');
//         expect(result).to.equal('Boys');
//     });
//     it('should return Girls', () => {
//         let result = index.getPlural('Girl');
//         expect(result).to.equal('Girls');
//     });
//     it('should return Geese', () => {
//         let result = index.getPlural('Goose');
//         expect(result).to.equal('Geese');
//     });
//     it('should return Toys', () => {
//         let result = index.getPlural('Toy');
//         expect(result).to.equal('Toys');
//     });
//     it('should return Men', () => {
//         let result = index.getPlural('Man');
//         expect(result).to.equal('Men');
//     });
// });