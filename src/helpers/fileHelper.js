import fs from 'fs';
import path from 'path';

const DB_ROUTE = path.join(__dirname, '../db/');

export const getFile = (fileName) => {
    const route = DB_ROUTE + fileName;
    if(fs.existsSync(route)) {
        const file = fs.readFileSync(route);
        if(!file) return;
    
        return JSON.parse(file);
    }

    return;
}

export const getAllFiles = () => {
    return fs.readdirSync(DB_ROUTE).map(file => JSON.parse(file))
}

export const writeFile = (fileName, data) => {
    fs.writeFileSync(DB_ROUTE + fileName, JSON.stringify(data))
}

export default {
    getFile,
    writeFile,
    getAllFiles
}

