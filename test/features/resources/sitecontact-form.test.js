const assert = require('assert'),
  request = require('supertest'),
  helpers = require('we-test-tools').helpers,
  stubs = require('we-test-tools').stubs;

let _, http, we;

describe('sitecontact-formFeature', function () {
  let salvedUser, salvedUserPassword;
  let authenticatedRequest;

  before(function (done) {
    http = helpers.getHttp();
    we = helpers.getWe();

    _ = we.utils._;

    let userStub = stubs.userStub();
    helpers.createUser(userStub, function(err, user) {
      if (err) throw err;

      salvedUser = user;
      salvedUserPassword = userStub.password;

      // login user and save the browser
      authenticatedRequest = request.agent(http);
      authenticatedRequest.post('/login')
      .set('Accept', 'application/json')
      .send({
        email: salvedUser.email,
        password: salvedUserPassword
      })
      .expect(200)
      .set('Accept', 'application/json')
      .end(function (err) {
        if (err) throw err;

        done();
      });

    });
  });

  describe('find', function () {
    it('get /sitecontact-form route should find one sitecontact-form', function(done){
      request(http)
      .get('/sitecontact-form')
      .set('Accept', 'application/json')
      .end(function (err, res) {
        assert.equal(200, res.status);
        assert(res.body['sitecontact-form']);
        assert( _.isArray(res.body['sitecontact-form']) , 'sitecontact-form not is array');
        assert(res.body.meta);

        done();
      });
    });
  });
  describe('create', function () {
    it('post /sitecontact-form create one sitecontact-form record');
  });
  describe('findOne', function () {
    it('get /sitecontact-form/:id should return one sitecontact-form');
  });
  describe('update', function () {
    it('put /sitecontact-form/:id should upate and return sitecontact-form');
  });
  describe('destroy', function () {
    it('delete /sitecontact-form/:id should delete one sitecontact-form')
  });
});
