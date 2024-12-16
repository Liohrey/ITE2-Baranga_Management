const express = require('express');
const { PrismaClient } = require('@prisma/client');
const router = express.Router();
const prisma = new PrismaClient();

// Get all announcements
router.get('/', async (req, res) => {
    try {
        const announcements = await prisma.announcement.findMany();
        res.json(announcements);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch announcements' });
    }
});

// Get announcement by ID
router.get('/:id', async (req, res) => {
    try {
        const announcement = await prisma.announcement.findUnique({
            where: { id: req.params.id }
        });
        if (!announcement) {
            return res.status(404).json({ error: 'Announcement not found' });
        }
        res.json(announcement);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch announcement' });
    }
});

// Create new announcement
router.post('/', async (req, res) => {
    try {
        const { 
            title, 
            content, 
            category,
            priority,
            validUntil,
            targetAudience,
            status 
        } = req.body;

        const announcement = await prisma.announcement.create({
            data: {
                title,
                content,
                category,
                priority,
                validUntil: new Date(validUntil),
                targetAudience,
                status
            }
        });
        res.status(201).json(announcement);
    } catch (error) {
        console.error('Error creating announcement:', error);
        res.status(500).json({ error: 'Failed to create announcement' });
    }
});

// Update announcement
router.put('/:id', async (req, res) => {
    try {
        const updateData = { ...req.body };
        if (updateData.validUntil) {
            updateData.validUntil = new Date(updateData.validUntil);
        }

        const announcement = await prisma.announcement.update({
            where: { id: req.params.id },
            data: updateData
        });
        res.json(announcement);
    } catch (error) {
        res.status(500).json({ error: 'Failed to update announcement' });
    }
});

// Delete announcement
router.delete('/:id', async (req, res) => {
    try {
        await prisma.announcement.delete({
            where: { id: req.params.id }
        });
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ error: 'Failed to delete announcement' });
    }
});

module.exports = router;