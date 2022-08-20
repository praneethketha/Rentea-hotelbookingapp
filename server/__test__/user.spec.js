const request = require("supertest");
const assert = require("assert");
const config = require("./test.config");
const URL = "http://localhost:8000";

jest.setTimeout(20000);

describe("getting users from server", () => {
  it("getting status code 200 for users from server", (done) => {
    request(URL)
      .get("/api/v1/users")
      .set("Content-type", "application/json")
      .end((err, res) => {
        if (err) return done();
        else {
          assert.equal(res.status, 200);
          return done();
        }
      });
  });
  it("fetching users from server", (done) => {
    request(URL)
      .get("/api/v1/users")
      .end((err, res) => {
        if (err) return done();
        else {
          assert.equal(res.text.length > 0, true);
          return done();
        }
      });
  });
});

describe("Adding users to DB", () => {
  it("getting status code 200 after adding a user from server", (done) => {
    request(URL)
      .post("/api/v1/users")
      .set("Content-type", "application/json")
      .send(config.user1)
      .end((err, res) => {
        if (err) return done();
        else {
          assert.equal(res.status, 200);
          return done();
        }
      });
  });
});

describe("Updating users from DB", () => {
  it("getting status code 200 after updating a user from server", (done) => {
    request(URL)
      .patch("/api/v1/users/62d411964b0c4db655376f8f")
      .set("Content-type", "application/json")
      .send(config.user2)
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
  it("getting status code 200 after deleting a user from server", (done) => {
    request(URL)
      .delete("/api/v1/users/62d411964b0c4db655376f8f")

      .end((err, res) => {
        if (err) return done();
        else {
          assert.equal(res.status, 200);
          return done();
        }
      });
  });
});
