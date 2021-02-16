zen.employees = [
  {
    name: "Akhil",
    lastUpdated: new Date().getTime(),
  },
];

zen.rickAndMorty = [
  {
    name: "Rick",
    lastUpdated: new Date().getTime(),
  },
];

const zenFor = {
  get elem() {
    return document.querySelector("zen-for");
  },
};

zenFor.elem.addEventListener("init-complete", () => {
  console.log("Element Initialised");
});

zenFor.elem.addEventListener("remove-complete", () => {
  console.log("Element Removed");
});

zenFor.elem.addEventListener("attribute-change-complete", () => {
  console.log("Attribute Changed!");
});

zenFor.elem.setAttribute("list", "employees");

zenFor.elem.addEventListener("render-complete", () => {
  console.log("Render Complete!");
  zenFor.elem.classList.add("changed");
  setTimeout(() => {
    zenFor.elem.classList.remove("changed");
  }, 200);
});

setTimeout(() => {
  zen.rickAndMorty[0].lastUpdated = new Date().getTime();
  zenFor.elem.setAttribute("list", "rickAndMorty");
}, 3000);

const cast = [
  "Summer",
  "Morty",
  "Beth",
  "Squanchy",
  "Jerry",
  "Jessica",
  "Mr. PoopyButtHole",
  "Birdperson",
  "Pickled Rick",
  "Unity",
];

function addEmployee() {
  const newEmp = {
    name: cast[Math.floor(Math.random() * cast.length)],
    lastUpdated: new Date().getTime(),
  };
  zen.rickAndMorty.push(newEmp);
  zenFor.elem.renderContent().then(() => {
    window.scrollTo(0, document.querySelector(".wrapper").scrollHeight);
  });
}

function removeElem() {
  zenFor.elem.remove();
}
