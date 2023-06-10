import { Op } from "sequelize";
import { FileModelInput, FileModelOutput } from "../models/File.mode";
import FileUpload from "../models/File.mode";

export const create = async (
  payload: FileModelInput
): Promise<FileModelOutput> => {
  await FileUpload.truncate({ cascade: true, force: true });
  const _files = await FileUpload.create(payload);
  return _files;
};

export const update = async (
  id: number,
  payload: Partial<FileModelInput>
): Promise<FileModelOutput> => {
  const _file = await FileUpload.findByPk(id);
  if (!_file) {
    // @todo throw custom error
    throw new Error("not found");
  }
  const updatedFile = await (_file as FileUpload).update(payload);
  return updatedFile;
};

export const getById = async (id: number): Promise<FileModelOutput> => {
  const _file = await FileUpload.findByPk(id);
  if (!_file) {
    // @todo throw custom error
    throw new Error("not found");
  }
  return _file;
};

export const deleteById = async (id: number) => {
  const deletedIngredientCount = await FileUpload.destroy({
    where: { id },
  });
  return deletedIngredientCount;
};

export const getAll = async () => {
  return FileUpload.findAll({ where: { deletedAt: null }});
};
