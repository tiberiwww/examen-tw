const { Model, DataTypes } = require("sequelize");

// Definirea celei de-a doua entitati
// entitatea video
module.exports = (sequelize, DataTypes) => {
    class Video extends Model {
        static associate(models) {
            // definirea relatiei dintre cele doua entitati - one to many
            models.Video.belongsTo(models.FavouriteList, {
                // un film apartine unei liste
                foreignKey: "listId",
            });
        }
    }
    Video.init(
        {
            id: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true,
            },
            description: DataTypes.STRING,
            title: DataTypes.STRING,
            url: DataTypes.STRING,
            listId: DataTypes.INTEGER,
        },
        {
            sequelize,
            modelName: "Video",
        }
    );
    return Video;
};
