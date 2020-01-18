function selectContactFormMD(req, res, next) {
  const we = req.we;
  const Op = we.Op;

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

    next();
  })
  .catch(next);
}

module.exports = selectContactFormMD;