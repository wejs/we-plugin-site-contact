module.exports = {
  create(req, res, done) {
    if (!res.locals.template) res.locals.template = res.locals.model + '/' + 'create';

    if (!res.locals.data) res.locals.data = {};

    const we = req.we;
    const plugin = we.plugins['we-plugin-site-contact'];

    if (req.query.form) {
      req.query.form = Number(req.query.form);
    }

    plugin.selectContactFormMD(req, res, (err)=> {
      if (err) {
        res.queryError(err);
        return null;
      }

      if (req.method === 'POST') {
        if (!req.ip) {
          res.badRequest();
          return null;
        }
        req.body.ip = req.ip;

        req.we.antiSpam.recaptcha.verify(req, res, function afterCheckSpam(err, isSpam) {
          if (err) return done(err);

          if (isSpam) {
            req.we.log.warn('cfmessage.create: spambot found in recaptcha verify: ', req.ip, req.body.email);

            res.addMessage('warning', {
              text: 'auth.register.spam',
              vars: { email: req.body.email }
            });

            return res.queryError();
          }

          if (req.isAuthenticated()) req.body.creatorId = req.user.id;

          res.locals.messageSend = false;
          // set temp record for use in validation errors

          req.we.utils._.merge(res.locals.record, req.body);

          res.locals.Model.create(req.body)
          .then( (record)=> {
            res.locals.data = record;
            res.locals.messageSend = true;

            let appName = we.config.appName;

            if (we.systemSettings && we.systemSettings.siteName) {
              appName = we.systemSettings.siteName;
            }

            const templateVariables = {
              name: record.name,
              email: record.email,
              phone: record.phone,
              message: record.message,
              ip: record.ip,
              siteName: appName,
              siteUrl: we.config.hostname
            };

            if (!we.config.email.mailOptions.from) {
              we.log.warn('we.config.email.emailOptions.from is required to send a sitecontact email.');
              res.created(record);
              return null;
            }

            // send the emails in async

            // reply to institucional
            let emailContact = we.config.email.mailOptions.from;

            if (we.systemSettings && we.systemSettings.emailContact) {
              emailContact = we.systemSettings.emailContact;
            }

            if (res.locals.selectedForm.contactWithEmail) {
              emailContact = res.locals.selectedForm.contactWithEmail;
            }

            we.email.sendEmail('siteContactSuccess', {
              email: record.email,
              replyTo: emailContact
            }, templateVariables, function (err) {
              if (err) {
                we.log.error('sitecontact:create:sendEmail:SiteContactSuccess:', err);
              }
            });

            we.email.sendEmail('siteContact', {
              email: record.email,
              subject: res.locals.selectedForm.subject,
              to: emailContact,
              replyTo: record.name + ' <' + record.email + '>'
            }, templateVariables, (err)=> {
              if (err) {
                we.log.error('sitecontact:create:sendEmail:SiteContact:', err);
              }
            });

            res.addMessage('success', {
              text: 'sitecontact.send.email',
              vars: { email: record.email }
            }, {
              email: record.email
            });

            res.goTo('/site-contact');
            return null;
          })
          .catch(res.queryError);
        }); // end capcha check
      } else {
        we.controllers.sitecontact.createPage(req, res, done);
      }

      return null;

    });
  },

  createPage(req, res) {
    res.locals.data = {};
    // if user is authenticated, preload its name and email:
    if (req.isAuthenticated()) {
      res.locals.data.name = req.user.displayName;
      res.locals.data.email = req.user.email;
    }

    res.status(200);
    res.ok();
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