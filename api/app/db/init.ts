import FileUpload from "../models/File.mode"

const isDev = process.env.NODE_ENV === 'development'

const dbInit = () => {
  FileUpload.sync({ alter: isDev, force: true }).then(() => console.log("Database and table is created succcessfuly"))
    .catch((error) => console.log('Error creating database:', error))
}
export default dbInit 