const Ticket = require ('../models/Ticket')

// Controller for creating a new ticket
const createTicket = async (req, res) => {
  try {
    const { subject, description, status, urgency } = req.body;
    
    const userId = req.session.userId; 

    const newTicket = await Ticket.create({
      subject,
      description,
      status,
      urgency,
      client: userId,
    });

    // Log the ticket creation
    await newTicket.logChange(userId, 'Ticket created');

    res.status(201).json({ message: 'Ticket created successfully', ticket: newTicket });
  } catch (error) {
    console.error('Error creating ticket:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Controller for editing a ticket
const editTicket = async (req, res) => {
  try {
    const { id } = req.params;
    const { subject, description, status, urgency } = req.body;

    const updatedTicket = await Ticket.findByPk(id);

    if (!updatedTicket) {
      return res.status(404).json({ error: 'Ticket not found' });
    }
    const userId = req.session.userId;

    // Log the changes before updating
    const oldData = {
      subject: updatedTicket.subject,
      description: updatedTicket.description,
      status: updatedTicket.status,
      urgency: updatedTicket.urgency,
    };

    await updatedTicket.logChange(userId, oldData);

    // Update the ticket
    await updatedTicket.update({
      subject,
      description,
      status,
      urgency,
    });

    res.json({ message: 'Ticket updated successfully', ticket: updatedTicket });
  } catch (error) {
    console.error('Error editing ticket:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Controller for archiving a ticket
const archiveTicket = async (req, res) => {
  try {
    const { id } = req.params;

    const archivedTicket = await Ticket.findByPk(id);

    if (!archivedTicket) {
      return res.status(404).json({ error: 'Ticket not found' });
    }

    // Archive the ticket
    archivedTicket.isArchived = true;
    await archivedTicket.save();

    res.json({ message: 'Ticket archived successfully', ticket: archivedTicket });
  } catch (error) {
    console.error('Error archiving ticket:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

module.exports = {
  createTicket,
  editTicket,
  archiveTicket,
};