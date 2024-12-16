const express = require('express');
const {PrismaClient} = require('@prisma/client');
const router = express.Router();
const prisma = new PrismaClient();

// Get all residents
router.get('/', async (req, res) => {
    try {
        const residents = await prisma.residents.findMany();
        res.json(residents);
    } catch (error) {
        res.status(500).json({error: 'Failed to fetch residents'});
    }
});

// Get resident by ID
router.get('/:id', async (req, res) => {
    try {
        const resident = await prisma.residents.findUnique({
            where: { id: req.params.id }
        });
        if (!resident) {
            return res.status(404).json({error: 'Resident not found'});
        }
        res.json(resident);
    } catch (error) {
        res.status(500).json({error: 'Failed to fetch resident'});
    }
});

// Create new resident
router.post('/', async (req, res) => {
    try {
        const {
            firstName,
            lastName,
            middleName,
            age,
            address,
            contactNumber
        } = req.body;

        const resident = await prisma.residents.create({
            data: {
                firstName,
                lastName,
                middleName: middleName || null,
                age: parseInt(age),
                address,
                contactNumber: contactNumber.toString(),
                status: 'Active'
            }
        });
        res.status(201).json(resident);
    } catch (error) {
        console.error('Error creating resident:', error);
        res.status(500).json({error: 'Failed to create resident'});
    }
});

// Update resident
router.put('/:id', async (req, res) => {
    try {
        const {
            firstName,
            lastName,
            middleName,
            age,
            address,
            contactNumber,
            status
        } = req.body;

        const resident = await prisma.residents.update({
            where: { id: req.params.id },
            data: {
                firstName,
                lastName,
                middleName,
                age: Number(age),
                address,
                contactNumber,
                status: status || 'Active'
            }
        });
        res.json(resident);
    } catch (error) {
        console.error('Update error:', error);
        res.status(500).json({error: 'Failed to update resident'});
    }
});

// Delete resident
router.delete('/:id', async (req, res) => {
    try {
        await prisma.residents.delete({
            where: { id: req.params.id }
        });
        res.status(204).send();
    } catch (error) {
        res.status(500).json({error: 'Failed to delete resident'});
    }
});

module.exports = router; 