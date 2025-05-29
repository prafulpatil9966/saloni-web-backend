const express = require('express');
const router = express.Router();
const Client = require('../models/Client');

// Create a new client
router.post('/', async (req, res) => {
    try {
        const client = new Client(req.body);
        await client.save();
        res.status(201).json({ message: 'Client data saved successfully', client });
    } catch (error) {
        res.status(500).json({ error: 'Failed to save client data', details: error.message });
    }
});

// Get all clients
router.get('/', async (req, res) => {
    try {
        const clients = await Client.find().sort({ createdAt: -1 }); // Newest first
        res.status(200).json(clients);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch clients', details: error.message });
    }
});


// Get a single client by ID
router.get('/:id', async (req, res) => {
    try {
        const id = req.params.id; // Corrected here
        console.log("Fetching client with ID:", id);

        const client = await Client.findById(id);
        if (!client) {
            return res.status(404).json({ error: 'Client not found' });
        }

        res.status(200).json(client);
    } catch (error) {
        console.error("Error fetching client:", error);
        res.status(500).json({ error: 'Failed to fetch client', details: error.message });
    }
});

// Update a client
router.put('/:id', async (req, res) => {
    try {
        const updatedClient = await Client.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedClient) {
            return res.status(404).json({ error: 'Client not found' });
        }
        res.status(200).json({ message: 'Client updated successfully', client: updatedClient });
    } catch (error) {
        res.status(500).json({ error: 'Failed to update client', details: error.message });
    }
});

// Delete a client
router.delete('/:id', async (req, res) => {
    try {
        const id = req.params.id;
        console.log("Trying to delete client with ID:", id);

        const deletedClient = await Client.findByIdAndDelete(id);

        if (!deletedClient) {
            console.log("Client not found with ID:", id);
            return res.status(404).json({ error: 'Client not found' });
        }

        res.status(200).json({ message: 'Client deleted successfully' });
    } catch (error) {
        console.error("Error deleting client:", error);
        res.status(500).json({ error: 'Failed to delete client', details: error.message });
    }
});


module.exports = router;
