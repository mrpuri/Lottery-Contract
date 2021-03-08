const Router = require("express").Router();
const bodyparser = require("body-parser");
const controller = require("../controller/controller");

Router.get("/api/v1/owner", controller.owner);
Router.post("/api/v1/startlottery", controller.startLottery);
Router.get("/api/v1/status", controller.status);
Router.get("/api/v1/drawwinner", controller.drawWinner);
Router.get("/api/v1/buyticket", controller.buyTicket);

module.exports = Router;
