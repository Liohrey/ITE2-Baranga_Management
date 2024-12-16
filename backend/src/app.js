const express = require('express');
const cors = require('cors');
const userRoutes = require('./routes/user');
const residentRoutes = require('./routes/resident');
const householdRoutes = require('./routes/household');
const certificateRoutes = require('./routes/certificate');
const blotterRoutes = require('./routes/blotter');
const officialsRoutes = require('./routes/officials');
const projectsRoutes = require('./routes/projects');
const announcementRoutes = require('./routes/announcements'); // Add this line

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/users', userRoutes);
app.use('/api/residents', residentRoutes);
app.use('/api/households', householdRoutes);
app.use('/api/certificates', certificateRoutes);
app.use('/api/blotter', blotterRoutes);
app.use('/api/officials', officialsRoutes);
app.use('/api/projects', projectsRoutes);
app.use('/api/announcements', announcementRoutes); // Add this line

module.exports = app;