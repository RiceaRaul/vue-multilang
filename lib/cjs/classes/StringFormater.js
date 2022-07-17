"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const lodash_1 = tslib_1.__importDefault(require("lodash"));
class StringFormater {
    text;
    constructor(text) {
        this.text = text;
    }
    format(options, messages) {
        let stringFormater = this.text.replaceAll(/([@]([a-zA-Z0-9.]*)[@])/g, function (match, number, group) {
            return lodash_1.default.get(messages, match.replaceAll('@', ''));
        });
        stringFormater = stringFormater.replaceAll(/{(\d+)?}|{([a-zA-Z]+?\b)}/g, function (match, number, group) {
            const value = (!Array.isArray(options) && typeof options == "object")
                ? group
                : number;
            return typeof options[value] != "undefined"
                ? options[value]
                : match;
        });
        return stringFormater;
    }
}
exports.default = StringFormater;
