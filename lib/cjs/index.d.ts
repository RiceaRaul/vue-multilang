import { App } from 'vue';
import { IMultiLangOptions, LocaleMessage } from "./types/types";
export declare class MultiLang {
    private options;
    constructor(options: IMultiLangOptions);
    changeLocale(newLocale: string): boolean;
    translate(messageName: string, options: Array<string | number> | object): LocaleMessage;
}
export default function createMultilang(): {
    install: (app: App, options: IMultiLangOptions) => void;
};
declare module '@vue/runtime-core' {
    interface ComponentCustomProperties {
        $lang: MultiLang;
        $t(messageName: string, options: Array<string | number> | object): LocaleMessage;
    }
}
