'use strict'
const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class movie extends Model {}
  movie.init(
    {
      title: {
        type: DataTypes.STRING(100),
        unique: true,
      },
      overview: DataTypes.TEXT,
      posterPath: DataTypes.STRING(100),
    },
    {
      sequelize,
      modelName: 'movie',
    }
  )
  return movie
}
