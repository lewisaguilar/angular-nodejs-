"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.putClient = exports.newclient = exports.deleteClient = exports.getClientId = exports.getClient = void 0;
const client_1 = require("../models/client");
const bcrypt_1 = __importDefault(require("bcrypt"));
///////////////////// get - Buscar todos los clientes //////////
const getClient = async (req, res) => {
    const listClient = await client_1.Client.findAll();
    res.json(listClient);
};
exports.getClient = getClient;
/////////////////  get - Buscar clientes por ID ////////////
const getClientId = async (req, res) => {
    const { id } = req.params;
    const client = await client_1.Client.findByPk(id);
    if (client) {
        res.json(client);
    }
    else {
        res.status(404).json({
            msg: `No existe un cliente con el id ${id}`
        });
    }
};
exports.getClientId = getClientId;
////////////////////delete
const deleteClient = async (req, res) => {
    const { id } = req.params;
    const client = await client_1.Client.findByPk(id);
    if (!client) {
        return res.status(404).json({
            msg: 'No existe un cliente con el id ' + id
        });
    }
    await client.destroy();
    res.json(client);
};
exports.deleteClient = deleteClient;
///////////////////// post  ingresar///////
const newclient = async (req, res) => {
    const { username, password, correo } = req.body;
    // Validamos si el usuario ya existe en la base de datos
    const clien = await client_1.Client.findOne({ where: { username: username } });
    if (clien) {
        return res.status(400).json({
            msg: `Ya existe un usuario con el nombre ${username}`
        });
    }
    const hashedPassword = await bcrypt_1.default.hash(password, 10);
    try {
        // Guardarmos usuario en la base de datos
        await client_1.Client.create({
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
exports.newclient = newclient;
////------------ put  ---atualizar 
const putClient = async (req, res) => {
    const { id } = req.params;
    const { body } = req;
    try {
        const client = await client_1.Client.findByPk(id);
        if (!client) {
            return res.status(404).json({
                msg: 'No existe un usuario con el id ' + id
            });
        }
        await client.update(body);
        res.json(client);
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Hable con el administrador'
        });
    }
};
exports.putClient = putClient;
//# sourceMappingURL=client.js.map