const express = require('express');
const {PrismaClient} = require('@prisma/client');
const router = express.Router();
const prisma = new PrismaClient();

// Get all projects
router.get('/', async (req, res) => {
    try {
        const projects = await prisma.projects.findMany();
        res.json(projects);
    } catch (error) {
        res.status(500).json({error: 'Failed to fetch projects'});
    }
});

// Get project by ID
router.get('/:id', async (req, res) => {
    try {
        const project = await prisma.projects.findUnique({
            where: { id: req.params.id }
        });
        if (!project) {
            return res.status(404).json({error: 'Project not found'});
        }
        res.json(project);
    } catch (error) {
        res.status(500).json({error: 'Failed to fetch project'});
    }
});

// Create new project
router.post('/', async (req, res) => {
    try {
        const {
            projectName,
            projectDescription,
            projectStatus,
            projectBudget,
            projectStartDate,
            projectEndDate,
            address
        } = req.body;

        const project = await prisma.projects.create({
            data: {
                projectName,
                projectDescription,
                projectStatus,
                projectBudget: parseFloat(projectBudget),
                projectStartDate: new Date(projectStartDate),
                projectEndDate: new Date(projectEndDate),
                address
            }
        });
        res.status(201).json(project);
    } catch (error) {
        console.error('Error creating project:', error);
        res.status(500).json({error: 'Failed to create project'});
    }
});

// Update project
router.put('/:id', async (req, res) => {
    try {
        const updateData = {...req.body};
        if (updateData.projectBudget) {
            updateData.projectBudget = parseFloat(updateData.projectBudget);
        }
        if (updateData.projectStartDate) {
            updateData.projectStartDate = new Date(updateData.projectStartDate);
        }
        if (updateData.projectEndDate) {
            updateData.projectEndDate = new Date(updateData.projectEndDate);
        }

        const project = await prisma.projects.update({
            where: { id: req.params.id },
            data: updateData
        });
        res.json(project);
    } catch (error) {
        res.status(500).json({error: 'Failed to update project'});
    }
});

// Delete project
router.delete('/:id', async (req, res) => {
    try {
        await prisma.projects.delete({
            where: { id: req.params.id }
        });
        res.status(204).send();
    } catch (error) {
        res.status(500).json({error: 'Failed to delete project'});
    }
});

module.exports = router; 