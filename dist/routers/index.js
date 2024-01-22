"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const router = (0, express_1.Router)();
const multer_1 = __importDefault(require("../libs/multer"));
//import { getPhotos, createPhoto, getPhoto, deletePhoto, updatePhoto } from '../controllers/photo';
const photo_1 = require("../controllers/photo");
// middleware
router.use(multer_1.default.single('image'));
// routes
router.post('/', photo_1.createPhoto);
//router.route('/photos',  )
//  .get(getPhotos)
//    .post(upload.single('image'), createPhoto);
//  .post(createPhoto);
/*
router.route('/photos/:id')
    .get(getPhoto)
    .delete(deletePhoto)
    .put(updatePhoto);*/
exports.default = router;
//# sourceMappingURL=index.js.map