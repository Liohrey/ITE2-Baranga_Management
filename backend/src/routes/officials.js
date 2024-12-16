const express = require('express');
const {PrismaClient} = require('@prisma/client');
const router = express.Router();
const prisma = new PrismaClient();

// Get all officials
router.get('/', async (req, res) => {
    try {
        const officials = await prisma.barangayOfficials.findMany();
        res.json(officials);
    } catch (error) {
        res.status(500).json({error: 'Failed to fetch officials'});
    }
});

// Get official by ID
router.get('/:id', async (req, res) => {
    try {
        const official = await prisma.barangayOfficials.findUnique({
            where: { id: req.params.id }
        });
        if (!official) {
            return res.status(404).json({error: 'Official not found'});
        }
        res.json(official);
    } catch (error) {
        res.status(500).json({error: 'Failed to fetch official'});
    }
});

// Create new official
router.post('/', async (req, res) => {
    try {
        const {
            position,
            name,
            contactNumber,
            email,
            termStartToEnd
        } = req.body;

        const official = await prisma.barangayOfficials.create({
            data: {
                position,
                name,
                contactNumber,
                email,
                termStartToEnd
            }
        });
        res.status(201).json(official);
    } catch (error) {
        res.status(500).json({error: 'Failed to create official'});
    }
});

// Update official
router.put('/:id', async (req, res) => {
    try {
        const official = await prisma.barangayOfficials.update({
            where: { id: req.params.id },
            data: req.body
        });
        res.json(official);
    } catch (error) {
        res.status(500).json({error: 'Failed to update official'});
    }
});

// Delete official
router.delete('/:id', async (req, res) => {
    try {
        await prisma.barangayOfficials.delete({
            where: { id: req.params.id }
        });
        res.status(204).send();
    } catch (error) {
        res.status(500).json({error: 'Failed to delete official'});
    }
});

module.exports = router; 