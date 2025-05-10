const bcryptjs = require("bcryptjs");

/**
 * Contraseña sin ecriptar
 * @param {*} passwordPlain
 */

const encrypt = async (passwordPlain) => {
	const hash = await bcryptjs.hash(passwordPlain, 10);
	return hash;
};

/**
 * pasar contraseña sin encriptar y contraaseña encriptada
 * @param {*} passwordPlain
 * @param {*} hashPassword
 */
const compare = async (passwordPlain, hashPassword) => {
	return await bcryptjs.compare(passwordPlain, hashPassword);
};

module.exports = {encrypt, compare};
