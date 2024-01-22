"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const persona_controllers_1 = require("../controllers/persona.controllers");
const router = (0, express_1.Router)();
router.get('/', persona_controllers_1.getUser);
router.post('/', persona_controllers_1.newUserpost);
router.get('/:id', persona_controllers_1.getUserId);
router.put('/:id', persona_controllers_1.putUser);
router.delete('/:id', persona_controllers_1.deleteUser);
exports.default = router;
//# sourceMappingURL=persona.routers.js.map