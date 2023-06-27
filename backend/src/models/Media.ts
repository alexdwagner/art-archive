module.exports = (sequelize, Sequelize) => {
  const Media = sequelize.define('Media', {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      allowNull: true,
      primaryKey: true
    },
    name: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    description: {
      type: Sequelize.TEXT,
      allowNull: true,
    },
    url: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    size: {
      type: Sequelize.BIGINT,
      allowNull: false,
    },
    type: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    createdAt: {
      type: Sequelize.DATE,
      allowNull: false,
    },
    userId: {
      type: Sequelize.INTEGER,
      allowNull: true,
      references: {
        model: 'users',
        key: 'id',
      }
    },
  }, {
    freezeTableName: true // This disables table name changes.
  });

  Media.associate = function(models) {
    Media.belongsToMany(models.Tag, { through: 'MediaTags' });
  };

  return Media;
};
