const {matchedData} = require("express-validator");
const {tracksModel} = require("../models");
const {handleHttpError} = require("../utils/handleError");
/**
 *
 * @param {*} req
 * @param {*} res
 */
const getItems = async (req, res) => {
	try {
		const user = req.user;
		const data = await tracksModel.findAllData({});
		res.send({data, user});
	} catch (e) {
		console.log(e)
		handleHttpError(res, "ERROR_GET_ITEMS");
	}
};
/**
 *
 * @param {*} req
 * @param {*} res
 */
const getItem = async (req, res) => {
	try {
		req = matchedData(req);
		const {id} = req;
		const data = await tracksModel.findOneData(id);
		res.send({data});
	} catch (e) {
		console.log(e)
		handleHttpError(res, "ERROR_GET_ITEM");
	}
};
/**
 *
 * @param {*} req
 * @param {*} res
 */
const createItems = async (req, res) => {
	try {
		const body = matchedData(req);
		const data = await tracksModel.create(body);
		res.send({data});
	} catch (e) {
		handleHttpError(res, "ERROR_CREATE_ITEMS");
	}
};
/**
 *
 * @param {*} req
 * @param {*} res
 */
const updateItems = async (req, res) => {
	try {
		const {id} = req.params;
		const data = await tracksModel.findByIdAndUpdate(id, req.body);
		res.send({data});
	} catch (e) {
		handleHttpError(res, "ERROR_UPDATE_ITEMS");
	}
};
/**
 *
 * @param {*} req
 * @param {*} res
 */
const deleteItems = async (req, res) => {
	try {
		req = matchedData(req);
		const {id} = req;
		const data = await tracksModel.delete({_id: id});
		res.send({data});
	} catch (e) {
		// console.log(e)
		handleHttpError(res, "ERROR_DELETE_ITEM");
	}
};

module.exports = {getItems, getItem, createItems, updateItems, deleteItems};
