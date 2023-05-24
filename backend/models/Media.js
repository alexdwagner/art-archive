const Media = sequelize.define('Media', {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true
    },
    title: {
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
    userId: {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: 'users', // 'users' refers to table name
        key: 'id', // 'id' refers to column name in users table
      }
    },
    viewCount: {
      type: Sequelize.INTEGER,
      allowNull: false,
      defaultValue: 0
    },
    likeCount: {
      type: Sequelize.INTEGER,
      allowNull: false,
      defaultValue: 0
    },
    dislikeCount: {
      type: Sequelize.INTEGER,
      allowNull: false,
      defaultValue: 0
    },
    commentCount: {
      type: Sequelize.INTEGER,
      allowNull: false,
      defaultValue: 0
    }
  });
  