const router = require("express").Router();

const authRouter = require("./auth.routes");
const plantRouter = require("./plant.routes.js");
const userRouter = require("./user.routes.js");
const commentRouter = require("./comment.routes.js");
const messageRouter = require("./message.routes.js");
const cartRouter = require("./cart.routes.js");
const checkoutRouter = require("./checkout.routes.js");
const invoiceRouter = require("./invoice.routes.js");

router.use("/auth", authRouter);
router.use("/plant", plantRouter);
router.use("/user", userRouter);
router.use("/comment", commentRouter);
router.use("/message", messageRouter);
router.use("/cart", cartRouter);
router.use("/checkout", checkoutRouter);
router.use("/invoice", invoiceRouter);

module.exports = router;
