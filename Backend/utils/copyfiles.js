import path from "path";
import fs from "fs"

export const copyFiles = (files, pathName) => {

    const promises = files.map((file) => {
        return new Promise((resolve, reject) => {
            const timestamp = new Date().getTime();
            const newPath = `${pathName}/${timestamp}${(Math.random() + 1).toString(36).substring(7)}${path.extname(file.originalFilename)}`;
            fs.copyFile(file.filepath, `public/${newPath}`, (err) => {
                if (err) reject(err)
                else resolve(newPath);
            });
        });
    });
    return Promise.all(promises);
};