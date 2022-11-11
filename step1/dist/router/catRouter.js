"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var catsService_1 = require("../service/catsService");
var router = express_1.Router();
router.get('/cats', catsService_1.readAllcat);
router.get('/cats/:id', catsService_1.readCat);
router.post('/cats', catsService_1.createCat);
router.put('/cats/:id', catsService_1.updateCat);
router.patch('/cats/:id', catsService_1.updatePartialCat);
router.delete('/cats/:id', catsService_1.deleteCat);
exports.default = router;
//# sourceMappingURL=catRouter.js.map