const cards = document.querySelectorAll(".cards");
const modal = document.querySelector(".modal");
const addBtn = document.querySelectorAll("#add-btn");
const form = document.querySelector("form");
const card = document.querySelectorAll(".card");
let id = 1;

let data = [
  {
    id: "id1",
    title: "Hello",
    description: "shsfhsfh",
    status: "To do",
    priority: "1",
  },
];

const setData = (arr) => {
  data = arr;
  render();
};

const render = () => {
  cards.forEach((card) => {
    card.innerHTML = "";
  });
  data.forEach((item) => {
    if (item.status === "To do") {
      cards[0].innerHTML += Card(item);
    } else if (item.status === "In progress") {
      cards[1].innerHTML += Card(item);
    } else if (item.status === "Stuck") {
      cards[2].innerHTML += Card(item);
    } else if (item.status === "Done") {
      cards[3].innerHTML += Card(item);
      const buttoncheck = document.querySelectorAll(".left");
      buttoncheck.forEach((element) => {
        element.style.background = "green";
      });
    }
  });

  const deletetask = document.querySelectorAll(".deletetask");
  deletetask.forEach((item) => {
    item.addEventListener("click", () => {
      const id = item.id;
      console.log(id);
      const newDatas = data.filter((e) => {
        return e.id !== id;
      });
      setData(newDatas);
    });
  });

  const checkbutton = document.querySelectorAll(".left");
  checkbutton.forEach((bttns) => {
    bttns.addEventListener("click", () => {
      bttns.style.background = "green";
      const done = document.querySelector(".done").textContent;
      bttns.status = done;
      console.log(bttns.id);
      return bttns;
    });
  });

  const carddrag = document.querySelectorAll(".card");
  carddrag.forEach((dragable) => {
    dragable.addEventListener("dragstart", (event) => {
      event.dataTransfer.setData("text", event.target.id);
    });
  });
};

const Card = (props) => {
  return `
 <div class="card" id="${props.id}" draggable="true">

 <div class="left border" id="${props.id}">
 <i class="fa-solid fa-check"></i>
</div>
<div class="middle">
   <h3 class="task-name">${props.title}</h3>
   <p class="task">${props.desc}</p>
   <p class="status">${props.status}</p>
   

</div>
<div class="right">
       <div class="border deletetask" id="${props.id}" >
           <i class="fa-solid fa-xmark"></i>
       </div>
   <div class="bordernote">
       <i class="fa-solid fa-file-pen"></i>
   </div>
</div>
 
 </div>
 `;
};

render();

addBtn.forEach((a) => {
  a.addEventListener("click", () => {
    modal.style.display = "flex";
  });
});

form.addEventListener("submit", (event) => {
  event.preventDefault();

  id++;

  const { elements } = event.target;
  console.log(elements);
  const desc = elements["desc"].value;
  const title = elements["title"].value;
  const status = elements.status.value;
  const newData = [...data, { title, desc, status, id: "id" + id }];
  // id++;
  setData(newData);

  modal.style.display = "none";
});

const boards = document.querySelectorAll(".board");
boards.forEach((board) => {
  board.addEventListener("dragover", (event) => {
    event.preventDefault();
  });

  board.addEventListener("drop", (event) => {
    const status = board.querySelector("h2").textContent;

    const id = event.dataTransfer.getData("text");

    const newData = data.map((item) => {
      if (item.id === id) {
        item.status = status;
      }
      return item;
    });

    console.log(newData);

    setData(newData);
  });
});
