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