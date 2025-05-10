const {handleHttpError} = require("../utils/handleError");
const {verifyToken} = require("../utils/handleJwt");
const {usersModel} = require("../models");
const getProperties = require("../utils/handlePropertiesEngine");
const propertiesKey = getProperties();

const authMiddleware = async (req, res, next) => {
	try {
		if (!req.headers.authorization) {
			handleHttpError(res, "NEED_SESSION");
			return;
		}

		const token = req.headers.authorization;
		const dataToken = await verifyToken(token);

		if (!dataToken) {
			handleHttpError(res, "NOT_PAYLOAD_DATA", 401);
			return;
		}

		const query = {
			[propertiesKey.id]: dataToken[propertiesKey.id],
		};

		const user = await usersModel.findOne(query);
		req.user = user;

		next();
	} catch (e) {
		console.log(e);
		handleHttpError(res, "ERROR_NO_SESSION", 401);
	}
};

module.exports = authMiddleware;
