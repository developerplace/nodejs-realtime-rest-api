import { Model } from "mongoose";

export default class BaseRepository<T> {

  private readonly entityInstance: Model<T>;

  // Constructor
  constructor(entity: Model<T>) {
    this.entityInstance = entity;
  }

  protected createDocument<I>(documentObject: I): Promise<Document> {
    return new Promise(async (resolve, reject): Promise<void> => {
      try {
        const newDocumentInstance = new this.entityInstance(documentObject);
        await newDocumentInstance.save();
        resolve(newDocumentInstance._id);
      } catch (e) {
        reject(e);
      }
    });
  }

  // Método encargado de obtener todos los documentos de una entidad
  protected getAllDocuments() {
    return new Promise(async (resolve, reject) => {
      try {
        const documents = await this.entityInstance.find();
        resolve(documents);
      } catch (e) {
        reject(e);
      }
    });
  }

  // Método encargado de obtener un documento en base a parámetros
  protected getOneDocumentByParameters(parameters: object): Promise<object> {
    return new Promise(async (resolve, reject) => {
      try {
        const document = await this.entityInstance.findOne(parameters);
        resolve(document);
      } catch (e) {
        reject(e);
      }
    });
  }

  // Método encargado de obtener todos los documentos de una entidad en base a parámetros
  protected getAllDocumentsByParameters(parameters: object = {}) {
    return new Promise(async (resolve, reject) => {
      try {
        const documents = await this.entityInstance.find(parameters);
        resolve(documents);
      } catch (e) {
        reject(e);
      }
    });
  }

  // Método encargado de actualizar un documento de una entidad
  protected updateDocument(documentId: string, document: object = {}) {
    return new Promise(async (resolve, reject) => {
      try {
        const documentUpdated = await this.entityInstance.findByIdAndUpdate(documentId, document);
        resolve(documentUpdated);
      } catch (e) {
        reject(e);
      }
    });
  }

  // Método encargado de eliminar un documento de una entidad
  protected deleteDocument(documentId: string) {
    return new Promise(async (resolve, reject) => {
      try {
        await this.entityInstance.findByIdAndDelete(documentId);
        resolve(true);
      } catch (e) {
        reject(e);
      }
    });
  }

}
