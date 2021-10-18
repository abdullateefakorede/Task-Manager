const request = require('supertest');
const app = require('../index');
const expect = require('chai').expect;
let Token;

describe('User Test', () => {

    describe("SignIn API", function() {
        it("SignIn with Valid details", function(done) {
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
                    expect(response.body.success).to.be.equal(true);
                    expect(response.body.data.token).not.to.be.empty;
                    Token = response.body.data.token
                })
                .end(done);
        });

        it("SignIn with Invalid Details", function(done) {
            request(app)
                .post('/user/signin')
                .set('Accept', 'application/json')
                .set('Content-Type', 'application/json')
                .send({ username: 'Kobo360', password: 'Kobo360219@' })
                .expect(401)
                .expect('Content-Type', /json/)
                .expect(function(response) {
                    expect(response.body).not.to.be.empty;
                    expect(response.body).to.be.an('object');
                    expect(response.body.success).to.be.equal(false);
                })
                .end(done);
        });
    });

    describe("SignUp API", function() {
        it("SignUp with a valid details", function(done) {
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
                    expect(response.body.success).to.be.equal(true);
                })
                .end(done);
        });

        it("SignUp with Invalid Details", function(done) {
            request(app)
                .post('/user/signup')
                .set('Accept', 'application/json')
                .set('Content-Type', 'application/json')
                .send({ username: '', password: 'Kobo3602019@', birthdate: "12-3-2019", nationality: "Nigerian" })
                .expect(400)
                .expect('Content-Type', /json/)
                .expect(function(response) {
                    expect(response.body).not.to.be.empty;
                    expect(response.body.success).to.be.equal(false);
                    expect(response.body).to.be.an('object');

                })
                .end(done);
        });
    });

})