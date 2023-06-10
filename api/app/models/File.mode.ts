import { DataTypes, Model, Optional } from 'sequelize';
import sequelizeConnection from '../db/config';

interface FileModelAttributes {
    id: number;
    description: string;
    rate: string;
    quantity: number;
    amount: number;
    createdAt?: Date;
    updatedAt?: Date;
    deletedAt?: null;
}

export interface FileModelInput extends Optional<FileModelAttributes, 'id'> { }
export interface FileModelOutput extends Required<FileModelAttributes> { }

class FileUpload extends Model<FileModelAttributes, FileModelInput> implements FileModelAttributes {
    public id!: number;
    public description!: string;
    public rate!: string;
    public quantity!: number;
    public amount!: number;

    // timestamps!
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
    public readonly deletedAt!: null;

}

FileUpload.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    description: {
        type: DataTypes.STRING,
        allowNull: false
    },
    rate: {
        type: DataTypes.FLOAT,
        allowNull: true
    },
    quantity: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    amount: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
}, {
    timestamps: true,
    sequelize: sequelizeConnection,
    paranoid: true,
    modelName: 'ExcelFiles'
})

export default FileUpload;