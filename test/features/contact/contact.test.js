const assert = require('assert'),
  request = require('supertest'),
  testTools = require('we-test-tools');

let _, async, http, we, agent;

describe('contactFeature', function() {
  let salvedUser, salvedUserPassword, authenticatedRequest, authToken;

  before(function (done) {
    http = testTools.helpers.getHttp();
    agent = request.agent(http);

    we = testTools.helpers.getWe();
    we.config.acl.disabled = true;

    _ = we.utils._;
    async = we.utils.async;

    we.config.email = {
      mailOptions: {
        from: 'test@example.com'
      }
    };

    async.parallel([
      function connectUser(done){
        testTools.helpers.createAndLoginUser(function (err, result) {
          if (err) return done(err);

          salvedUser = result.salvedUser;
          salvedUserPassword = result.salvedUserPassword;
          authenticatedRequest = result.authenticatedRequest;
          authToken = result.token;
          done();
        });
      }
    ], done);
  });

  describe('unAuthenticated', function() {
    it ('post /sitecontact with json request should create one record and send contact email', function (done) {
      var record = {
        name: 'Alberto Souza',
        email: 'alberto.souza.99@gmail.com',
        phone: '1222312213121',
        message: 'I whant contact you'
      };

      request(http)
      .post('/sitecontact')
      .send(record)
      .set('Accept', 'application/json')
      .expect(302)
      .end(function (err) {
        if (err) throw err;

        we.db.models.sitecontact
        .findOne({ where: record })
        .then( (r)=> {
          assert(r, 'Record should be salved in DB');
          done();
          return null;
        })
        .catch(done);


      });
    });

    // it ('post /sitecontact should send emails with custom subjects', function (done) {
    //   var record = {
    //     name: 'testes2',
    //     subject: '1',
    //     email: 'alberto.souza.99@gmail.com',
    //     phone: '21976434196',
    //     message: 'testes2',
    //     submit: 'save'
    //   };

    //   request(http)
    //   .post('/sitecontact')
    //   .send(record)
    //   .set('Accept', 'application/json')
    //   .expect(201)
    //   .end(function (err, res) {
    //     if (err) throw err;
    //     assert(res.body.sitecontact);
    //     assert(res.body.sitecontact[0].id);
    //     done();
    //   });
    // });

    // it ('post /sitecontact should create one register and send contact email', function (done) {
    //   var record = {
    //     name: 'Alberto Souza',
    //     email: 'alberto.souza.99@gmail.com',
    //     phone: '1222312213121',
    //     message: 'I whant contact you'
    //   };

    //   request(http)
    //   .post('/sitecontact')
    //   .send(record)
    //   //.set('Accept', 'application/json')
    //   .expect(201)
    //   .end(function (err, res) {
    //     we.log.info('response>', res.text);
    //     if (err) throw err;
    //     assert(res.body.sitecontact);

    //     done();
    //   });
    // });
  });

});