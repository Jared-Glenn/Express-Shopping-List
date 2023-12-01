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

describe("POST /items", function() {
    test("Adds an item to the list", async function() {
        const resp = await request(app).post('/items?name=popsicle&price=1.45');
        expect(resp.statusCode).toBe(200);

        expect(resp.body).toEqual({"added": {"name": "popsicle", "price": "1.45"}});
    })
})

describe("GET /items/:name", function() {
    test("Finds a single item on the list", async function() {
        const resp = await request(app).get('/items/bread');
        expect(resp.statusCode).toBe(200);

        expect(resp.body).toEqual({
            "name": "bread",
            "price": 0.99
        });
    })
})

describe("PATCH /items/:name", function() {
    test("Makes a change to an item", async function() {
        const resp = await request(app).patch('/items/bread?name=bread&price=1.25');
        expect(resp.statusCode).toBe(200);

        expect(resp.body).toEqual({"updated": {
            "name": "bread",
            "price": 1.25
        }});
    })
})

describe("DELETE /items/:name", function() {
    test("Deletes an item", async function() {
        const resp = await request(app).delete('/items/bread');
        expect(resp.statusCode).toBe(200);

        expect(resp.body).toEqual({"message": "Deleted"});
    })
})