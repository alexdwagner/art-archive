module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    }
  }, {
    freezeTableName: true // This disables table name changes.
  });

  User.associate = function(models) {
    User.hasMany(models.Media, {
      foreignKey: 'userId',
      as: 'medias',
    });
  };

  return User;
};
