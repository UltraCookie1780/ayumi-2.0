module.exports = (sequelize, DataTypes) => {
	return sequelize.define('waifus', {
		url: {
			type: DataTypes.TEXT,
			unique: true,
		},
	}, {
		timestamps: false,
	});
};