import { Router } from 'express';
import { PrismaClient } from '@prisma/client';

const router = Router();
const prisma = new PrismaClient();

const residentSelect = {
  id: true,
  firstName: true,
  middleName: true,
  lastName: true,
  age: true,
  address: true,
  contactNumber: true,
  status: true,
  createdAt: true,
  updatedAt: true
};

router.get('/', async (req, res) => {
  const residents = await prisma.residents.findMany({
    select: residentSelect
  });
  res.json(residents);
});

router.post('/', async (req, res) => {
  const resident = await prisma.residents.create({
    data: req.body,
    select: residentSelect
  });
  res.status(201).json(resident);
});

router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      middleName: req.body.middleName,
      age: Number(req.body.age),
      address: req.body.address,
      contactNumber: req.body.contactNumber,
      status: req.body.status
    };

    const resident = await prisma.residents.update({
      where: { id },
      data: updateData,
      select: residentSelect
    });

    res.json(resident);
  } catch (error) {
    console.error('Error updating resident:', error);
    res.status(500).json({ error: 'Failed to update resident' });
  }
});

router.delete('/:id', async (req, res) => {
  await prisma.residents.delete({
    where: { id: req.params.id }
  });
  res.status(204).send();
});

export default router; 