/**
 * Site contact model
 */
module.exports = function Model(we) {
  const model = {
    definition: {
      /**
       * User name
       */
      name: {
        type: we.db.Sequelize.STRING,
        allowNull: false
      },
      /**
       * Email
       */
      email: {
        type: we.db.Sequelize.STRING,
        allowNull: false,
        validate: {
          isEmail: true
        }
      },
      /**
       * Phone number
       */
      phone: {
        type: we.db.Sequelize.STRING,
        allowNull: true
      },
      /**
       * Room description
       */
      message: {
        type: we.db.Sequelize.TEXT,
        allowNull: false
      },
      /**
       * User IP
       */
      ip: {
        type: we.db.Sequelize.STRING,
        allowNull: false
      }
    },
    options: {}
  }
  return model;
}
