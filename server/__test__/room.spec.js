const request = require("supertest");
const config = require("./test.config");
const assert = require("assert");

const URL = "http://localhost:8000";

jest.setTimeout(20000);
describe("getting room details from server", () => {
  it("getting status code 200 for rooms from server", (done) => {
    request(URL)
      .get("/api/v1/rooms")
      .set("Content-type", "application/json")
      .end((err, res) => {
        if (err) return done();
        else {
          assert.equal(res.status, 200);
          return done();
        }
      });
  });
  it("fetching rooms from server", (done) => {
    request(URL)
      .get("/api/v1/rooms")
      .end((err, res) => {
        if (err) return done();
        else {
          assert.equal(res.text.length > 0, true);
          return done();
        }
      });
  });
});

describe("Adding rooms to DB", () => {
  it("getting status code 200 after adding a room to server ", (done) => {
    request(URL)
      .post("/api/v1/rooms")
      .set("Content-type", "application/json")
      .send(config.room)
      .end((err, res) => {
        if (err) return done();
        else {
          assert.equal(res.status, 200);
          return done();
        }
      });
  });
});
