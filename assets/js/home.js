const selectElement = document.querySelectorAll(".habitStatusSelect");
const viewLinks = document.querySelectorAll(".viewLink");
const previousWeekButton = document.getElementById("previousWeekButton");
const nextWeekButton = document.getElementById("nextWeekButton");

const currentURL = window.location.pathname;
let currentWeekNumber = 0;

// For getting week data
const updateWeekView = (newWeekOffset) => {
  const currentDate = new Date();
  const startDate = new Date(
    currentDate.getTime() - currentWeekNumber * 6 * 24 * 60 * 60 * 1000
  );
  const endDate = new Date(startDate.getTime() + 6 * 24 * 60 * 60 * 1000);

  const startDateString = startDate.toISOString().split("T")[0];
  const endDateString = endDate.toISOString().split("T")[0];

  fetch(`/weekView?startDate=${startDateString}&endDate=${endDateString}`)
    .then(async (response) => {
      const habitData = await response.json();
      const { habits } = habitData;
      const tableElement = document.querySelector("table");
      tableElement.innerHTML = "";

      const dateRow = document.createElement("tr");
      const thead = document.createElement("thead");
      const tbody = document.createElement("tbody");
      const theadHashElement = document.createElement("th");
      theadHashElement.setAttribute("scope", "col");
      theadHashElement.textContent = "#";
      dateRow.appendChild(theadHashElement);

      for (let i = 6; i >= 0; i--) {
        const theadElement = document.createElement("th");
        const currentDate = new Date(endDate);
        const dayOffset = i;
        const day = currentDate.getDate() - dayOffset;
        const formattedDate = day < 10 ? `0${day}` : day;
        const month = currentDate.getMonth() + 1;
        theadElement.innerHTML = `${formattedDate}/ ${month}`;
        theadElement.setAttribute("scope", "col");
        theadElement.classList.add("text-center");
        dateRow.appendChild(theadElement);
        thead.appendChild(dateRow);
      }
      tableElement.appendChild(thead);

      habits.forEach((habit) => {
        const habitRow = document.createElement("tr");
        habitRow.setAttribute("scope", "row");

        const habitNameCell = document.createElement("th");
        habitNameCell.setAttribute("scope", "row");
        habitNameCell.textContent = habit.habit;
        habitRow.appendChild(habitNameCell);

        for (let i = 6; i >= 0; i--) {
          const dateCell = document.createElement("td");
          const recordDate = new Date(endDate);
          const dayOffset = i;
          recordDate.setDate(recordDate.getDate() - dayOffset);
          const foundRecord = habit.habitRecord.find((record) => {
            const recordDateObj = new Date(record.date);
            return recordDateObj.getDate() === recordDate.getDate();
          });

          if (foundRecord) {
            const habitStatusSelect = document.createElement("select");
            habitStatusSelect.classList.add(
              "form-select",
              "form-select-sm",
              "habitStatusSelect",
              "d-inline"
            );
            habitStatusSelect.setAttribute("name", "status");
            habitStatusSelect.setAttribute("aria-label", "habit status");
            habitStatusSelect.setAttribute("data-habit-id", habit._id);
            habitStatusSelect.addEventListener("change", handleValueChange);

            const options = [
              {
                value: "none",
                text: "none",
                selected: foundRecord.status === "none",
              },
              {
                value: "yes",
                text: "yes",
                selected: foundRecord.status === "yes",
              },
              {
                value: "no",
                text: "no",
                selected: foundRecord.status === "no",
              },
            ];

            options.forEach((option) => {
              const optionElement = document.createElement("option");
              optionElement.setAttribute(
                "data-habit-record-id",
                foundRecord._id
              );
              optionElement.textContent = option.text;
              optionElement.value = option.value;
              if (option.selected) {
                optionElement.selected = true;
              }
              habitStatusSelect.appendChild(optionElement);
            });

            dateCell.appendChild(habitStatusSelect);
          } else {
            dateCell.textContent = "no records";
          }
          habitRow.appendChild(dateCell);
        }
        tbody.appendChild(habitRow);
      });
      tableElement.appendChild(tbody);
    })
    .catch((error) => {
      console.log(error);
      throw new Error("Error while getting week data");
    });
};

// To get previous week data
previousWeekButton.addEventListener("click", () => {
  currentWeekNumber++;
  updateWeekView(currentWeekNumber);
  if (currentWeekNumber === 0) {
    nextWeekButton.disabled = true;
  } else if (currentWeekNumber !== 0) {
    nextWeekButton.disabled = false;
  }
});

if (currentWeekNumber === 0) {
  nextWeekButton.disabled = true;
} else if (currentWeekNumber !== 0) {
  nextWeekButton.disabled = false;
}

nextWeekButton.addEventListener("click", () => {
  currentWeekNumber--;
  updateWeekView(currentWeekNumber);
  if (currentWeekNumber === 0) {
    nextWeekButton.disabled = true;
  } else if (currentWeekNumber !== 0) {
    nextWeekButton.disabled = false;
  }
});

viewLinks.forEach((link) => {
  if (link.href.endsWith(currentURL)) {
    link.style.backgroundColor = "black";
  }
});

if (currentURL === "/addHabit") {
  viewLinks[0].style.backgroundColor = "black";
}

if (currentURL === "/weekView") {
  previousWeekButton.style.display = "inline-block";
  nextWeekButton.style.display = "inline-block";
} else {
  previousWeekButton.style.display = "none";
  nextWeekButton.style.display = "none";
}

selectElement.forEach((selectElement) => {
  selectElement.addEventListener("change", handleValueChange);
});

// For updating habit status
async function handleValueChange(event) {
  try {
    const status = event.target.value;
    const habitId = event.target.dataset.habitId;
    const recordId = event.target.selectedOptions[0].dataset.habitRecordId;
    const response = await fetch("/habitStatusUpdate", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        status,
        habitId,
        recordId,
      }),
    });
    if (response.ok) {
      location.reload();
    }
  } catch (error) {
    throw new Error("error while updating the status");
  }
}

// For deleting habit
function deleteHabit(habitId) {
  fetch("/deleteHabit/" + habitId, {
    method: "DELETE",
  })
    .then((res) => {
      if (res.redirected) {
        location.reload();
      }
    })
    .catch((err) => {
      throw new Error("error while deleting the job");
    });
}

function bestStreak(records) {
  records.filter((record) => record.status === "yes").length;
}
