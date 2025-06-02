import server from "../server.js";
import request from "supertest";
import { db } from "../backend/backend.js";

describe("Post tests", () => {
    let accToken;
    beforeAll(async () => {
        await request(server)
            .post("/account/create")
            .send({ username : "postTests", email: "callum@callum.page", password : "tempPass" });
        const res = await request(server)
            .post("/account/login")
            .send({ username : "postTests", password : "tempPass" });
        accToken = res.body.jwt;
    });
    test("can you post", async () => {
        const res = await request(server)
            .post("/post")
            .send({ title : "this is a test post", text : "this is the contents of the post", jwt : accToken });
        expect(res.status).toBe(201);
        expect(res.body.message).toEqual("successfully posted");
    });
});
afterAll(() => {
    server.close();
    db.end();
});
