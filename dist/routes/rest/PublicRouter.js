"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const Cache_1 = __importDefault(require("../../utils/Cache"));
const PublicController_1 = require("../../controllers/rest/PublicController");
const router = (0, express_1.Router)();
router.get("/", Cache_1.default.route(), PublicController_1.publicController.indexAction);
exports.default = router;
//# sourceMappingURL=PublicRouter.js.map