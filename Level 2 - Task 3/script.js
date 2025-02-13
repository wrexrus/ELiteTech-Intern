const input = document.querySelector('#input-box');
const listContainer = document.querySelector('#list-container');

function addTask(){
    if(input.value === ''){
        alert("Write Task!!");
    }
    else{
        let li = document.createElement("li");
        let timestamp = new Date().toLocaleString(); // Get current date and time
        
        li.innerHTML = `${input.value} <div class='timestamp'>[Added: ${timestamp}]</div>`;
        listContainer.appendChild(li);
        
        let span = document.createElement("span");
        span.innerHTML = "\u00d7";
        li.appendChild(span);
    }
    input.value = '';
    saveData();
}

listContainer.addEventListener("click", function(e){
    if(e.target.tagName === "LI"){
        e.target.classList.toggle("checked");
        
        let timestamp = new Date().toLocaleString();
        let timestampSpan = e.target.querySelector('.timestamp');
        if (e.target.classList.contains("checked")) {
            timestampSpan.innerHTML = `[Completed: ${timestamp}]`;
        } else {
            timestampSpan.innerHTML = `[    Added: ${timestamp}]`;
        }
        saveData();
    }
    else if(e.target.tagName === "SPAN"){
        e.target.parentElement.remove();
        saveData();
    }
}, false);

function saveData(){
    localStorage.setItem("data", listContainer.innerHTML);
}

function showTask(){
    listContainer.innerHTML = localStorage.getItem("data");
}

showTask();

