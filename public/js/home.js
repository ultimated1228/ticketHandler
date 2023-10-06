const logOutButton = document.querySelector("#log-out");
const submitTicket = document.querySelector("#submit-ticket");
const claimTicket = document.querySelector("#claim-ticket");

logOutButton.addEventListener("click", async function () {
  try {
    const res = await fetch("/api/users", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
    });
    // if res.ok is truthy, redirect user to the login page
    if (res.ok) {
      location.replace("/login");
    } else {
      // otherwise, the api call failed to close the session and a new error is thrown
      throw new Error("Unable to logout");
    }
  } catch (error) {
    console.error(error);
  }
});

submitTicket.addEventListener("submit", async function (event) {
  event.preventDefault();
  try {
    const subject = document.querySelector("#subject").value;
    const description = document.querySelector("#message").value;
    const status = "Open";
    const urgency = document.querySelector("#urgency").value;

    const res = await fetch("api/tickets", {
      method: "POST",
      headers: { "Content-Type": "application.json" },
      body: {
        subject: subject,
        description: description,
        status: status,
        urgency: urgency,
      },
    });
    if (res.status === 201) {
      const id = res.body.ticket.id;
      location.replace(`/ticket/${id}`);
    } else {
      throw new Error("Unable to create ticket");
    }
  } catch (error) {
    console.error(error);
  }
});

claimTicket.addEventListener("click", async function () {});
