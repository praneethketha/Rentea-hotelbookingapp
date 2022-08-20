const request = require("supertest");
const config = require("./test.config");
const assert = require("assert");

const URL = "http://localhost:8000";

jest.setTimeout(20000);
describe("getting booking list from server", () => {
  it("getting status code 200 for bookings from server ", (done) => {
    request(URL)
      .get("/api/v1/bookings")
      .set("Content-type", "application/json")
      .end((err, res) => {
        if (err) return done();
        else {
          assert.equal(res.status, 200);
          return done();
        }
      });
  });
  it("fetching booking details from server ", (done) => {
    request(URL)
      .get("/api/v1/bookings")
      .end((err, res) => {
        if (err) return done();
        else {
          assert.equal(res.text.length > 0, true);
          return done();
        }
      });
  });
});

describe("Sending payment mail", () => {
  it("getting status code 200 for payment mail from server", (done) => {
    request(URL)
      .post("http://localhost:8000/api/v1/bookings/payment/mail")
      .set("Content-type", "application/json")
      .send(config.paymentMail)
      .end((err, res) => {
        if (err) return done();
        else {
          assert.equal(res.status, 200);
          return done();
        }
      });
  });
});
