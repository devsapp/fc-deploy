export declare const REMOVE_HELP_INFO: ({
    header: string;
    content: string;
    optionList?: undefined;
} | {
    header: string;
    optionList: ({
        name: string;
        description: string;
        type: StringConstructor;
        alias?: undefined;
    } | {
        name: string;
        description: string;
        alias: string;
        type: BooleanConstructor;
    })[];
    content?: undefined;
} | {
    header: string;
    content: string[];
    optionList?: undefined;
})[];
