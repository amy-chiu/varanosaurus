//ITEM

var Sequelize = require('sequelize');

module.exports = {

	attributes: {

		description: {
			type: Sequelize.STRING,
			allowNull: false,
		},

		details: {
			type: Sequelize.TEXT,
			defaultValue: null,
		},

		bought: {
			type: Sequelize.BOOLEAN,
			defaultValue: false,
		},

		price: {
			type: Sequelize.DECIMAL(5, 2),
			// Do we want users to be able to add prices later, but require them for reckoning?
			// allowNull: false,
			defaultValue: 0.0,
		},

		timeBought: {
			type: Sequelize.DATE,
			defaultValue: null,
		},

		id: {
			type: Sequelize.INTEGER,
			primaryKey: true,
			autoIncrement: true,
		},

	},

	options: {},

};
