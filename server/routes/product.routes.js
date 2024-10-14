const router = require("express").Router();
const mongoose = require("mongoose");
const productList = require("../models/producto.model");

router.get("/productosLista", async (req, res) => {
    try {
        const product = await productList.find();
        res.json(product);
    } catch (err) {
        console.log(err);
    }
});

router.get("/:id", async (req, res) => {
    try {
        const {id} = req.params;
        const product = await productList.findById(id);
        res.json(product);
    } catch (err) {
        console.log(err);
    }
});

//post
router.post("/registrarProductos", (req, res) => {
    const {body} = req;

    productoList.create(body)
        .then((result) => {
            res.json(result);
        })
        .catch(console.log);
});

///update
router.put("/:id", (req, res) => {
    const {body} = req;
    const {id} = req.params;


    productoList.findByIdAndUpdate(id, body)
        .then((result) => {
            res.json(result);
        })
        .catch(console.log);
});

///delete
router.delete('/delete/:id', (req, res) => {
    const {id} = req.params;
    producto.findByIdAndDelete(id)
        .then((result) => {
            producto.find()
                .then((result) => {
                    res.json(result);
                })

        })
        .catch(console.log);
});
module.exports = router;