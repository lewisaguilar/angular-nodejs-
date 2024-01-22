"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.putUser = exports.newUserpost = exports.deleteUser = exports.getUserId = exports.getUser = void 0;
const user_1 = require("../models/user");
const bcrypt_1 = __importDefault(require("bcrypt"));
///////////////////// get - buscar //////////
const getUser = async (req, res) => {
    const listProducts = await user_1.User.findAll();
    res.json(listProducts);
};
exports.getUser = getUser;
/////////////////  get - buscar ID ////////////
const getUserId = async (req, res) => {
    const { id } = req.params;
    const usuario = await user_1.User.findByPk(id);
    if (usuario) {
        res.json(usuario);
    }
    else {
        res.status(404).json({
            msg: `No existe un usuario con el id ${id}`
        });
    }
};
exports.getUserId = getUserId;
////////////////////delete
const deleteUser = async (req, res) => {
    const { id } = req.params;
    const usuario = await user_1.User.findByPk(id);
    if (!usuario) {
        return res.status(404).json({
            msg: 'No existe un usuario con el id ' + id
        });
    }
    await usuario.destroy();
    res.json(usuario);
};
exports.deleteUser = deleteUser;
///////////////////// post  ingresar///////
const newUserpost = async (req, res) => {
    const { username, password, correo } = req.body;
    console.log(username);
    console.log(password);
    // Validamos si el usuario ya existe en la base de datos
    const user = await user_1.User.findOne({ where: { username: username } });
    if (user) {
        return res.status(400).json({
            msg: `Ya existe un usuario con el nombre ${username}`
        });
    }
    const hashedPassword = await bcrypt_1.default.hash(password, 10);
    try {
        // Guardarmos usuario en la base de datos
        await user_1.User.create({
            username: username,
            password: hashedPassword,
            correo: correo
        });
        res.json({
            msg: `Usuario ${username} creado exitosamente!`
        });
    }
    catch (error) {
        res.status(400).json({
            msg: 'Upps ocurrio un error',
            error
        });
    }
};
exports.newUserpost = newUserpost;
////------------ put  ---atualizar 
const putUser = async (req, res) => {
    const { id } = req.params;
    const { body } = req;
    try {
        const usuario = await user_1.User.findByPk(id);
        if (!usuario) {
            return res.status(404).json({
                msg: 'No existe un usuario con el id ' + id
            });
        }
        await usuario.update(body);
        res.json(usuario);
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Hable con el administrador'
        });
    }
};
exports.putUser = putUser;
//# sourceMappingURL=persona.controllers.js.map