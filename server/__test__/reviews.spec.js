const request = require("supertest");
const config = require("./test.config");
const assert = require("assert");

const URL = "http://localhost:8000";

jest.setTimeout(20000);
describe("getting reviews from server", () => {
  it("getting status code 200 for reviews from server ", (done) => {
    request(URL)
      .get("/api/v1/reviews")
      .set("Content-type", "application/json")
      .end((err, res) => {
        if (err) return done();
        else {
          assert.equal(res.status, 200);
          return done();
        }
      });
  });
  it(" fetching reviews from server ", (done) => {
    request(URL)
      .get("/api/v1/reviews")
      .end((err, res) => {
        if (err) return done();
        else {
          assert.equal(res.text.length > 0, true);
          return done();
        }
      });
  });
});

describe("Adding reviews to DB", () => {
  it("getting status code 200 after adding a review from server ", (done) => {
    request(URL)
      .post("/api/v1/reviews")
      .set("Content-type", "application/json")
      .send(config.review)
      .end((err, res) => {
        if (err) return done();
        else {
          assert.equal(res.status, 200);
          return done();
        }
      });
  });
});
