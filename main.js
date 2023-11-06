const cards = document.querySelectorAll(".cards");
const modal = document.querySelector(".modal");
const addBtn = document.querySelector("#add-btn");
const form = document.querySelector("form");
const card = document.querySelectorAll(".card");
const statdiv = document.querySelectorAll(".status");
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
    } else if (item.status === "Stuck") {
      cards[2].innerHTML += Card(item);
    } else if (item.status === "Complete") {
      cards[3].innerHTML += Card(item);
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
 <div class="card" id="${props.id}" draggable="true">

 <div class="left border">
 <i class="fa-solid fa-check"></i>
</div>
<div class="middle">
   <h3 class="task-name">${props.title}</h3>
   <p class="task">${props.desc}</p>
   <p class="status">${props.status}</p>
   

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
  const desc = elements["desc"].value;
  const title = elements["title"].value;
  const status = elements.status.value;
  const newData = [...data, { title, desc, status, id: "id" + id }];
  id++;

  setData(newData);

  // const taskstitle = document.querySelectorAll(".task-name");
  // const checktask = document.querySelectorAll(".border");
  // for (let i = 0; i < checktask.length; i++) {
  //   checktask[i].addEventListener("click", () => {
  //     checktask[i].style.background = "green";
  //     for (let i = 0; i < taskstitle.length; i++) {
  //       taskstitle[i].style.textDecoration = "line-through";
  //     }
  //   });
  // }

  // const deletetask = document.querySelectorAll(".deletetask");
  // for (let i = 0; i < deletetask.length; i++) {
  //   deletetask[i].onclick = function () {
  //     this.parentNode.parentNode.remove();
  //   };
  // }

  modal.style.display = "none";
  for (let i = 0; i < card.length; i++) {
    if (status[i].innerHTML == "To do") {
      alert("todo");
    }
  }
});

// const cardsdrag = document.querySelectorAll(".cards");
// cardsdrag.forEach((box) => {
//   box.addEventListener("drop", (event) => {
//     event.preventDefault();
//     const id = event.dataTransfer.getData("text");
//     // const dragable = document.querySelector(`#${id}`);
//     setData(
//       data.map((item) => {
//         if (item.id === id) {
//           item.status = event.target.status;
//         }
//         return item;
//       })
//     );
//   });
//   box.addEventListener("dragover", function (event) {
//     if (event.target === this) {
//       event.preventDefault();
//     }
//   });
// });

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
// for (let i = 0; i < card.length; i++) {
//   if (card[i].value) {
//   }
// }
