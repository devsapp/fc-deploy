export declare const RETRYOPTIONS: {
    retries: number;
    factor: number;
    minTimeout: number;
    randomize: boolean;
};
export declare const HELP: ({
    header: string;
    optionList: {
        name: string;
        description: string;
        alias: string;
        type: BooleanConstructor;
    }[];
    content?: undefined;
} | {
    header: string;
    content: {
        example: string;
    }[];
    optionList?: undefined;
})[];
