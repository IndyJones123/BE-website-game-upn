const m$game = require("../modules/game.module");
const response = require("../helpers/response");
const upload = require("../middlewares/multer");

const authorization = require("../middlewares/authorization");

const { Router } = require("express");

const gameController = Router();

gameController.post("/add", upload.single("gambar"), async (req, res) => {
    const result = await m$game.addGame(req.body, req.file);

    return response.sendResponse(res, result);
});

gameController.get("/", async (req, res) => {
    const result = await m$game.getGame();

    return response.sendResponse(res, result);
});

gameController.get("/:game", async (req, res) => {
    const result = await m$game.getGameDetail(req.params.game);

    return response.sendResponse(res, result);
});

gameController.put(
    "/update/:name",
    upload.single("gambar"),
    async (req, res) => {
        const result = await m$game.updateGame(
            req.params.name,
            req.body,
            req.file
        );

        return response.sendResponse(res, result);
    }
);

gameController.delete("/delete/:name", async (req, res) => {
    const result = await m$game.deleteGame(req.params.name);

    return response.sendResponse(res, result);
});

module.exports = gameController;
