const burger = require('../models/burger');
const express = require('express');
const router = express.Router();

router.get("/", (req, res) => {
    burger.selectAll(function(data){
        let hndlBarsObj = {
           burger: data 
        }
        console.log(hndlBarsObj);
        return res.render("index", hndlBarsObj);
    });
});

router.post('/api/burgers', (req, res) => {
    burger.insertOne(['burger'], [
        req.body.burger
    ], function(result){
        res.redirect("/");
    });
});

router.post('/api/burgers/:id', (req, res) => {
    var condition = "id = " + req.params.id;
    console.log("condition ", condition);
    burger.updateOne({
        devoured: req.body.devoured
    }, condition, function(result){
        if (result.changedRows == 0) {
            // If no rows were changed, then the ID must not exist, so 404
            return res.status(404).end();
          } else {
            res.redirect("/");
            res.status(200).end();
          }
    });
});

module.exports = router;