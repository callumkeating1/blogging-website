import server from "../server.js";
import request from "supertest";
import { db } from "../backend/backend.js";

describe("Account tests", () => {
    let token;

    test("create account", async () => {
        const res = await request(server)
            .post("/account/create")
            .send({ username: "testuser", email: "test@example.com", password: "mypassword" });
        expect(res.status).toBe(201);
    });

    test("can you log into account", async () => {
        const res = await request(server)
            .post("/account/login")
            .send({ username : "testuser", password: "mypassword" });
        token = res.body.jwt;
        expect(res.status).toBe(200);
        expect(res.body).not.toEqual({ error : "badRequest", message : "username or password is incorrect", code : 400 });
    });

    test("can you refresh token", async () => {
        const res = await request(server)
            .post("/")
            .send({ token : token });
        expect(res.status).toBe(200);
        expect(res.body.error).not.toBeDefined();
    });

    test("can you delete account", async () => {
        const res = await request(server)
            .delete("/account/delete")
            .send({ "username": "testuser","password": "mypassword" });
        expect(res.status).toBe(204);
    });

    afterAll(() => {
        server.close();
        db.end();
    });
});
