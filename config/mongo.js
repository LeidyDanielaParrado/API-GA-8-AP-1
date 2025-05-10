const mongoose = require("mongoose");

const dbConnectNoSql = async () => {
	try {
		await mongoose.connect(process.env.DB_URI, {});
		console.log("***** CONEXION CORRECTA *****");
	} catch (err) {
		console.error("***** ERROR DE CONEXION *****", err);
	}
};

module.exports = dbConnectNoSql;
