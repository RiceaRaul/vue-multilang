export default class StringFormater {
    text;
    constructor(text) {
        this.text = text;
    }
    format(options) {
        return this.text.replace(/{(\d+)?}|{([a-zA-Z]+?\b)}/g, function (match, number, group) {
            const value = (!Array.isArray(options) && typeof options == "object")
                ? group
                : number;
            return typeof options[value] != "undefined"
                ? options[value]
                : match;
        });
    }
}
