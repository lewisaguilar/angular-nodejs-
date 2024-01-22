"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deletePhoto = exports.updatePhoto = exports.getPhoto = exports.createPhoto = exports.getPhotos = void 0;
const fs_extra_1 = __importDefault(require("fs-extra"));
const path_1 = __importDefault(require("path"));
const photo_1 = require("../models/photo");
// Models
//import Photo, { IPhoto } from '../models/Photo';
async function getPhotos(req, res) {
    const photos = await photo_1.Photo.findAll();
    return res.json(photos);
}
exports.getPhotos = getPhotos;
;
async function createPhoto(req, res) {
    const { title, description } = req.body;
    try {
        // Guardarmos usuario en la base de datos
        await photo_1.Photo.create({
            title: title,
            description: description,
            imagePath: req.file.path
        });
        res.json({
            msg: `Usuario ${title} creado exitosamente!`
        });
    }
    catch (error) {
        res.status(400).json({
            msg: 'Upps ocurrio un error',
            error
        });
    }
}
exports.createPhoto = createPhoto;
;
async function getPhoto(req, res) {
    const { id } = req.params;
    const photo = await photo_1.Photo.findByPk(id);
    if (photo) {
        res.json(photo);
    }
    else {
        res.status(404).json({
            msg: `No existe una photo con el id ${id}`
        });
    }
}
exports.getPhoto = getPhoto;
async function updatePhoto(req, res) {
    const { id } = req.params;
    const { body } = req;
    try {
        const photo = await photo_1.Photo.findByPk(id);
        if (!photo) {
            return res.status(404).json({
                msg: 'No existe una photo con el id ' + id
            });
        }
        await photo.update(body);
        res.json(photo);
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Hable con el administrador'
        });
    }
}
exports.updatePhoto = updatePhoto;
async function deletePhoto(req, res) {
    const { id } = req.params;
    try {
        const photo = await photo_1.Photo.findByPk(id);
        if (!photo) {
            return res.status(404).json({
                msg: 'No existe una photo con el id ' + id
            });
        }
        await photo.destroy();
        await fs_extra_1.default.unlink(path_1.default.resolve(photo.imagePath));
        res.json({ message: 'Deleted photo' });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Hable con el administrador'
        });
    }
}
exports.deletePhoto = deletePhoto;
//# sourceMappingURL=photo.js.map