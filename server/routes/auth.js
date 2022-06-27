const router = require("express").Router();
const Writer = require("../models/Writers");



router.post("/register", async (req,res) => {
    try{
        console.log('req.body ', req.body);
        const newWriter = new Writer({
            username: req.body.username,
            email:req.body.email,
            password:req.body.password,
        });

        const writer = await newWriter.save();
        res.status(200).json(writer);

    } catch(err){
        res.status(500).json(err);
    }
});

module.exports = router;