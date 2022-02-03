fetch("./assets/actors.json")
  .then((response) => response.json())
  .then(showActors);

fetch("./assets/actors.json")
  .then((response) => response.json())
  .then(filters);

function removeAdd() {
  document.querySelector(".actor-grid").remove();

  const newCards = document.createElement("section");
  newCards.classList.add("actor-grid");

  document.querySelector("main").appendChild(newCards);
}

function filterByValue(array, string) {
  return array.filter((o) => Object.keys(o).some((k) => o[k].includes(string)));
}

function filters(origin) {
  origin.forEach((e) => {
    const fname = e.fullname.split(" ")[0];
    const lastNames = e.fullname.split(" ");
    const lname = lastNames[lastNames.length - 1];

    e.firstname = fname;
    e.lastname = lname;
  });

  document.querySelector("#pulp").addEventListener("click", () => {
    removeAdd();

    showActors(filterByValue(origin, "Pulp Fiction"));
  });

  document.querySelector("#fight").addEventListener("click", () => {
    removeAdd();

    showActors(filterByValue(origin, "Fight Club"));
  });

  document.querySelector("#good").addEventListener("click", () => {
    removeAdd();

    showActors(filterByValue(origin, "Goodfellas"));
  });

  document.querySelector("#inception").addEventListener("click", () => {
    removeAdd();

    showActors(filterByValue(origin, "Inception"));
  });

  document.querySelector("#all").addEventListener("click", () => {
    removeAdd();

    showActors(filterByValue(origin, ""));
  });

  document.querySelector("#last-az").addEventListener("click", () => {
    removeAdd();
    function sortLastaz(x, y) {
      if (x.lastname < y.lastname) {
        return -1;
      }
      if (x.lastname > y.lastname) {
        return 1;
      }
      return 0;
    }

    showActors(origin.sort(sortLastaz));
  });

  document.querySelector("#first-az").addEventListener("click", () => {
    removeAdd();
    function sortFirstaz(x, y) {
      if (x.firstname < y.firstname) {
        return -1;
      }
      if (x.firstname > y.firstname) {
        return 1;
      }
      return 0;
    }

    showActors(origin.sort(sortFirstaz));
  });

  document.querySelector("#last-za").addEventListener("click", () => {
    removeAdd();
    function sortLastza(x, y) {
      if (x.lastname > y.lastname) {
        return -1;
      }
      if (x.lastname < y.lastname) {
        return 1;
      }
      return 0;
    }

    showActors(origin.sort(sortLastza));
  });

  document.querySelector("#first-za").addEventListener("click", () => {
    removeAdd();
    function sortFirstza(x, y) {
      if (x.firstname > y.firstname) {
        return -1;
      }
      if (x.firstname < y.firstname) {
        return 1;
      }
      return 0;
    }

    showActors(origin.sort(sortFirstza));
  });
}

function showActors(actors) {
  actors.forEach((e) => {
    const temp = document.querySelector("#card-template").content;
    const clone = temp.cloneNode(true);
    const btn = clone.querySelector(".actor-card");
    const card = clone.querySelector(".actor-card");

    clone.querySelector("h2").innerText = e.fullname;
    clone.querySelector("p").innerText = e.movie;

    if (e.movie === "Fight Club") {
      card.classList.add("fight-club-background");
    } else if (e.movie === "Goodfellas") {
      card.classList.add("goodfellas-background");
    } else if (e.movie === "Inception") {
      card.classList.add("inception-background");
    }

    btn.addEventListener("click", () => {
      const popTemp = document.querySelector("#pop").content;
      const popClone = popTemp.cloneNode(true);
      const modal = popClone.getElementById("myModal");
      const span = popClone.querySelector(".close");

      modal.style.display = "block";

      span.onclick = function () {
        modal.style.display = "none";
      };

      window.onclick = function (event) {
        if (event.target == modal) {
          modal.style.display = "none";
        }
      };
      popClone.querySelector("h2").innerText = e.fullname;
      popClone.querySelector("#movie").innerText = `Movie: ${e.movie}`;

      document.querySelector(".actor-grid").appendChild(popClone);
    });

    document.querySelector(".actor-grid").appendChild(clone);
  });
}
