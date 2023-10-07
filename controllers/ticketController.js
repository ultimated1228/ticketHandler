const router = require("express").Router();
const { Ticket } = require("../models");

const controller = {
  // Controller for creating a new ticket
  createTicket: async (req, res) => {
    try {
      const { subject, description, status, urgency } = req.body;
      const { user_id } = req.session;

      const newTicket = await Ticket.create({
        client_id: user_id,
        subject: subject,
        description: description,
        status: status,
        urgency: urgency,
      });

      // the initial log occurs in the afterCreate hook on the ticket model
      res.status(201).json({message:"response has reached the client", ticket:newTicket});
    } catch (error) {
      console.error("Error creating ticket:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  },

  // Controller for editing a ticket
  editTicket: async (req, res) => {
    try {
      const { id } = req.params;
      const { subject, description, status, urgency } = req.body;

      const updatedTicket = await Ticket.findByPk(id);

      if (!updatedTicket) {
        return res.status(404).json({ error: "Ticket not found" });
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

      return res.status(200).json({
        message: "Ticket updated successfully",
        ticket: updatedTicket,
      });
    } catch (error) {
      console.error("Error editing ticket:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  },

  // Controller for archiving a ticket
  archiveTicket: async (req, res) => {
    try {
      const { id } = req.params;

      const archivedTicket = await Ticket.findByPk(id);

      if (!archivedTicket) {
        return res.status(404).json({ error: "Ticket not found" });
      }

      // Archive the ticket
      archivedTicket.isArchived = true;
      await archivedTicket.save();

      res.json({
        message: "Ticket archived successfully",
        ticket: archivedTicket,
      });
    } catch (error) {
      console.error("Error archiving ticket:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  },
};

module.exports = controller;
