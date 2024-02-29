const notesIcon = document.getElementById('notesIcon');
const notesContainer = document.getElementById('notesContainer');
const nestednote = document.querySelector('.nested-notes');
const createbtn = document.querySelector('.btn');
const notes = document.querySelector('.input-box');



let isNotesOpen = false;
let isDragging = false;
let offsetX, offsetY;
let notesList = [];

// Toggle Notes Container
notesIcon.addEventListener('click', () => {
  isNotesOpen = !isNotesOpen;
  if (isNotesOpen) {
    notesContainer.classList.add('active');
    newNoteSection.style.display = 'block';
    savedNotesSection.style.display = 'none';
  } else {
    notesContainer.classList.remove('active');
  }
});

// Move Notes Container
notesContainer.addEventListener('mousedown', (e) => {
  isDragging = true;
  offsetX = e.offsetX;
  offsetY = e.offsetY;
});

document.addEventListener('mousemove', (e) => {
  if (isDragging) {
    const x = e.clientX - offsetX;
    const y = e.clientY - offsetY;
    notesContainer.style.left = `${x}px`;
    notesContainer.style.top = `${y}px`;
  }
});

document.addEventListener('mouseup', () => {
  isDragging = false;
});

function showNotes(){
  nestednote.innerHTML=localStorage.getItem("notes")
}
showNotes();
function updateStorage(){
  localStorage.setItem("notes",nestednote.innerHTML)
}

createbtn.addEventListener("click",()=>{
 let inputBox=document.createElement("p");
 let img=document.createElement("img");
 inputBox.className="input-box";
 inputBox.setAttribute("contenteditable","true");
 img.src="del.png";

nestednote.appendChild(inputBox).appendChild(img)


})

nestednote.addEventListener("click",function(e){
 if (e.target.tagName=="IMG"){
  e.target.parentElement.remove();
  updateStorage();
 }
else if (e.target.tagName==="p"){
  notes=document.querySelectorAll(".input-box");
  notes.forEach(nt=>{
    nt.onkeyup=function(){
      updateStorage();
    }
  })
}

})

document.addEventListener("keydown",event=>{
  if(event.key==="Enter"){
    document.execCommand("insertLineBreak");
    event.preventDefault();
  }
})

