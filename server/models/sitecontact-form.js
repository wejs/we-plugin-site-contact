/**
 * Site contact form model
 */
module.exports = function sitecontactFormModel(we) {
  const model = {
    definition: {
      subject: {
        type: we.db.Sequelize.TEXT,
        allowNull: false
      },
      contactWithEmail: {
        type: we.db.Sequelize.TEXT,
        allowNull: false,
        skipSanitizer: true
      },
      emailBody: {
        type: we.db.Sequelize.TEXT,
        allowNull: true
      },
      successEmailBodyTemplate: {
        type: we.db.Sequelize.TEXT,
        allowNull: true
      },
      publishedAt: {
        type: we.db.Sequelize.DATE,
        allowNull: true
      }
    },
    associations: {},
    options: {
      classMethods: {}
    }
  }
  return model;
}
