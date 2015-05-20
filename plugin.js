/**
 * We.js messenger plugin config
 */

module.exports = function loadPlugin(projectPath, Plugin) {
  var plugin = new Plugin(__dirname);

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
    }
  });

  // ser plugin routes
  plugin.setRoutes({
    'get /sitecontact': {
      controller    : 'sitecontact',
      action        : 'find',
      model         : 'sitecontact',
      permission    : 'manage_contact_message'
    },
    'get /sitecontact/:id([0-9]+)': {
      controller    : 'sitecontact',
      model         : 'sitecontact',
      action        : 'findOne',
      permission    : 'manage_contact_message'
    },
    'post /sitecontact': {
      controller    : 'sitecontact',
      action        : 'create',
      model         : 'sitecontact',
      //permission    : true
    },
    'put /sitecontact/:id([0-9]+)': {
      controller    : 'sitecontact',
      model         : 'sitecontact',
      action        : 'update',
      permission    : 'manage_contact_message'
    },
    'delete /sitecontact/:id([0-9]+)': {
      controller    : 'sitecontact',
      model         : 'sitecontact',
      action        : 'destroy',
      permission    : 'manage_contact_message'
    },

    'get /widget/contact-form': {
      controller    : 'sitecontact',
      model         : 'sitecontact',
      action        : 'contactIframe',
      // /permission    : true
    },

  });

  return plugin;
};