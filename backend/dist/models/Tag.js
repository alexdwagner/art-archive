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
    });
    Tag.associate = function (models) {
        Tag.belongsToMany(models.Media, { through: 'MediaTags' });
    };
    return Tag;
};
