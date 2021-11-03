"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Helpers {
    /**
     * Return JSON Response struct
     * @param error
     * @param statusCode
     * @param statusMessage
     * @param devMessage
     * @param uiMessage
     * @param data
     */
    static jsonResponseBuilder(error = false, statusCode = 200, statusMessage = "Ok", devMessage = "", uiMessage = "", data = {}) {
        return {
            error,
            statusCode,
            statusMessage,
            devMessage,
            uiMessage,
            data,
        };
    }
}
exports.default = Helpers;
//# sourceMappingURL=Helpers.js.map