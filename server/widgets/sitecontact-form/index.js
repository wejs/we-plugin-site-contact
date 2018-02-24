/**
 * Widget sitecontact-form main file
 */

module.exports = function (projectPath, Widget) {
  const widget = new Widget('sitecontact-form', __dirname);

  // // Override default widget class functions after instance
  //
  // widget.beforeSave = function widgetBeforeSave(req, res, next) {
  //   // do something after save this widget in create or edit ...
  //   return next();
  // };

  // // form middleware, use for get data for widget form
  // widget.formMiddleware = function formMiddleware(req, res, next) {
  //
  //   next();
  // }

  // // Widget view middleware, use for get data after render the widget html
  widget.viewMiddleware = function viewMiddleware(w, req, res, next) {
    const we = req.we;
    const Op = we.Op;

    if (!w.data) w.data = {};

    if (res.locals.contactForms)

    if (req.query.form) {
      req.query.form = Number(req.query.form);
    }

    we.db.models['sitecontact-form']
    .findAll({
      where: {
        publishedAt: {
          [Op.or]: {
            [Op.eq]: null,
            [Op.lte]: new Date()
          }
        }
      }
    })
    .then( (contactForms)=> {
      res.locals.contactForms = contactForms;
      res.locals.selectedForm = {};

      if (
        res.locals.contactForms &&
        res.locals.contactForms.length &&
        req.body.subject
      ) {
        for (let i = 0; i < contactForms.length; i++) {
          if (contactForms[i].id == req.body.subject) {
            res.locals.selectedForm = contactForms[i];
            break;
          }
        }
      }

      // if user is authenticated, preload its name and email:
      if (req.isAuthenticated()) {
        w.data.name = req.user.displayName;
        w.data.email = req.user.email;
      }

      next();
      return null;
    })
    .catch(next);
  }

  return widget;
};