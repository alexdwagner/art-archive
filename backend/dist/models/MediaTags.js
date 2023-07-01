"use strict";
module.exports = (sequelize, Sequelize) => {
    const MediaTags = sequelize.define('MediaTags', {
        mediaId: {
            type: Sequelize.INTEGER,
            allowNull: false,
            references: {
                model: 'Media',
                key: 'id',
            }
        },
        tagId: {
            type: Sequelize.INTEGER,
            allowNull: false,
            references: {
                model: 'Tag',
                key: 'id',
            }
        },
    }, {
        freezeTableName: true // This disables table name changes.
    });
    return MediaTags;
};
//# sourceMappingURL=MediaTags.js.map