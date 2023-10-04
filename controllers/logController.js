const router = require('express').Router();
const { Log } = require('../models');
const controller = {
    
    createLog: async (req, res) => {
    //create new Log
    try {
        const newLog = await Log.create({
            ...req.body,
            user_id: req.session.user_id,
        });
        res.status(200).json({ newLog, success: true });
    } catch (err) {
        res.status(500).json({ error: 'Error processing log creation' });
    }
},

editLog: async (req, res) => {
    //edit existing Log
    try {
        const [updatedCount] = await Log.update(req.body, {
            where: {
                id: req.params.id,
            },
        });
        if (updatedCount === 0) {
            return res.status(404).json({ error: 'Log not found' });
        }

        res.json({ message: 'Log updated successfully', success: true });
    } catch (err) {
        res.sendStatus(500).json({ error: 'Error processing log update' });
    }
},

deleteLog: async (req, res) => {
    // delete one comment by the ID
    try {
        const deletedCount = await Log.destroy({
            where: {
                id: req.params.id,
            },
        });

        if (deletedCount === 0) {
            return res.status(404).json({ error: 'Log not found' });
        }

        return res.status(204).json({ message: 'Log was deleted successfully', success: true });
    } catch (err) {
        res.sendStatus(500).json({ error: 'Error deleting Log' });
    }
},

}

module.exports = controller