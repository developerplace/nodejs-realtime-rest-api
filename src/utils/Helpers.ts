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
  public static jsonResponseBuilder(error: boolean = false, statusCode: number = 200, statusMessage: string = "Ok", devMessage: string = "", uiMessage: string = "", data: object = {}): iResponse {
    return {
      error,
      statusCode,
      statusMessage,
      devMessage,
      uiMessage,
      data
    }
  }

}
