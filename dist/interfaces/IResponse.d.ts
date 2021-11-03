export interface iResponse {
    error: boolean;
    statusCode: number;
    statusMessage: string;
    devMessage: string;
    uiMessage: string;
    data: object;
}
