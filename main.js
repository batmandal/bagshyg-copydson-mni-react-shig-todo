const cards = document.querySelectorAll(".cards");
const modal = document.querySelector(".modal");
const addBtn = document.querySelector("#add-btn");
const form = document.querySelector("form");

let id = 0;

let data = [
  {
    title: "Hello",
    description: "shsfhsfh",
    status: "To do",
    priority: "1",
  },
];
let data2 = [];

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
    }
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
 <div class="card" draggable="true">

 <div class="left border">
 <i class="fa-solid fa-check"></i>
</div>
<div class="middle">
   <h3 class="task-name">${props.title}</h3>
   <p class="task">${props.description}</p>
</div>
<div class="right">
       <div class="border deletetask">
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

addBtn.addEventListener("click", () => {
  modal.style.display = "flex";
});

form.addEventListener("submit", (event) => {
  event.preventDefault();

  id++;

  const { elements } = event.target;
  console.log(elements);
  const descx = elements["desc"].value;
  const titlex = elements["title"].value;
  const status = elements.status.value;
  const newData = [...data, { title: titlex, desc: descx, status }];

  setData(newData);

  //   const cardx = document.querySelectorAll(".card");
  //   cardx.id = "id";
  //   console.log(id);

  //   const taskstitle = document.querySelectorAll(".task-name");
  //   const checktask = document.querySelectorAll(".border");
  //   for (let i = 0; i < checktask.length; i++) {
  //     checktask[i].addEventListener("click", () => {
  //       checktask[i].style.background = "green";
  //       for (let i = 0; i < taskstitle.length; i++) {
  //         taskstitle[i].style.textDecoration = "line-through";
  //       }
  //     });
  //   }

  //   const deletetask = document.querySelectorAll(".deletetask");
  //   for (let i = 0; i < deletetask.length; i++) {
  //     deletetask[i].onclick = function () {
  //       this.parentNode.parentNode.remove();
  //     };
  //   }

  modal.style.display = "none";
});
const cardsdrag = document.querySelectorAll(".cards");

cardsdrag.forEach((box) => {
  box.addEventListener("drop", (event) => {
    event.preventDefault();
    const id = event.dataTransfer.getData("text");
    const dragable = document.querySelector(`#${id}`);
    event.target.appendChild(dragable);
  });
  box.addEventListener("dragover", function (event) {
    if (event.target === this) {
      event.preventDefault();
    }
  });
});
