export interface ResponseDTO {
    status: ApiCode;
    message: any;
    data: any;
}

export enum ApiCode {
    SUCCESS,
    INVALID_REQUEST,
    ERROR,
    DELETED,
    HTTP_400,
    HTTP_500,
    HTTP_404
}