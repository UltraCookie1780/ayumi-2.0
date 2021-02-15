const { dbpass, dbuser } = require('../config.json');
const waifus = require('./waifus.json');

const Sequelize = require('sequelize');
const sequelize = new Sequelize(dbuser, dbuser, dbpass, {
	host: 'localhost',
	dialect: 'postgres',
	logging: false
});

const database = require('../models/Waifus')(sequelize, Sequelize.DataTypes);
require('../models/Users')(sequelize, Sequelize.DataTypes);
require('../models/UserWaifus')(sequelize, Sequelize.DataTypes);

const force = process.argv.includes('--force') || process.argv.includes('-f');

sequelize.sync({ force }).then(async () => {
	for (i in waifus.pages) {
        await database.upsert({ url: `${waifus.pages[i].url}`});
    }
	console.log('Database synced');
	sequelize.close();
}).catch(console.log);