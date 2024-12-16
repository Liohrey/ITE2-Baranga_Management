const express = require('express');
const {PrismaClient} = require('@prisma/client');
const router = express.Router();
const prisma = new PrismaClient();

// Get all blotter records
router.get('/', async (req, res) => {
    try {
        const blotters = await prisma.blotter.findMany();
        res.json(blotters);
    } catch (error) {
        res.status(500).json({error: 'Failed to fetch blotter records'});
    }
});

// Get blotter by ID
router.get('/:id', async (req, res) => {
    try {
        const blotter = await prisma.blotter.findUnique({
            where: { id: req.params.id }
        });
        if (!blotter) {
            return res.status(404).json({error: 'Blotter record not found'});
        }
        res.json(blotter);
    } catch (error) {
        res.status(500).json({error: 'Failed to fetch blotter record'});
    }
});

// Create new blotter record
router.post('/', async (req, res) => {
    try {
        const {
            complaintant,
            repondent,
            natureOfCase,
            status
        } = req.body;

        const blotter = await prisma.blotter.create({
            data: {
                complaintant,
                repondent,
                natureOfCase,
                status: status || 'Pending'
            }
        });
        res.status(201).json(blotter);
    } catch (error) {
        console.error('Error creating blotter:', error);
        res.status(500).json({error: 'Failed to create blotter record'});
    }
});

// Update blotter record
router.put('/:id', async (req, res) => {
    try {
        const blotter = await prisma.blotter.update({
            where: { caseId: req.params.id },
            data: req.body
        });
        res.json(blotter);
    } catch (error) {
        res.status(500).json({error: 'Failed to update blotter record'});
    }
});

// Delete blotter record
router.delete('/:id', async (req, res) => {
    try {
        await prisma.blotter.delete({
            where: { caseId: req.params.id }
        });
        res.status(204).send();
    } catch (error) {
        res.status(500).json({error: 'Failed to delete blotter record'});
    }
});

module.exports = router; 