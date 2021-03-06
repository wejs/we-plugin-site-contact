/**
 * We.js messenger plugin config
 */

module.exports = function loadPlugin(projectPath, Plugin) {
  const plugin = new Plugin(__dirname);

  // set plugin configs
  plugin.setConfigs({
    enableCustomSiteContactSubject: false,
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
        defaultSubject: `Nova mensagem de contato no site {{siteName}}`,
        defaultHTML: `<p>O site {{siteName}} acaba de receber uma nova mensagem de contato:</p>
<p>{{message}}<br /><br />Enviada por:<br />Nome: {{name}}<br />Email {{email}}<br />Telefone {{phone}}<br /><br /></p>
<p>Atenciosamente,<br />{{siteName}}<br />{{siteUrl}}</p>`,
        defaultText: `O site {{siteName}} acaba de receber uma nova mensagem de contato:

{{message}}

Enviada por:
Nome: {{name}}
Email {{email}}
Telefone {{phone}}


Atenciosamente,
{{siteName}}
{{siteUrl}}`,
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
        defaultSubject: `Mensagem enviada com sucesso {{siteName}}`,
        defaultHTML: `<p>Obrigado por entrar em contato com o site {{siteName}}.</p>
<p>Sua mensagem foi recebida e ser&aacute; analisada pela nossa equipe em breve.<br /><br /></p>
<p>Atenciosamente,<br />{{siteName}}<br />{{siteUrl}}</p>`,
        defaultText: `Obrigado por entrar em contato com o site {{siteName}}.

Sua mensagem foi recebida e será analisada pela nossa equipe em breve.

Atenciosamente,
{{siteName}}
{{siteUrl}}`,
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

  plugin.siteContactTitlehandler = require('./lib/siteContactTitlehandler.js');
  plugin.siteContactMetatagHandler = require('./lib/siteContactMetatagHandler.js');

  plugin.setRoutes({
    // contact form:
    'get /site-contact': {
      controller    : 'sitecontact',
      action        : 'create',
      model         : 'sitecontact',
      permission    : 'create_contact_message',
      titleHandler: plugin.siteContactTitlehandler,
      metatagHandler: plugin.siteContactMetatagHandler
      // permission    : true
    },
    'post /site-contact': {
      controller    : 'sitecontact',
      action        : 'create',
      model         : 'sitecontact',
      permission    : 'create_contact_message',
      titleHandler  : plugin.siteContactTitlehandler,
      metatagHandler: plugin.siteContactMetatagHandler
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