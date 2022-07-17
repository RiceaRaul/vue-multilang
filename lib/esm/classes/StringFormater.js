import lodash from "lodash";
export default class StringFormater {
    text;
    constructor(text) {
        this.text = text;
    }
    format(options, messages) {
        let stringFormater = this.text.replaceAll(/([@]([a-zA-Z0-9.]*)[@])/g, function (match, number, group) {
            return lodash.get(messages, match.replaceAll('@', ''));
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
