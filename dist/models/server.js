"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const path_1 = __importDefault(require("path"));
const client_1 = __importDefault(require("../routers/client"));
const user_1 = __importDefault(require("../routers/user"));
const client_2 = require("./client");
const user_2 = require("./user");
const morgan_1 = __importDefault(require("morgan"));
const photo_1 = __importDefault(require("../routers/photo"));
const photo_2 = require("./photo");
class Server {
    app;
    port;
    constructor() {
        this.app = (0, express_1.default)();
        this.port = process.env.PORT || '3000';
        this.dbConnect();
        this.middlewares();
        this.routes();
    }
    listen() {
        this.app.listen(this.port, () => {
            console.log('Aplicacion corriendo por el puerto', this.port);
        });
    }
    middlewares() {
        //Parseo del body
        this.app.use(express_1.default.json());
        //
        this.app.use((0, cors_1.default)());
        //
        this.app.use((0, morgan_1.default)('dev'));
        // this folders for this application will be used to store public file image
        this.app.use('/uploads', express_1.default.static(path_1.default.resolve('uploads')));
    }
    routes() {
        this.app.use('/api/client', client_1.default);
        this.app.use('/api/users', user_1.default);
        this.app.use('/api', photo_1.default);
    }
    async dbConnect() {
        try {
            await client_2.Client.sync();
            await user_2.User.sync();
            await photo_2.Photo.sync();
        }
        catch (error) {
            console.error('Unable to connect to the database:', error);
        }
    }
}
exports.default = Server;
//# sourceMappingURL=server.js.map