import config from "../conf/index.js";

//Implementation of fetch call to fetch all reservations

async function fetchReservations() {
  // TODO: MODULE_RESERVATIONS
  // 1. Fetch Reservations by invoking the REST API and return them
  try {
    const reservationDetails = await fetch(
      config.backendEndpoint + `/reservations/`
    );
    const reservationData = await reservationDetails.json();

    // Place holder for functionality to work in the Stubs
    return reservationData;
  } catch (error) {
    return null;
  }
}

//Function to add reservations to the table. Also; in case of no reservations, display the no-reservation-banner, else hide it.
function addReservationToTable(reservations) {
  // TODO: MODULE_RESERVATIONS
  // 1. Add the Reservations to the HTML DOM so that they show up in the table
  console.log(reservations);
  if (reservations.length === 0) {
    document.getElementById("no-reservation-banner").style.display = "block";
    document.getElementById("reservation-table-parent").style.display = "none";
  } else {
    document.getElementById("no-reservation-banner").style.display = "none";
    document.getElementById("reservation-table-parent").style.display = "block";
  }

  const reservationTable = document.getElementById("reservation-table");
  reservations.forEach((reservation) => {
    let row = document.createElement("tr");

    const date = new Date(reservation.date);
    const dateOptions = { month: "numeric", year: "numeric", day: "numeric" };
    const formattedDate = date.toLocaleDateString("en-IN", dateOptions);

    const time=new Date(reservation.time);
    const timeOptions={
                        month:"long",
                        year:"numeric",
                        day:"numeric",
                        hour:"numeric",
                        minute:"numeric",
                        second:"numeric",
                        hour12:"true",
                       }

    const formattedTime=time.toLocaleString("en-In",timeOptions);    
    

    row.innerHTML = `<tr>
                      <td>${reservation.id}</td>
                      <td>${reservation.name}</td>
                      <td>${reservation.adventureName}</td>
                      <td>${reservation.person}</td>
                      <td>${formattedDate}</td>
                      <td>${reservation.price}</td>
                      <td>${formattedTime.replace(" at", ",")}</td>
                      <td id=${reservation.id}><a href="../detail/?adventure=${reservation.adventure}"<div class="reservation-visit-button">Visit Adventure</div></a></td>
                  </tr>`;

    reservationTable.appendChild(row);
  });

  //Conditionally render the no-reservation-banner and reservation-table-parent
  /*
    Iterating over reservations, adding it to table (into div with class "reservation-table") and link it correctly to respective adventure
    The last column of the table should have a "Visit Adventure" button with id=<reservation-id>, class=reservation-visit-button and should link to respective adventure page

    Note:
    1. The date of adventure booking should appear in the format D/MM/YYYY (en-IN format) Example:  4/11/2020 denotes 4th November, 2020
    2. The booking time should appear in a format like 4 November 2020, 9:32:31 pm
  */
}

export { fetchReservations, addReservationToTable };
