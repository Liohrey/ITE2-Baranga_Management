const express = require('express');
const {PrismaClient} = require('@prisma/client');
const router = express.Router();
const prisma = new PrismaClient();

// Get all households
router.get('/', async (req, res) => {
    try {
        const households = await prisma.houseHold.findMany();
        res.json(households);
    } catch (error) {
        res.status(500).json({error: 'Failed to fetch households'});
    }
});

// Get household by ID
router.get('/:id', async (req, res) => {
    try {
        const household = await prisma.houseHold.findUnique({
            where: { id: req.params.id }
        });
        if (!household) {
            return res.status(404).json({error: 'Household not found'});
        }
        res.json(household);
    } catch (error) {
        res.status(500).json({error: 'Failed to fetch household'});
    }
});

// Create new household
router.post('/', async (req, res) => {
    try {
        const {
            houseHoldHead,
            address,
            memberCount,
            type
        } = req.body;

        const household = await prisma.houseHold.create({
            data: {
                houseHoldHead,
                address,
                memberCount: parseInt(memberCount),
                type,
                status: 'Active'
            }
        });
        res.status(201).json(household);
    } catch (error) {
        console.error('Error creating household:', error);
        res.status(500).json({error: 'Failed to create household'});
    }
});

// Update household
router.put('/:id', async (req, res) => {
    try {
        const {
            houseHoldHead,
            address,
            memberCount,
            type,
            status
        } = req.body;

        const household = await prisma.houseHold.update({
            where: { id: req.params.id },
            data: {
                houseHoldHead,
                address,
                memberCount: parseInt(memberCount),
                type,
                status: status || 'Active'
            }
        });
        res.json(household);
    } catch (error) {
        res.status(500).json({error: 'Failed to update household'});
    }
});

// Delete household
router.delete('/:id', async (req, res) => {
    try {
        await prisma.houseHold.delete({
            where: { id: req.params.id }
        });
        res.status(204).send();
    } catch (error) {
        res.status(500).json({error: 'Failed to delete household'});
    }
});

module.exports = router; 