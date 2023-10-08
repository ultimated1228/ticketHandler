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
      // Here the ticket id needs to be parsed out of the response so we can redirect the client to their newly created ticket
      const id = 1; // TEMPORARY, MUST REMOVE LATER
      //this functionality should probably be handled within the afterCreate hook in the ticket mode instead of here
      // I couldn't get it to work in eithr so right now its in both
      const createLog = await fetch(`/api/log/${id}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body:{        }
      });
      location.replace(`/ticket/${id}`);
      console.log("\nsuccessfully created ticket\n");
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
