const express = require('express');
const {PrismaClient} = require('@prisma/client');
const router = express.Router();
const prisma = new PrismaClient();

router.get('/', async (req, res) => {
    try{
        const users = await prisma.user.findMany();
        res.json(users);
    } catch (error){
        res.status(500).json({error: 'Something went wrong'});
    }
});

router.post('/', async (req, res) => {
    try{
        const {name, email, password} = req.body;
        const user = await prisma.user.create({
            data: {
                name,
                email,
                password
            }
        });
        res.status(201).json(user);
    } catch (error){
        res.status(500).json({error: 'Something went wrong'});
    }
});

module.exports = router;
