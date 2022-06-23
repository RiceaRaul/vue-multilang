"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const lodash_1 = tslib_1.__importDefault(require("lodash"));
class MultiLang {
    options = {
        text: "",
        locale: "",
        fallbackLocale: "",
        messages: {},
    };
    constructor(options = {}) {
        this.options = options;
        if (typeof window !== 'undefined' && window.localStorage) {
            const multiLangLocale = localStorage.getItem("multilangLocale");
            if (multiLangLocale) {
                this.options.locale = multiLangLocale;
            }
            localStorage.setItem("multilangLocale", this.options.locale);
        }
    }
    test() {
        return this.options.text;
    }
    changeLocale(newLocale) {
        if (!this.options.messages.hasOwnProperty(newLocale)) {
            return false;
        }
        this.options.locale = newLocale;
        localStorage.setItem("multilangLocale", this.options.locale);
        return true;
    }
    translate(messageName) {
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
        return lodash_1.default.get(messages[locale], messageName);
    }
}
function createMultilang() {
    return {
        install: (app, options) => {
            let multilang = new MultiLang(options);
            app.config.globalProperties.$test = multilang;
            app.config.globalProperties.$t = (message) => {
                return multilang.translate(message);
            };
        },
    };
}
exports.default = createMultilang;
