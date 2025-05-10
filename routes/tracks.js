const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/session");
const checkRol = require("../middleware/rol");
const {
	getItems,
	getItem,
	createItems,
	updateItems,
	deleteItems,
} = require("../controllers/tracks");
const {
	validatorCreateItems,
	validatorGetItem,
} = require("../validators/tracks");
/**
 * listar los items
 */
router.get("/", authMiddleware, getItems);
/**
 * obtener detalle de item
 */
router.get("/:id", authMiddleware, validatorGetItem, getItem);
/**
 * crear un registro
 */
router.post(
	"/",
	authMiddleware,
	checkRol(["admin"]),
	validatorCreateItems,
	createItems
);

/**
 * actualizar un registro
 */
router.put(
	"/:id",
	authMiddleware,
	validatorGetItem,
	validatorCreateItems,
	updateItems
);

/**
 * obtener detalle de item
 */
router.delete("/:id", authMiddleware, validatorGetItem, deleteItems);

module.exports = router;
