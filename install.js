module.exports = {
  /**
   * Return a list of updates
   *
   * @param  {Object} we we.js object
   * @return {Array}    a list of update objects
   */
  updates() {
    return [{
      version: '1.4.1',
      update(we, done) {
        const sql = 'ALTER TABLE `sitecontacts` '+
          ' ADD COLUMN `formId` VARCHAR(200) NULL DEFAULT NULL;';
        we.db.defaultConnection
        .query(sql)
        .then( ()=> {
          done();
          return null;
        })
        .catch( (err)=> {
          we.log.warn(err);
          done();
        });
      }
    }, {
      version: '2.1.0',
      update(we, done) {
        const sql = 'ALTER TABLE `sitecontacts` '+
          ' ADD COLUMN `customSubject` VARCHAR(1500) NULL DEFAULT NULL;';
        we.db.defaultConnection
        .query(sql)
        .then( ()=> {
          done();
        })
        .catch( (err)=> {
          we.log.warn('we-plugin-contact:update:Error on alter sitecontacts table', err);
          done();
        });
      }
    }];
  }
};
