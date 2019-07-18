module.exports = function siteContactTitlehandler(req, res, next) {
  const we = req.we;

  if (we.systemSettings && we.systemSettings.siteContactTitle) {
    res.locals.title = we.systemSettings.siteContactTitle;
  }

  next();
}
