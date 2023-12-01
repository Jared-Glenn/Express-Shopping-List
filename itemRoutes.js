const express = require("express");
const router = new express.Router();
const items = require("./fakeDb");

router.get("/", (req, res) => {
    return res.json(items);
})

router.post("/", (req, res) => {
    const name = req.query['name'];
    const price = req.query['price'];
    const newItem = {"name": name,
                    "price": price
                }
    
    items.push(newItem);
    return res.json({"added": newItem})
})

router.get("/:name", (req, res) => {
    const itemName = req.params.name;

    for (let i = 0; i < items.length; i += 1) {
        if (items[i]["name"] === itemName){
            return res.json(items[i]);
        }
    }
    return res.json({"message": "Item not found."})
})

router.patch("/:name", (req, res) => {
    const itemName = req.params.name;
    const name = req.query['name'];
    const price = parseFloat(req.query['price']);
    const newItem = {"name": name,
                    "price": price
}

    for (let i = 0; i < items.length; i += 1) {
        if (items[i]["name"] === itemName) {
            items[i] = newItem;

            return res.json({"updated": newItem});
        }
    }
    return res.json({"message": "Item cannot be found to be patched."})
})

router.delete("/:name", (req, res) => {
    const itemName = req.params.name;

    for (let i = 0; i < items.length; i += 1){
        if (items[i]["name"] === itemName){
            items.splice(i, 1);

            return res.json({"message": "Deleted"});
        }
    }
    return res.json({"message": "Item cannot be found to be deleted."})
})

module.exports = router;