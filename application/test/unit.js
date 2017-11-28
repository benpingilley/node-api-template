//Require the dev-dependencies
const chai = require('chai');
const chaiHttp = require('chai-http');

// Require server for testing of API endpoints
const app = require('../server');

// Requre fuctions module for testing of individual functions
const basic = require('../functions/basic');

const expect = chai.expect;
const should = chai.should();

chai.use(chaiHttp);

// Interact with functions directly
describe('Functions', () => {
  describe('Executes the hello function (ASYNC)', () => {
    it('it should return echoed hello', async() => {
      // Call the exported function from the module
      // async functions must use await and stored in a variable
      const output = await basic.hello();
      output.should.be.equal('Hello');
    });
  });
  describe('Test the behavior of the addTwo function (SYNC)', () => {
    it('should return 2 when given 1 and 1 via expect()', () => {
      // sync functions can be called directly and not stored in a variable
      expect(basic.addTwo(1, 1)).to.be.equal(2)
    })
    it('should not return 3 when given 1 and 1 via should()', () => {
      basic.addTwo(1, 1).should.not.be.equal(3)
    })
  })
});

// Interact with function through API endpoint
describe('Endpoints', () => {
  describe('/GET hello (ASYNC)', () => {
    it('it should get the echoed hello', (done) => {
      chai.request(app.listen())
        .get('/api/hello')
        .end((err, res) => {
            res.should.have.status(200);
            expect(res.text).eql('Hello');
          done();
        });
    });
  });
  describe('/GET addTwo (SYNC)', () => {
    it('it should add two numbers together', (done) => {
      chai.request(app.listen())
        .get('/api/addTwo/1/2')
        .end((err, res) => {
            res.should.have.status(200);
            expect(res.text).eql('3');
          done();
        });
    });
  });
});
