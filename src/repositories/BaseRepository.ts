import { Model } from "mongoose";

export default class BaseRepository<T> {

  private readonly entityInstance: Model<T>;

  // Constructor
  constructor(entity: Model<T>) {
    this.entityInstance = entity;
  }

  public createDocument(documentObject: T): Promise<T> {
    return new Promise(async (resolve, reject): Promise<void> => {
      try {
        const newDocumentInstance = new this.entityInstance(documentObject);
        await newDocumentInstance.save();
        resolve(newDocumentInstance);
      } catch (e) {
        reject(e);
      }
    });
  }

  public getAllDocuments(): Promise<T[]> {
    return new Promise(async (resolve, reject): Promise<void> => {
      try {
        const documents: T[] = await this.entityInstance.find();
        resolve(documents);
      } catch (e) {
        reject(e);
      }
    });
  }

  public getOneDocumentByParameters(parameters: object): Promise<T> {
    return new Promise(async (resolve, reject): Promise<void> => {
      try {
        const document = await this.entityInstance.findOne(parameters);
        resolve(document);
      } catch (e) {
        reject(e);
      }
    });
  }

  public getAllDocumentsByParameters(parameters: object = {}): Promise<T[]> {
    return new Promise(async (resolve, reject): Promise<void> => {
      try {
        const documents = await this.entityInstance.find(parameters);
        resolve(documents);
      } catch (e) {
        reject(e);
      }
    });
  }

  public updateDocument(documentId: string, document: object = {}): Promise<T> {
    return new Promise(async (resolve, reject): Promise<void> => {
      try {
        const documentUpdated = await this.entityInstance.findByIdAndUpdate(documentId, document);
        resolve(documentUpdated);
      } catch (e) {
        reject(e);
      }
    });
  }

  public deleteDocument(documentId: string): Promise<boolean> {
    return new Promise(async (resolve, reject): Promise<void> => {
      try {
        await this.entityInstance.findByIdAndDelete(documentId);
        resolve(true);
      } catch (e) {
        reject(e);
      }
    });
  }

}
