const createTicket = (req, res) => {
    //create a ticket
    res.json({ message: 'Ticket created successfully' });
  };
  
  const editTicket = (req, res) => {
    // edit a ticket
    res.json({ message: 'Ticket edited successfully' });
  };
  
  const archiveTicket = (req, res) => {
    // archive a ticket
    res.json({ message: 'Ticket archived successfully' });
  };
  
  module.exports = {
    createTicket,
    editTicket,
    archiveTicket,
  };
  