module.exports = (sequelize, DataTypes) => {
	return sequelize.define('servers', {
		server_id: {
			type: DataTypes.STRING,
			primaryKey: true,
		},
		messages: {
			type: DataTypes.INTEGER,
			defaultValue: 0,
			allowNull: false,
		},
        verified: {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
        }
	}, {
		timestamps: false,
	});
};