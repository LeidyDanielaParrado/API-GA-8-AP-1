const fs = require("fs");
const {matchedData} = require("express-validator");
const {StorageModel} = require("../models");
const {handleHttpError} = require("../utils/handleError");
const storage = require("../models/nosql/storage");

const PUBLIC_URL = process.env.PUBLIC_URL;
const MEDIA_PATH = `${__dirname}/../storage`;

/**
 *
 * @param {*} req
 * @param {*} res
 */
const getItems = async (req, res) => {
	try {
		const data = await StorageModel.find({});
		res.send({data});
	} catch (e) {
		handleHttpError(res, "ERROR_LIST_ITEMS");
	}
};
/**
 *
 * @param {*} req
 * @param {*} res
 */
const getItem = async (req, res) => {
	try {
		const {id} = matchedData(req);
		const data = await StorageModel.findById(id);
		res.send({data});
	} catch (e) {
		handleHttpError(res, "ERROR_DETAIL_ITEM");
	}
};
/**
 *
 * @param {*} req
 * @param {*} res
 */
const createItems = async (req, res) => {
	try {
		const {file} = req;
		console.log(file);
		const fileData = {
			filename: file.filename,
			url: `${PUBLIC_URL}/${file.filename}`,
		};
		const data = await StorageModel.create(fileData);
		res.send({data});
	} catch (e) {
		handleHttpError(res, "ERROR_CREATE_ITEM");
	}
};

/**
 *
 * @param {*} req
 * @param {*} res
 */
const deleteItems = async (req, res) => {
	try {
		const {id} = matchedData(req);
		const dataFile = await StorageModel.findById(id);
		await StorageModel.delete({_id: id});
		const {filename} = dataFile;
		const filePath = `${MEDIA_PATH}/${filename}`;

		fs.unlinkSync(filePath);
		const data = {
			filePath,
			deleted: 1,
		};
		res.send({data});
	} catch (e) {
		handleHttpError(res, "ERROR_DELETE_ITEM");
	}
};

module.exports = {getItems, getItem, createItems, deleteItems};
