function selectContactFormMD(req, res, next) {
  const we = req.we;

  if (req.query.form) {
    req.query.form = Number(req.query.form);
  }

  we.db.models['sitecontact-form']
  .findAll({
    where: {
      publishedAt: {
        $or: {
          $eq: null,
          $lte: new Date()
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

    next();
    return null;
  })
  .catch(next);
}

module.exports = selectContactFormMD;