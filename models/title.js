module.exports = function (sequelize, DataTypes) {
  const Title = sequelize.define('Title', {
    // Giving the Author model a name of type STRING
    name: DataTypes.STRING,
    poster: DataTypes.STRING,
    year: DataTypes.INTEGER,
  });

  Title.associate = function (models) {
    // Associating Author with Posts
    // When an Author is deleted, also delete any associated Posts
    Title.hasMany(models.Review, {
      onDelete: 'cascade',
    });
  };

  return Title;
};
