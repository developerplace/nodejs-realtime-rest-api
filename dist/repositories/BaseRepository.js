"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class BaseRepository {
    // Constructor
    constructor(entity) {
        this.entityInstance = entity;
    }
    createDocument(documentObject) {
        return new Promise(async (resolve, reject) => {
            try {
                const newDocumentInstance = new this.entityInstance(documentObject);
                await newDocumentInstance.save();
                resolve(newDocumentInstance._id);
            }
            catch (e) {
                reject(e);
            }
        });
    }
    // Método encargado de obtener todos los documentos de una entidad
    getAllDocuments() {
        return new Promise(async (resolve, reject) => {
            try {
                const documents = await this.entityInstance.find();
                resolve(documents);
            }
            catch (e) {
                reject(e);
            }
        });
    }
    // Método encargado de obtener un documento en base a parámetros
    getOneDocumentByParameters(parameters) {
        return new Promise(async (resolve, reject) => {
            try {
                const document = await this.entityInstance.findOne(parameters);
                resolve(document);
            }
            catch (e) {
                reject(e);
            }
        });
    }
    // Método encargado de obtener todos los documentos de una entidad en base a parámetros
    getAllDocumentsByParameters(parameters = {}) {
        return new Promise(async (resolve, reject) => {
            try {
                const documents = await this.entityInstance.find(parameters);
                resolve(documents);
            }
            catch (e) {
                reject(e);
            }
        });
    }
    // Método encargado de actualizar un documento de una entidad
    updateDocument(documentId, document = {}) {
        return new Promise(async (resolve, reject) => {
            try {
                const documentUpdated = await this.entityInstance.findByIdAndUpdate(documentId, document);
                resolve(documentUpdated);
            }
            catch (e) {
                reject(e);
            }
        });
    }
    // Método encargado de eliminar un documento de una entidad
    deleteDocument(documentId) {
        return new Promise(async (resolve, reject) => {
            try {
                await this.entityInstance.findByIdAndDelete(documentId);
                resolve(true);
            }
            catch (e) {
                reject(e);
            }
        });
    }
}
exports.default = BaseRepository;
//# sourceMappingURL=BaseRepository.js.map