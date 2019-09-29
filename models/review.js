module.exports = function (sequelize, DataTypes) {
  const Review = sequelize.define('Review', {
    review_body: {
      type: DataTypes.TEXT,
      allowNull: false,
      len: [1],
    },
    rating: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  });

  Review.associate = function (models) {
    // We're saying that a Post should belong to an Author
    // A Post can't be created without an Author due to the foreign key constraint
    Review.belongsTo(models.User, {
      foreignKey: {
        allowNull: false,
      },
    });
    Review.belongsTo(models.Title, {
      foreignKey: {
        allowNull: false,
      },
    });
  };

  return Review;
};
