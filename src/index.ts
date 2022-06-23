import {App} from 'vue'
import {IMultiLangOptions, LocaleMessage} from "./types/types";
import lodash from "lodash";

export class MultiLang {
    private options: IMultiLangOptions;
    constructor(options: IMultiLangOptions) {
        this.options = (Object.keys(options).length > 0) ? options :  {
            locale: "",
            fallbackLocale: "",
            messages: {},
        } ;
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
        localStorage.setItem("multilangLocale", this.options.locale);
        return true;
    }
    translate(messageName: string): LocaleMessage {
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
        install: (app: App, options: IMultiLangOptions) => {
            let multilang = new MultiLang(options);
            app.config.globalProperties.$test = multilang
            app.config.globalProperties.$t = (message: string) => {
                return multilang.translate(message)
            }
        },
    }
}
declare module '@vue/runtime-core' {
    export interface ComponentCustomProperties {
        $test: MultiLang,
        $t(messageName: string): LocaleMessage
    }
}