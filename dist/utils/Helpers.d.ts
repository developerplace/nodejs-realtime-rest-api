import { iResponse } from "../interfaces/IResponse";
export default class Helpers {
    /**
     * Return JSON Response struct
     * @param error
     * @param statusCode
     * @param statusMessage
     * @param devMessage
     * @param uiMessage
     * @param data
     */
    static jsonResponseBuilder(error?: boolean, statusCode?: number, statusMessage?: string, devMessage?: string, uiMessage?: string, data?: object): iResponse;
}
