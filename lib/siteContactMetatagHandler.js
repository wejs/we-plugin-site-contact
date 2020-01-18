const setCanonicalURL = require('./setCanonicalURL.js');

module.exports = function siteContactTitlehandler(req, res, next) {
  const we = req.we;

  if (we.systemSettings && we.systemSettings.siteContactTitle) {
    res.locals.title = we.systemSettings.siteContactTitle;
  }

  const siteName = (we.systemSettings.siteName || we.config.appName);
  const hostname = we.config.hostname;

  res.locals.metatag +=
    '<meta property="og:url" content="'+hostname+req.urlBeforeAlias+'" />'+
    '<meta property="og:title" content="'+res.locals.title+'" />' +
    '<meta property="og:site_name" content="'+siteName+'" />'+
    '<meta property="og:type" content="article" />'+
    '<meta content="'+siteName+'" itemprop="name">';

  setCanonicalURL(req, res);

  let description = '';

  if (
    we.systemSettings &&
    we.systemSettings.siteContactDescription
  ) {
    description = we.systemSettings.siteContactDescription;
  } else if (
    we.systemSettings &&
    we.systemSettings.siteDescription
  ) {
    const description = we.utils.stripTagsAndTruncate (
      we.systemSettings.siteDescription, 200
    );
    res.locals.metatag += '<meta property="og:description" content="'+
      description+
    '" />';
    res.locals.metatag += '<meta content="'+description+'" name="description">';
    res.locals.metatag += '<meta content="'+description+'" name="twitter:description">';
  }

  let imgURL = '';
  let imgWidth = '1200';
  let imgHeight = '630';

  if (
    we.systemSettings &&
    we.systemSettings.ogImageUrlOriginal
  ) {
    const imageUrl = we.systemSettings.ogImageUrlOriginal;

    imgURL = hostname+imageUrl;

    res.locals.metatag +=
      '<meta property="og:image" content="'+hostname+imageUrl+'" />';
  }

  // add google pagemap
  res.locals.metatag += `<!--
  <PageMap>
     <DataObject type="document">
        <Attribute name="title">${res.locals.title}</Attribute>
        <Attribute name="description">${description}</Attribute>
     </DataObject>
     <DataObject type="thumbnail">
        <Attribute name="src" value="${imgURL}" />
        <Attribute name="height" value="${imgHeight}" />
        <Attribute name="width" value="${imgWidth}" />
     </DataObject>
  </PageMap>
  -->`;

  next();
}
