module.exports = (sequelize, DataTypes) => {
	return sequelize.define('user_waifus', {
		user_id: DataTypes.STRING,
		waifu_id: DataTypes.INTEGER,
	}, {
		timestamps: false,
	});
};