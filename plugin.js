/**
 * We.js messenger plugin config
 */

module.exports = function loadPlugin(projectPath, Plugin) {
  const plugin = new Plugin(__dirname);

  // set plugin configs
  plugin.setConfigs({
    permissions: {
      'create_contact_message': {
        'title': 'Create contact message',
        'description': ''
      },
      'manage_contact_message': {
        'title': 'Manage contact messages',
        'description': ''
      }
    },
    forms: {
      'sitecontact': __dirname + '/server/forms/sitecontact.json'
    },
    emailTypes: {
      siteContact: {
        label: 'Email de contato do site',
        templateVariables: {
          name: {
            example: 'Alberto Souza',
            description: 'Nome da pessoa ou organização que está entrando em contato'
          },
          phone: {
            example: '123456789',
            description: 'Telefone da pessoa ou organização'
          },
          email: {
            example: 'contact@linkysysytems.com',
            description: 'Email da pessoa ou organização que está entrando em contato'
          },
          message: {
            example: 'Example message',
            description: 'Mensagem da pessoa ou organização que está entrando em contato'
          },
          ip: {
            example: '0.0.0.0',
            description: 'IP da pessoa ou organização que está entrando em contato'
          },
          siteName: {
            example: 'Site Name',
            description: 'Nome deste site'
          },
          siteUrl: {
            example: '/#example',
            description: 'Endereço deste site'
          }
        }
      },
      siteContactSuccess: {
        label: 'Email de confirmação de envio do contato do site',
        templateVariables: {
          name: {
            description: 'Nome da pessoa ou organização que está entrando em contato'
          },
          phone: {
            description: 'Telefone da pessoa ou organização'
          },
          email: {
            description: 'Email da pessoa ou organização que está entrando em contato'
          },
          message: {
            description: 'Mensagem da pessoa ou organização que está entrando em contato'
          },
          ip: {
            description: 'IP da pessoa ou organização que está entrando em contato'
          },
          siteName: {
            description: 'Nome deste site'
          },
          siteUrl: {
            description: 'Endereço deste site'
          }
        }
      }
    }
  });

  // set plugin routes
  plugin.setRoutes({
    // contact form:
    'get /site-contact': {
      controller    : 'sitecontact',
      action        : 'create',
      model         : 'sitecontact',
      permission    : 'create_contact_message'
      // permission    : true
    },
    'post /site-contact': {
      controller    : 'sitecontact',
      action        : 'create',
      model         : 'sitecontact',
      permission    : 'create_contact_message'
    },
    'get /widget/contact-form': {
      controller    : 'sitecontact',
      model         : 'sitecontact',
      action        : 'contactIframe',
      // /permission    : true
    }
  });

  plugin.selectContactFormMD = require('./lib/selectContactFormMD');

  plugin.sendContactEmail = function sendContactEmail() {

  };

  plugin.sendContactEmailWithSubject = function sendContactEmailWithSubject() {

  };


  plugin.setResource({ name: 'sitecontact' });
  plugin.setResource({ name: 'sitecontact-form' });

  return plugin;
};