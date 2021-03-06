/**
 * Site contact model
 */
module.exports = function sitecontactModel(we) {
  const model = {
    definition: {
      /**
       * Contact sender user name
       */
      name: {
        type: we.db.Sequelize.STRING,
        allowNull: false
      },

      /**
       * Contact sender id, set if the message was created by authenticated user
       * @type {Object}
       */
      creatorId: {
        type: we.db.Sequelize.BIGINT,
        formFieldType: null
      },

      /**
       * Contact sender email
       */
      email: {
        type: we.db.Sequelize.STRING,
        formFieldType: 'email',
        allowNull: false,
        validate: { isEmail: true }
      },
      /**
       * Contact sender phone number
       */
      phone: {
        type: we.db.Sequelize.STRING,
        allowNull: true
      },
      /**
       * Contact message
       */
      message: {
        type: we.db.Sequelize.TEXT,
        formFieldType: 'textarea',
        formFieldAttributes: {
          rows: 6
        },
        allowNull: false
      },
      /**
       * Message subject
       */
      customSubject: {
        type: we.db.Sequelize.STRING(1500),
        allowNull: true,
        set(v) {
          if (!v || !v.length) {
            this.setDataValue('customSubject', null);
          } else if(v.length) {
            if (v.length >= 1500) {
              this.setDataValue('customSubject', v.substring(0, 1499));
            } else {
              this.setDataValue('customSubject', v);
            }
          }
        }
      },

      /**
       * Message status,
       * @type {Object}
       */
      status: {
        type: we.db.Sequelize.STRING,
        defaultValue: 'opened',
        formFieldType: null,
      },
      /**
       * Message status class, usefull for print status in admin
       *
       * @type {Object}
       */
      statusClass: {
        type: we.db.Sequelize.VIRTUAL,
        formFieldType: null,
        get: function() {
          if (this.getDataValue('status') == 'opened') {
            return 'danger'
          } else if(this.getDataValue('status') == 'closed'){
            return 'success'
          }

          return '';
        }
      },
      /**
       * User IP
       */
      ip: {
        type: we.db.Sequelize.STRING,
        allowNull: false
      }
    },

    associations: {
      form: {
        type: 'belongsTo',
        model: 'sitecontact-form'
      }
    },

    options: {
      classMethods: {}
    }
  };
  return model;
};
