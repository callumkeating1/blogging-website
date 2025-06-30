import server from "../server.js";
import request from "supertest";
import { db } from "../backend/backend.js";

describe("Post tests", () => {
    test("can you test connection", async () => {
        const res = await request(server)
            .get("/testcon");
        expect(res.status).toBe(200);
        expect(res.body.message).toBe("connected!");
    });
    test("can you get posts", async () => {
        const res = await request(server)
            .get("/post/getRecent");
        expect(res.status).toBe(200);
    })
});
afterAll(() => {
    server.close();
    db.end();
});
