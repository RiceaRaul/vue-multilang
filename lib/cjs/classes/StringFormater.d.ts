import { LocaleMessageObject } from "../types/types";
export default class StringFormater {
    text: string;
    constructor(text: string);
    format(options: Array<string | number> | object, messages: LocaleMessageObject): string;
}
