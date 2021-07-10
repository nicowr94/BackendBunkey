import "core-js/stable";
import "regenerator-runtime/runtime";
import request from "supertest";
import app from "../src/app";

/**
 * Testing login user
 */
describe("POST /api/auth/signup", () => {
  it("Recibir el token", (done) => {
    const data = {
      email: "admin@bunkey.com",
      password: "password",
    };
    request(app)
      .post("/api/auth/signup")
      .send(data)
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)

      .end((err) => {
        if (err) return done(err);
        done();
      });
  });
});
