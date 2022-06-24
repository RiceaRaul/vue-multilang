export default class StringFormater {
    text: string;
    constructor(text: string);
    format(options: Array<string | number> | object): string;
}
