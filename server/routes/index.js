const router = require("express").Router();

const plantsRouter = require("./plants.routes.js");
const authRouter = require("./auth.routes");
const userRouter = require("./user.routes.js")
const shopRouter = require("./shop.routes.js")
const commentRouter = require("./comment.routes.js")
const messageRouter = require("./message.routes.js")

router.use("/plants", plantsRouter);
router.use("/auth", authRouter);
router.use("/user", userRouter);
router.use("/shop", shopRouter);
router.use("/comment", commentRouter);
router.use("/messsage", messageRouter);

module.exports = router;
