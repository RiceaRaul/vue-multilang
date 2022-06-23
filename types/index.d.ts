
export interface IHelloModule {
    sayHello: (name: string) => string;
}

declare module "@vue/runtime-core" {
    //Bind to `this` keyword
    interface ComponentCustomProperties {
        $hello: IHelloModule;
    }
}