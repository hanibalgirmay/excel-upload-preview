import { FileModelInput, FileModelOutput } from "../models/File.mode"
import * as fileDAL from '../dal/FileUpload';

export const create = (payload: FileModelInput): Promise<FileModelOutput> => {
    return fileDAL.create(payload)
}
export const update = (id: number, payload: Partial<FileModelInput>): Promise<FileModelOutput> => {
    return fileDAL.update(id, payload)
}
export const getById = (id: number): Promise<FileModelOutput> => {
    return fileDAL.getById(id)
}
export const deleteById = (id: number): Promise<boolean> => {
    return fileDAL.deleteById(id)
}
export const getAll = (): Promise<FileModelOutput[]> => {
    return fileDAL.getAll();
}