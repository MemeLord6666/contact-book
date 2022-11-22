let btn = document.querySelector(".btn");
let inp = document.querySelector(".inputC1");
let inp2 = document.querySelector(".inputC2");
let inp3 = document.querySelector(".inputC3");
let list = document.querySelector(".contact-list");
btn.addEventListener("click", (e)=>{
    if(!inp.value.trim()){
        alert("Заполните все поля!");
        return;
    }
    else if(!inp2.value.trim()){
        alert("Заполните все поля!");
        return;
    }
    else if(!inp3.value.trim()){
        alert("Заполните все поля!");
        return;
    }
    let obj = {
        name: inp.value,
        email: inp2.value,
        image: inp3.value,
        };
        setItemToStorage(obj);
        createElement();
        inp.value = "";
        inp2.value = "";
        inp3.value = "";

    });

createElement();

function setItemToStorage(cont){
    let data = JSON.parse(localStorage.getItem("cont-data"));
    data.push(cont);
    localStorage.setItem("cont-data", JSON.stringify(data));
}
function createElement(){
    list.innerHTML = "";
    if(!localStorage.getItem("cont-data")){
localStorage.setItem("cont-data", "[]");
    }

let newData = JSON.parse(localStorage.getItem("cont-data"));
newData.forEach((item, index) => {
    let td = document.createElement("td");
    let btnEdit = document.createElement("button");
    let btnDelete = document.createElement("button");

    td.innerHTML = `<th>name:${item.name}</th>,  <th>email:${item.email}</th>    imageUrl:<img src=${item.image}></img> `;
    btnEdit.innerText="Edit";
    btnDelete.innerText = "Delete";
    td.append(btnEdit)
    td.appendChild(btnDelete);
    btnDelete.addEventListener("click", ()=>{
        deleteElement(index);
    });

    btnEdit.addEventListener("click", ()=>{
        editElement(index, item);
    });
    list.appendChild(td);
    

});
}

function deleteElement(index){
    let data = JSON.parse(localStorage.getItem("cont-data"));
    data.splice(index, 1);
    localStorage.setItem("cont-data", JSON.stringify(data));
    createElement();
}

let mainModal = document.querySelector(".main-modal");
let inpEdit = document.querySelector(".inp-edit");
let inpEdit1 = document.querySelector(".inp-edit1");
let inpEdit2 = document.querySelector(".inp-edit2");
let btnCloser = document.querySelector(".btn-closer");

function editElement(index, item){
mainModal.style.display = "block";
inpEdit.setAttribute("id", index);
inpEdit.value = item.name;
inpEdit1.setAttribute("id", index);
inpEdit1.value = item.email;
inpEdit2.setAttribute("id", index);
inpEdit2.value = item.image;
}

let btnSave = document.querySelector(".btn-save");
btnSave.addEventListener("click", ()=>{
    let data = JSON.parse(localStorage.getItem("cont-data"));
    let index = inpEdit.id;
    if(!inpEdit.value.trim()){
        alert("заполните поле!");
        return;
    }
    let newBook = {
        name: inpEdit.value,
        email: inpEdit1.value,
        image: inpEdit2.value,
        };
        data.splice(index,1,newBook);
        localStorage.setItem("cont-data", JSON.stringify(data));
        mainModal.style.display="none";
        createElement();
})


btnCloser.addEventListener("click", ()=>{
    mainModal.style.display="none";
})