export default class StringFormater{
    text:string;
    constructor(text:string) {
        this.text = text;
    }
    format(options:Array<string|number>|object) : string{
        return this.text.replace(/{(\d+)?}|{([a-zA-Z]+?\b)}/g, function(match:string, number:number,group:string) {
            const value = (!Array.isArray(options)  && typeof options == "object")
                ? group
                : number;

            return typeof options[value] != "undefined"
                ? options[value]
                : match
        });
    }
}