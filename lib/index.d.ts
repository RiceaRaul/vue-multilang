import { App } from 'vue';
import { IMultiLangOptions, LocaleMessage } from "./types/types";
declare class MultiLang {
    options: IMultiLangOptions;
    constructor(options?: IMultiLangOptions);
    test(): string | undefined;
    changeLocale(newLocale: string): boolean;
    translate(messageName: string): LocaleMessage;
}
export default function createMultilang(): {
    install: (app: App, options: IMultiLangOptions) => void;
};
declare module '@vue/runtime-core' {
    interface ComponentCustomProperties {
        $test: MultiLang;
        $t(messageName: string): LocaleMessage;
    }
}
export {};
