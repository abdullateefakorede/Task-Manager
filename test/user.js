const request = require('supertest');
const app = require('../index');
const expect = require('chai').expect;
let Token;

describe('User Test', () => {

    describe("SignIn API", function() {
        it("Success If Authorized", function(done) {
            request(app)
                .post('/user/signin')
                .set('Accept', 'application/json')
                .set('Content-Type', 'application/json')
                .send({ username: 'Kobo360', password: 'Kobo3602019@' })
                .expect(200)
                .expect('Content-Type', /json/)
                .expect(function(response) {
                    expect(response.body).not.to.be.empty;
                    expect(response.body).to.be.an('object');
                    expect(response.body.data.token).not.to.be.empty;
                })
                .end((err, response) => {
                    Token = response.body.data.token
                    done();
                });
        });
    });

    describe("SignUp API", function() {
        it("Success if details are validated", function(done) {
            request(app)
                .post('/user/signup')
                .set('Accept', 'application/json')
                .set('Content-Type', 'application/json')
                .send({ username: 'Kobo369', password: 'Kobo3602019@', name: "Kobo", birthdate: "12-3-2019", nationality: "Nigerian" })
                .expect(200)
                .expect('Content-Type', /json/)
                .expect(function(response) {
                    expect(response.body).not.to.be.empty;
                    expect(response.body).to.be.an('object');

                })
                .end(done);
        });
    });

})