import { Model } from "mongoose";
export default class BaseRepository<T> {
    private readonly entityInstance;
    constructor(entity: Model<T>);
    protected createDocument<I>(documentObject: I): Promise<Document>;
    protected getAllDocuments(): Promise<unknown>;
    protected getOneDocumentByParameters(parameters: object): Promise<object>;
    protected getAllDocumentsByParameters(parameters?: object): Promise<unknown>;
    protected updateDocument(documentId: string, document?: object): Promise<unknown>;
    protected deleteDocument(documentId: string): Promise<unknown>;
}
