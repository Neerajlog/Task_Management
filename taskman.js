const taskContainer = document.querySelector(".task__container");
let globalTaskData = [];

const generateHTML = (taskData) => ` <div id=${taskData.id} class="col-md-6 col-lg-4s my-4">
<div class="card">
  <div class="card-header gap-2 d-flex justify-content-end">
    <button class="btn btn-outline-info"  name=${taskData.id} onclick="edit.apply(this,arguments)">
      <i class="fal fa-pencil"  name=${taskData.id}></i>
    </button>
    <button class="btn btn-outline-danger" name=${taskData.id} onclick="deleteCard.apply(this,arguments)">
      <i class="far fa-trash-alt"  name=${taskData.id}></i>
    </button>
  </div>
  <div class="card-body">
    <img
      src=${taskData.image}
      alt="image"
      class="card-img"
    />
    <h5 class="card-title mt-4">${taskData.title}</h5>
    <p class="card-text">
      ${taskData.description}
    </p>
    <span class="badge bg-primary">${taskData.type}</span>
  </div>
  <div class="card-footer">
    <button class="btn btn-outline-primary">Open Task</button>
  </div>
</div>
</div>`;

const insertToDOM = (content) =>
  taskContainer.insertAdjacentHTML("beforeend", content);

const addNewCard = () => {
  // get task data
  const taskData = {
    id: `${Math.random()}`,
    title: document.getElementById("taskTitle").value,
    image: document.getElementById("imageURL").value,
    type: document.getElementById("taskType").value,
    description: document.getElementById("taskDescription").value,
  };

  globalTaskData.push(taskData);
  console.log(globalTaskData);

  // update the localstorage
  localStorage.setItem("taskyCA", JSON.stringify({ card: globalTaskData }));

  const newCard = generateHTML(taskData);

 // console.log(newCard);
  insertToDOM(newCard);

  // clear the form
  document.getElementById("taskTitle").value = "";
  document.getElementById("imageURL").value = "";
  document.getElementById("taskType").value = "";
  document.getElementById("taskDescription").value = "";

  return;
};

//when we load our page
const loadExistingCards = () => {
  // check localstorage
  const getData = localStorage.getItem("taskyCA");

  // parse JSON data, if exist
  if (!getData) return;

  const taskCards = JSON.parse(getData);

  globalTaskData = taskCards.card;

  globalTaskData.map((taskData) => {
    const newCard = generateHTML(taskData);
    insertToDOM(newCard);
  });

  return;
};



const deleteCard=(event)=>{
  const targetId=event.target.getAttribute("name");
  const elementtype=event.target.tagName;

  const removetask=globalTaskData.filter((task)=> task.id!==targetId);
  globalTaskData=removetask;

  localStorage.setItem("taskyCA",JSON.stringify({card:globalTaskData}));

  if(elementtype==="BUTTON"){
    return taskContainer.removeChild(
      event.target.parentNode.parentNode.parentNode
    );
  } else{
    return taskContainer.removeChild(
      event.target.parentNode.parentNode.parentNode.parentNode
    );
    }
  };

  const edit=(event)=>{
  //  const targetId=event.target.getAttribute("name");
    const elementtype=event.target.tagName;

    let taskTitle;
    let taskDescription;
    let taskType;
    let parentelement;
    let submitbutton;

    if(elementtype==="BUTTON"){
      parentelement=event.target.parentNode.parentNode;
    }else{
      parentelement=event.target.parentNode.parentNode.parentNode;
    }

   // console.log(parentelement.childNodes[5].childNodes[1]);

    taskTitle=parentelement.childNodes[3].childNodes[3];
    taskDescription=parentelement.childNodes[3].childNodes[5];
    taskType=parentelement.childNodes[3].childNodes[7];
    submitbutton=parentelement.childNodes[5].childNodes[1];

    //console.log(taskType,taskTitle,taskDescription,submitbutton);
    taskTitle.setAttribute("contenteditable","true");
    taskDescription.setAttribute("contenteditable","true");
    taskType.setAttribute("contenteditable","true");
    submitbutton.setAttribute("onclick","saveEdit.apply(this,arguments)");
    submitbutton.innerHTML="save Changes";
    
  }

  const saveEdit=(event)=>{
    const targetId=event.target.getAttribute("name");
    const elementtype=event.target.tagName;

   let parentelement;

    if(elementtype==="BUTTON"){
      parentelement=event.target.parentNode.parentNode;
    }else{
      parentelement=event.target.parentNode.parentNode.parentNode;
    }
    
    const taskTitle=parentelement.childNodes[3].childNodes[3];   // if we use innerhtml here we cannot able to use set aatribute here.
    const taskDescription=parentelement.childNodes[3].childNodes[5];
    const taskType=parentelement.childNodes[3].childNodes[7];
    const submitbutton=parentelement.childNodes[5].childNodes[1];

  const updateData={
    title:taskTitle.innerHTML,
    type:taskType.innerHTML,
    description:taskDescription.innerHTML,
  };

  globalTaskData.forEach((task)=>{
    if(task.id===targetId){
      return {...task,...updateData};
    }
    return task;
  });

  localStorage.setItem("taskyCA",JSON.stringify({card:globalTaskData}))

  taskTitle.setAttribute("contenteditable","false");
    taskDescription.setAttribute("contenteditable","false");
    taskType.setAttribute("contenteditable","false");
    submitbutton.innerHTML="Open task";


  }








// Strigify
// JS object -> JSON

// Parse
// JSON -> JS objects