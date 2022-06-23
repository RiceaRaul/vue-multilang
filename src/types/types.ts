export type LocaleMessage = string | LocaleMessageObject

export interface LocaleMessageObject { [key: string]: LocaleMessage; }

export interface IMessageInterface { [key: string]: LocaleMessageObject; }

export interface IMultiLangOptions {
    locale:string,
    fallbackLocale?:string
    messages:IMessageInterface
}