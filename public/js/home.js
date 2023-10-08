

const logoutHandler = async (event) => {
  event.preventDefault();
  try {
    const res = await fetch("/api/users", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
    });
    if (res.ok) {
      location.replace("/login");
      console.log("\nsuccessfully logged out\n");
    }
  } catch (error) {
    console.error("\nlogout failed\n", error);
  }
};

const formSubmitHandler = async (event) => {
  event.preventDefault();
  try {
    // the body content to be sent to the ticket controller upon making the POST call
    const req = {
      subject: await document.querySelector("#subject").value.trim(),
      description: await document.querySelector("#message").value.trim(),
      status: "Open",
      urgency: await document.querySelector("#urgency").value,
    };
    // the post call to create a new ticket, routed to the createTicket function in the ticketController
    const res = await fetch("/api/tickets", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(req),
    });
    
    if (res.ok) {
      const data = await res.json(); // Parse the response JSON
      console.log({ message: "\nsuccessfully created ticket\n", ticket: data.ticket });
      document.location.replace(`/ticket/${data.ticket.id}`); // Access the new ticket's ID
    }
  } catch (error) {
    console.error("\nfailed to create ticket\n", error);
  }
};

// this will update the tech_id of a ticket when that ticket's claim button is clicked
// tech_id will be a reference to the primary key of the user who clicked it
const ticketClaimHandler = async (event) => {
  event.preventDefault();
  try {
  } catch (error) {
    console.error(error);
  }
};
document.querySelector("#log-out").addEventListener("click", logoutHandler);
document.querySelector("#submit-ticket").addEventListener("submit", formSubmitHandler);

// commented out for now so it doesnt crash
// document.querySelectorAll(".claim-ticket").addEventListener("click", ticketClaimHandler);
