const express = require("express");
const router = express.Router();
const uploadMiddleware = require("../utils/handleStorage");
const {validatorGetItem} = require("../validators/storage")
const {
	getItems,
	getItem,
	deleteItems,
	createItems,
} = require("../controllers/storage");
/**
 * lista de items
 */
router.get("/", getItems);

/**
 * detalle de item
 */
router.get("/:id", validatorGetItem, getItem);

/**
 * Eliminar item
 */
router.delete("/:id", validatorGetItem, deleteItems);

/**
 * crear item
 */
router.post("/", uploadMiddleware.single("myfyle"), createItems);

module.exports = router;

