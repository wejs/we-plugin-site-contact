module.exports = {
  create(req, res) {
    const we = req.we;

    if (!req.ip) return res.badRequest();

    req.body.ip = req.ip;

    res.locals.Model.create(req.body)
    .then( (record)=> {

      const templateVariables = {
        record: record,
        site: {
          name: we.config.appName
        }
      };

      if (!we.config.email.mailOptions.from) {
        we.log.warn('we.config.email.emailOptions.from is required to send a sitecontact email.');
        return res.created(record);
      }

      const options = {
        subject: req.__('we.email.sitecontact.subject', templateVariables),
        to: we.config.email.mailOptions.from,
        from: record.name + ' <' + record.email + '>'
      };

      return we.email.sendEmail('SiteContact', options, templateVariables, (err)=> {
        if (err) {
          we.log.error('sitecontact:create SiteContact:', err);
          return res.serverError();
        }

        res.addMessage('warning', {
          text: 'sitecontact.send.email',
          vars: {
            email: record.email
          }
        }, {
          email: record.email
        });

        return res.created(record);
      });
    })
    .catch(res.queryError);
  },

  /**
   * Site contact iframe action
   * Send the contact iframe page to be used inside one iframe
   *
   * @param  {Object} req  express.js request
   * @param  {Object} res  express.js response
   */
  contactIframe(req, res) {
    const we = req.we;

    if (!req.user || !req.user.toJSON) {
      res.locals.currentUserJsonRecord = JSON.stringify(req.user);
    } else {
      res.locals.currentUserJsonRecord = JSON.stringify(req.user.toJSON());
    }

    res.locals.showTitle = req.query.showTitle === 'true';

    res.locals.height = Number(req.query.height) || 300;

    res.locals.isAuthenticated = req.isAuthenticated();

    if (req.user && req.user.language) {
      res.locals.locale = req.user.language;
    } else {
      res.locals.locale = we.config.i18n.defaultLocale;
    }

    res.locals.layout = false;
    res.locals.template = 'contact-form';

    res.view();
  }
};