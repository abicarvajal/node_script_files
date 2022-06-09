const { Console } = require('console');
const fs = require('fs');
const path = require('path');
const dir_path = path.join(__dirname,'files');

var extensions_plain = ["txt"];
var extensions_doc = ['docx', 'csv', 'pptx', 'pdf'];
var extensions_pic = ['jpg', 'png', 'jpeg'];

//#region path
const destination_plain = path.join(dir_path,'Text');
const destination_images = path.join(dir_path,'Images');
const destination_docs = path.join(dir_path,'Docs');
//#endregion

createMainFolder(destination_plain);
createMainFolder(destination_docs);
createMainFolder(destination_images);

fs.readdir(dir_path, function (err, files) {
    //handling error
    if (err) {
        return console.log('No se puede acceder al directorio ' + err);
    } 
    //listing all files using forEach
    files.forEach(function (file) {
        // Do whatever you want to do with the file
        let ext = getExtensionFile(file).toLowerCase();

        if(extensions_plain.includes(ext)){
            if(movedFiles(path.join(dir_path,file), path.join(destination_plain,file))) console.log("Se movio " + file);
        }
        else if(extensions_doc.includes(ext)) {
            if(movedFiles(path.join(dir_path,file), path.join(destination_docs,file))) console.log("Se movio " + file);
        }
        else if(extensions_pic.includes(ext)){
            if(movedFiles(path.join(dir_path,file), path.join(destination_images,file))) console.log("Se movio " + file);
        }
        else {
            console.log("No se ha movido el archivo " + file);
        }
    });
});

//Funcion para copiar archivos
async function copyFiles(source, destination){
    try {
        await fs.copyFile(source, destination,(err)=>{
            if(err) console.log('El archivo no se pudo copiar');
        });
        return true
    } catch {
        return false
    }
}

//Funcion para mover archivos
async function movedFiles(source, destination){
    try {
        await fs.rename(source, destination, function (err) {
            if (err) console.log("El archivo no se pudo mover!");
        });
        return true
    } catch {
        return false
    }
}

async function createMainFolder(folder){
    if (!fs.existsSync(folder)){
        await fs.mkdirSync(folder);
        console.log('Folder Created Successfully.');
    }
}

//Funcion para obtener las extensiones de archivos
function getExtensionFile(filename) {
    var ext = path.extname(filename||'').split('.');
    console.log(ext[ext.length - 1]);
    return ext[ext.length - 1];
}