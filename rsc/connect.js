const { dbpass, dbuser } = require('../config.json');

const Sequelize = require('sequelize');
const sequelize = new Sequelize(dbuser, dbuser, dbpass, {
	host: 'localhost',
	dialect: 'postgres',
	logging: false
});

const Users = require('../models/Users')(sequelize, Sequelize.DataTypes);
const Waifus = require('../models/Waifus')(sequelize, Sequelize.DataTypes);
const UserWaifus = require('../models/UserWaifus')(sequelize, Sequelize.DataTypes);

UserWaifus.belongsTo(Waifus, { foreignKey: 'waifu_id', as: 'waifu' });

/* eslint-disable-next-line func-names */
Users.prototype.addWaifu = async function(waifu) {
	const userWaifu = await UserWaifus.findOne({
		where: { user_id: this.user_id, waifu_id: waifu.id },
	});

	if (userWaifu) {
		return await userWaifu.save();
	}

	return await UserWaifus.create({ user_id: this.user_id, waifu_id: waifu.id });
};

/* eslint-disable-next-line func-names */
Users.prototype.delWaifu = async function(waifu) {
	const userWaifu = await UserWaifus.findOne({ where: { user_id: this.user_id, waifu_id: waifu.id }});
	if (!userWaifu) {
		return await userWaifu.save();
	}
	return await UserWaifus.destroy({ where: { user_id: this.user_id, waifu_id: waifu.id }});
}

/* eslint-disable-next-line func-names */
Users.prototype.getWaifus = function() {
	return UserWaifus.findAndCountAll({
		where: { user_id: this.user_id },
		include: ['waifu'],
	});
};

module.exports = { Users, Waifus, UserWaifus };