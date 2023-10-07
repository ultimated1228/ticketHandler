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
    const req = {
      subject: await document.querySelector("#subject").value.trim(),
      description: await document.querySelector("#message").value.trim(),
      status: "Open",
      urgency: await document.querySelector("#urgency").value,
    };

    const res = await fetch("/api/tickets", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(req),
    });
    if (res.ok) {
      // Here the ticket id needs to be parsed out of the response so we can redirect the client to their newly created ticket

      // location.replace(`/ticket/${id}`);
      console.log("\nsuccessfully created ticket\n");
    }
  } catch (error) {
    console.error("\nfailed to create ticket\n", error);
  }
};

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
