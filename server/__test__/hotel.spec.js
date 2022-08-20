const request = require("supertest");
const assert = require("assert");
const config = require("./test.config");
const URL = "http://localhost:8000";

jest.setTimeout(20000);

describe("getting products list from server", () => {
  it("getting status code 200 for hotels from server", (done) => {
    request(URL)
      .get("/api/v1/hotels")
      .set("Content-type", "application/json")
      .end((err, res) => {
        if (err) return done();
        else {
          assert.equal(res.status, 200);
          return done();
        }
      });
  });
  it("fetching hotels from server", (done) => {
    request(URL)
      .get("/api/v1/hotels")
      .end((err, res) => {
        if (err) return done();
        else {
          assert.equal(res.text.length > 0, true);
          return done();
        }
      });
  });
});

describe("Adding hotels to DB", () => {
  it("getting status code 200 after adding a hotel from server", (done) => {
    request(URL)
      .post("/api/v1/hotels")
      .set("Content-type", "application/json")
      .send(config.hotel1)
      .end((err, res) => {
        if (err) return done();
        else {
          assert.equal(res.status, 200);
          return done();
        }
      });
  });
});

describe("Updating hotels to DB", () => {
  it("getting status code 200 after updating a hotel from server", (done) => {
    request(URL)
      .patch("/api/v1/hotels/62d02e8f9101eddbfff4be38")
      .set("Content-type", "application/json")
      .send(config.hotel2)
      .end((err, res) => {
        if (err) return done();
        else {
          assert.equal(res.status, 200);
          return done();
        }
      });
  });
});

describe("Deleting  hotels from DB", () => {
  it("getting status code 200 after deleting a hotel from server", (done) => {
    request(URL)
      .delete("/api/v1/hotels/62d02e8f9101eddbfff4be38")

      .end((err, res) => {
        if (err) return done();
        else {
          assert.equal(res.status, 200);
          return done();
        }
      });
  });
});
