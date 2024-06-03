export declare class ImageCaptchaDto {
    readonly width: number;
    readonly height: number;
}
export declare class SendEmailCodeDto {
    email: string;
}
export declare class SendSmsCodeDto {
    phone: string;
}
export declare class CheckCodeDto {
    account: string;
    code: string;
}
