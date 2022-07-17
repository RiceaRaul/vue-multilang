import lodash from "lodash";
import { LocaleMessageObject } from "../types/types"
export default class StringFormater {
    text: string;
    constructor(text: string) {
        this.text = text;
    }
    format(options: Array<string | number> | object, messages: LocaleMessageObject): string {
        let stringFormater = this.text.replaceAll(/([@]([a-zA-Z0-9.]*)[@])/g, function (match: string, number: number, group: string) {
            return lodash.get(messages, match.replaceAll('@', ''));
        })

        stringFormater = stringFormater.replaceAll(/{(\d+)?}|{([a-zA-Z]+?\b)}/g, function (match: string, number: number, group: string) {
            const value = (!Array.isArray(options) && typeof options == "object")
                ? group
                : number;
            return typeof options[value] != "undefined"
                ? options[value]
                : match
        });

        return stringFormater;
    }
}