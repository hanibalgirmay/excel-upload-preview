import FileUpload from "../models/File.mode"

const isDev = process.env.NODE_ENV === 'development'

const dbInit = () => {
  FileUpload.sync({ alter: isDev })
}
export default dbInit 