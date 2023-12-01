process.env.NODE_ENV = "test";

const request = require("supertest");

const app = require("./app");
const items = require("./fakeDb");

let bread = {
    "name": "bread",
    "price": 0.99
}

// {"name": "popsicle", "price": 1.45}

beforeEach(function() {
    items.push(bread);
})

afterEach(function() {
    items.length = 0;
})

describe("GET /items", function() {
    test("Gets a list of items", async function() {
        const resp = await request(app).get('/items');
        expect(resp.statusCode).toBe(200);

        expect(resp.body).toEqual([{
            "name": "bread",
            "price": 0.99
        }]);
    });
});

