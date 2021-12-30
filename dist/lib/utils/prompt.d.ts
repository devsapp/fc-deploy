export declare function promptForConfirmContinue(message: string): Promise<boolean>;
interface PromptForConfirmOrDetails {
    message: string;
    diff?: string;
    choices?: string[];
    trueChoice?: string;
    codeDiff?: string;
}
export declare function promptForConfirmOrDetails({ message, diff, choices, trueChoice, codeDiff, }: PromptForConfirmOrDetails): Promise<boolean>;
export declare function promptForInputContinue(message: string, defaultValue?: any): Promise<any>;
export {};
