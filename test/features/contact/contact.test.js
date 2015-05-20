var assert = require('assert');
var request = require('supertest');
var testTools = require('we-test-tools');
var async = require('async');
var _ = require('lodash');
var http;
var we;
var agent;

describe('contactFeature', function() {
  var salvedUser, salvedUserPassword, authenticatedRequest, authToken;

  before(function (done) {
    http = testTools.helpers.getHttp();
    agent = request.agent(http);

    we = testTools.helpers.getWe();
    we.config.acl.disabled = true;

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
    it ('post /sitecontact with json request should create one register and send contact email', function (done) {
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
      .expect(201)
      .end(function (err, res) {
        if (err) throw err;
        assert(res.body.sitecontact);
        assert(res.body.sitecontact[0].id);
        done();
      });
    });

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