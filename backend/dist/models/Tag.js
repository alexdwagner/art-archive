"use strict";
module.exports = (sequelize, Sequelize) => {
    const Tag = sequelize.define('Tag', {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true
        },
        name: {
            type: Sequelize.STRING,
            allowNull: false,
        },
    }, {
        freezeTableName: true // This disables table name changes.
    });
    Tag.associate = function (models) {
        Tag.belongsToMany(models.Media, { through: 'MediaTags' });
    };
    return Tag;
};
//# sourceMappingURL=Tag.js.map