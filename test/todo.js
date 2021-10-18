const request = require('supertest');
const app = require('../index');
const expect = require('chai').expect;
let Token;

describe('ToDo Test', () => {

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
                    Token = response.body.data.token

                })
                .end(done);
        });
    });

    describe("Get All User To-Do", function() {
        it("To-Do Fetching with valid token", function(done) {
            request(app)
                .get('/todos')
                .set('Accept', 'application/json')
                .set('Content-Type', 'application/json')
                .set({ Authorization: `Bearer ${Token}` })
                .expect(200)
                .expect('Content-Type', /json/)
                .expect(function(response) {
                    expect(response.body).not.to.be.empty;
                    expect(response.body.success).to.be.equal(true);
                    expect(response.body).to.be.an('object');
                })
                .end(done);
        });

        it("To-Do Fetching with Invalid token", function(done) {
            request(app)
                .get('/todos')
                .set('Accept', 'application/json')
                .set('Content-Type', 'application/json')
                .set({ Authorization: `Bearer dgdggdgdggdgdg332dcdcsjduy` })
                .expect(401)
                .expect('Content-Type', /json/)
                .expect(function(response) {
                    expect(response.body).not.to.be.empty;
                    expect(response.body.success).to.be.equal(false);
                    expect(response.body).to.be.an('object');
                })
                .end(done);
        });
    });

    describe("Create To-Do", function() {

        it("Create To-Do without valid token", function(done) {
            request(app)
                .post('/todos')
                .set('Accept', 'application/json')
                .set('Content-Type', 'application/json')
                .set({ Authorization: `Bearer dgdhggdg3t3528721eye31y` })
                .send({ name: 'Testing' })
                .expect(401)
                .expect('Content-Type', /json/)
                .expect(function(response) {
                    expect(response.body).not.to.be.empty;
                    expect(response.body.success).to.be.equal(false);
                    expect(response.body).to.be.an('object');
                })
                .end(done);
        });

        it("Create To-Do wih no Date", function(done) {
            request(app)
                .post('/todos')
                .set('Accept', 'application/json')
                .set('Content-Type', 'application/json')
                .set({ Authorization: `Bearer ${Token}` })
                .send({ name: 'Testing' })
                .expect(200)
                .expect('Content-Type', /json/)
                .expect(function(response) {
                    expect(response.body).not.to.be.empty;
                    expect(response.body.success).to.be.equal(true);
                    expect(response.body).to.be.an('object');
                })
                .end(done);
        });

        it("Create To-Do with Valid Date", function(done) {
            request(app)
                .post('/todos')
                .set('Accept', 'application/json')
                .set('Content-Type', 'application/json')
                .set({ Authorization: `Bearer ${Token}` })
                .send({ name: 'Testing', dueAt: "12-3-2021" })
                .expect(200)
                .expect('Content-Type', /json/)
                .expect(function(response) {
                    expect(response.body).not.to.be.empty;
                    expect(response.body.success).to.be.equal(true);
                    expect(response.body).to.be.an('object');
                })
                .end(done);
        });

        it("Create To-Do with Invalid Date", function(done) {
            request(app)
                .post('/todos')
                .set('Accept', 'application/json')
                .set('Content-Type', 'application/json')
                .set({ Authorization: `Bearer ${Token}` })
                .send({ name: 'Testing', dueAt: "12-3-2019" })
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

    describe("Update To-Do", function() {

        it("Update To-Do without valid token", function(done) {
            request(app)
                .patch('/todos/jy481')
                .set('Accept', 'application/json')
                .set('Content-Type', 'application/json')
                .set({ Authorization: `Bearer dgdhggdg3t3528721eye31y` })
                .send({ completed: true })
                .expect(401)
                .expect('Content-Type', /json/)
                .expect(function(response) {
                    expect(response.body).not.to.be.empty;
                    expect(response.body.success).to.be.equal(false);
                    expect(response.body).to.be.an('object');
                })
                .end(done);
        });

        it("Update To-Do with valid token and user To-Do", function(done) {
            request(app)
                .patch('/todos/jy481')
                .set('Accept', 'application/json')
                .set('Content-Type', 'application/json')
                .set({ Authorization: `Bearer ${Token}` })
                .send({ name: 'Testing', dueAt: "12-3-2021" })
                .expect(200)
                .expect('Content-Type', /json/)
                .expect(function(response) {
                    expect(response.body).not.to.be.empty;
                    expect(response.body.success).to.be.equal(true);
                    expect(response.body).to.be.an('object');
                })
                .end(done);
        });

        it("Update To-Do with valid token but not user To-Do", function(done) {
            request(app)
                .patch('/todos/jy481')
                .set('Accept', 'application/json')
                .set('Content-Type', 'application/json')
                .set({ Authorization: `Bearer ${Token}` })
                .send({ completed: true })
                .expect(200)
                .expect('Content-Type', /json/)
                .expect(function(response) {
                    expect(response.body).not.to.be.empty;
                    expect(response.body.success).to.be.equal(true);
                    expect(response.body).to.be.an('object');
                })
                .end(done);
        });
    });
})