const { Model, DataTypes } = require("sequelize");

// Definirea primei entitati
// entitatea lista favorite
module.exports = (sequelize, DataTypes) => {
    class FavouriteList extends Model {
        // definirea relatiei dintre cele doua entitati - one to many
        static associate(models) {
            // o lista are mai multe videouri
            models.FavouriteList.hasMany(models.Video);
        }
    }
    FavouriteList.init(
        {
            id: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true

            },
            description: DataTypes.STRING,
            creationDate: DataTypes.DATE,
        },
        {
            sequelize,
            modelName: "FavouriteList",
        }
    );
    return FavouriteList;
};
