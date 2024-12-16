const express = require('express');
const {PrismaClient} = require('@prisma/client');
const router = express.Router();
const prisma = new PrismaClient();

// Get all certificates
router.get('/', async (req, res) => {
    try {
        const certificates = await prisma.cerificates.findMany();
        res.json(certificates);
    } catch (error) {
        res.status(500).json({error: 'Failed to fetch certificates'});
    }
});

// Get certificate by ID
router.get('/:id', async (req, res) => {
    try {
        const certificate = await prisma.cerificates.findUnique({
            where: { id: req.params.id }
        });
        if (!certificate) {
            return res.status(404).json({error: 'Certificate not found'});
        }
        res.json(certificate);
    } catch (error) {
        res.status(500).json({error: 'Failed to fetch certificate'});
    }
});

// Create new certificate
router.post('/', async (req, res) => {
    try {
        const certificate = await prisma.cerificates.create({
            data: {
                certificateType: req.body.certificateType,
                requestedBy: req.body.requestedBy,
                purpose: req.body.purpose,
                status: 'Pending'
            }
        });
        res.status(201).json(certificate);
    } catch (error) {
        res.status(500).json({error: 'Failed to create certificate'});
    }
});

// Update certificate
router.put('/:id', async (req, res) => {
    try {
        const certificate = await prisma.cerificates.update({
            where: { id: req.params.id },
            data: req.body
        });
        res.json(certificate);
    } catch (error) {
        res.status(500).json({error: 'Failed to update certificate'});
    }
});

// Delete certificate
router.delete('/:id', async (req, res) => {
    try {
        await prisma.cerificates.delete({
            where: { id: req.params.id }
        });
        res.status(204).send();
    } catch (error) {
        res.status(500).json({error: 'Failed to delete certificate'});
    }
});

module.exports = router; 