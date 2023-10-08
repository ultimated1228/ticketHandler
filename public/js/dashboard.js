const { Ticket, User } = require("../../models");

module.exports = {
  serializeData: (tickets) => {
    return tickets.map((ticket) => ({
      id: ticket.id,
      subject: ticket.subject,
      description: ticket.description,
      status: ticket.status,
      urgency: ticket.urgency,
      client: {
        id: ticket.client.id,
        firstName: ticket.client.firstName,
        lastName: ticket.client.lastName,
      },
      tech: ticket.tech
        ? {
            id: ticket.tech.id,
            firstName: ticket.tech.firstName,
            lastName: ticket.tech.lastName,
          }
        : null,
    }));
  },

  getDashboardData: async (req, res) => {
    try {
      const { status } = req.params;
      const { userId, role } = req.session;

      let tickets;

      if (role === "client") {
        tickets = await Ticket.findAll({
          where: {
            clientId: userId,
            isArchived: false,
          },
          include: [{ model: User, as: "client" }],
        });
      } else if (role === "tech") {
        const techOptions = {
          where: {
            techId: userId,
            isArchived: false,
          },
          include: [
            { model: User, as: "client" },
            { model: User, as: "tech" },
          ],
        };

        if (status) {
          techOptions.where.status = status;
        }

        tickets = await Ticket.findAll(techOptions);
      }

      const serializedData = serializeData(tickets);

      res.render("dashboard", {
        layout: "main",
        title: "Dashboard",
        loggedIn: true,
        userType: role,
        data: serializedData,
      });
    } catch (error) {
      console.error("Error in dashboard controller:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  },
};
