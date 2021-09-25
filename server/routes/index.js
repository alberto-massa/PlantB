const router = require("express").Router();

const authRouter = require("./auth.routes");
const plantRouter = require("./plant.routes.js");
const userRouter = require("./user.routes.js")
const shopRouter = require("./shop.routes.js")
const commentRouter = require("./comment.routes.js")
const messageRouter = require("./message.routes.js")

router.use("/auth", authRouter);
router.use("/plant", plantRouter);
router.use("/user", userRouter);
router.use("/shop", shopRouter);
router.use("/comment", commentRouter);
router.use("/message", messageRouter);

module.exports = router;
