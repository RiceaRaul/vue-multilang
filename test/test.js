'use strict';
const assert = require('assert')
const createMultilang = require("../lib/cjs").MultiLang;
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
        describe('fallback if locale don`t exists', () => {
            it('should locale change to fallback options', () => {
                multilang.options.locale = "undefined"
                assert.deepEqual(multilang.translate('message.hello'),ro.message.hello);
            })
        })
        describe('if fallback is undefined or empty', () => {
            it('should return name of object', () => {
                multilang.options.locale = "undefined"
                multilang.options.fallbackLocale = ""
                assert.deepEqual(multilang.translate('message.hello'),"message.hello");
            })
        })
        describe('if fallback value don`t exists', () => {
            it('should return name of object', () => {
                multilang.options.locale = "undefined"
                multilang.options.fallbackLocale = "undefined"
                assert.deepEqual(multilang.translate('message.hello'),"message.hello");
            })
        })
        describe('custom string parameter object', () => {
            it('should change variable to string', () => {
                assert.deepEqual(multilang.translate('message.customObject',{username:"salut"}),"salut");
            })
        })
        describe('custom string parameter array', () => {
            it('should change variable to string', () => {
                assert.deepEqual(multilang.translate('message.custom',["salut"]),"salut");
            })
        })
    })
    describe("multilelanguage#changeLocale",()=>{
        describe("change locale to ro",()=>{
            it('should support change locale', () => {
                assert.deepEqual(  multilang.changeLocale("ro"), true);
            })
        })
        describe("changing the locale variable to an undefined value",()=>{
            it('should return false', () => {
                assert.deepEqual(  multilang.changeLocale("undefined"), false);
            })
        })
    })
})