import lodash from "lodash";
export class MultiLang {
    options;
    constructor(options) {
        this.options = (Object.keys(options).length > 0) ? options : {
            locale: "",
            fallbackLocale: "",
            messages: {},
        };
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
        return lodash.get(messages[locale], messageName, messageName);
    }
}
export default function createMultilang() {
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
