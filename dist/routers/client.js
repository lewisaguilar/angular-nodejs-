"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const client_1 = require("../controllers/client");
const router = (0, express_1.Router)();
router.get('/', client_1.getClient);
router.post('/', client_1.newclient);
router.get('/:id', client_1.getClientId);
router.put('/:id', client_1.putClient);
router.delete('/:id', client_1.deleteClient);
exports.default = router;
//# sourceMappingURL=client.js.map