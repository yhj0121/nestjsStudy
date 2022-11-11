"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var catRouter_1 = require("./router/catRouter");
var port = 8000;
var Server = (function () {
    function Server() {
        var app = express();
        this.app = app;
    }
    Server.prototype.SetRoute = function () {
        this.app.use('/', catRouter_1.default);
    };
    Server.prototype.setMiddleware = function () {
        this.app.use(express.json());
        this.app.use(function (req, res, next) {
            res.send({ error: "404 not found" });
            next();
        });
    };
    Server.prototype.listen = function () {
        this.setMiddleware();
        this.SetRoute();
        this.app.listen(port, function () {
            console.log("Example app listening on port " + port);
        });
    };
    return Server;
}());
function init() {
    var server = new Server();
    server.listen();
}
init();
//# sourceMappingURL=app.js.map