
export const ExtFileImage = (req: Express.Request, file: Express.Multer.File, callback: Function) => {
    var extname: string = file.mimetype.split('/')[1];;
    var validExtensions = ['jpeg', 'png', 'jpg']

    if (validExtensions.includes(extname)) {
        return callback(null, true);
    }
    callback(null, false);
}