import { App } from 'vue'
import { IMultiLangOptions, LocaleMessage } from "./types/types";
import lodash from "lodash";
import StringFormater from "./classes/StringFormater";

export class MultiLang {
    private options: IMultiLangOptions;
    constructor(options: IMultiLangOptions) {
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
                this.options.locale = multiLangLocale
            }
            localStorage.setItem("multilangLocale", this.options.locale);
        }
    }
    changeLocale(newLocale: string) {
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
    translate(messageName: string, options: Array<string | number> | object): LocaleMessage {
        let locale = this.options.locale;
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
        let stringFormater = new StringFormater(lodash.get(messages[locale], messageName, messageName));
        return stringFormater.format(options, messages[locale]);
    }
}
/* istanbul ignore next */
export default function createMultilang() {
    return {
        install: (app: App, options: IMultiLangOptions) => {
            let multilang = new MultiLang(options);
            app.config.globalProperties.$lang = multilang
            app.config.globalProperties.$t = (message: string, opt: Array<string | number> | object) => {
                return multilang.translate(message, opt)
            }
        },
    }
}
/* istanbul ignore next */
declare module '@vue/runtime-core' {
    export interface ComponentCustomProperties {
        $lang: MultiLang,
        $t(messageName: string, options: Array<string | number> | object): LocaleMessage
    }
}