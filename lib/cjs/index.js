"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MultiLang = void 0;
const tslib_1 = require("tslib");
const lodash_1 = tslib_1.__importDefault(require("lodash"));
const StringFormater_1 = tslib_1.__importDefault(require("./classes/StringFormater"));
class MultiLang {
    options;
    constructor(options) {
        /* istanbul ignore next */
        this.options = (Object.keys(options).length > 0) ? options : {
            locale: "",
            fallbackLocale: "",
            messages: {},
        };
        /* istanbul ignore next */
        if (typeof window !== 'undefined' && window.localStorage) {
            const multiLangLocale = localStorage.getItem("multilangLocale");
            if (multiLangLocale) {
                this.options.locale = multiLangLocale;
            }
            localStorage.setItem("multilangLocale", this.options.locale);
        }
    }
    changeLocale(newLocale) {
        if (!this.options.messages.hasOwnProperty(newLocale)) {
            return false;
        }
        this.options.locale = newLocale;
        /* istanbul ignore next */
        if (typeof window !== 'undefined' && window.localStorage) {
            localStorage.setItem("multilangLocale", this.options.locale);
        }
        return true;
    }
    translate(messageName, options) {
        let locale = this.options.locale?.toString();
        const messages = this.options.messages;
        if (!messages.hasOwnProperty(locale)) {
            if (this.options.fallbackLocale === "") {
                return messageName;
            }
            locale = this.options.fallbackLocale;
            if (!messages.hasOwnProperty(locale)) {
                return messageName;
            }
        }
        let stringFormater = new StringFormater_1.default(lodash_1.default.get(messages[locale], messageName, messageName));
        return stringFormater.format(options);
    }
}
exports.MultiLang = MultiLang;
/* istanbul ignore next */
function createMultilang() {
    return {
        install: (app, options) => {
            let multilang = new MultiLang(options);
            app.config.globalProperties.$test = multilang;
            app.config.globalProperties.$t = (message, opt) => {
                return multilang.translate(message, opt);
            };
        },
    };
}
exports.default = createMultilang;
