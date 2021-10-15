const form = document.querySelector('form')
const addBtn = document.querySelector('form > button')
const input = document.querySelector('#input')
const list = document.querySelector('.list')
const listComplete = document.querySelector('.list-complete')
const listCount = document.querySelector('.list-count')
const listCompleteCount = document.querySelector('.list-complete-count')
const clearAllTask = document.querySelector('.clear')



displayTaskList()
displayCompletedTask()


addBtn.addEventListener('click',(e)=>{
    e.preventDefault()

    let task = input.value;

    if(task.length !== 0){
        addTask(task)
    }

    input.value = ''
})

form.addEventListener('submit',(e)=>{
    e.preventDefault()

    let task = input.value;

    if(task.length !== 0){
        addTask(task)
    }

    input.value = ''
})

function addTask(input){
    const currentData = JSON.parse(localStorage.getItem('tasks'))

    if(currentData == null){
        newTask = []
    }else{
        newTask = currentData;
    }

    const taskList = document.querySelector('.task-list')

    newTask.push(
        {
            id:generateNewID(),
            text:input,
            complete:false}
        )


    localStorage.setItem('tasks',JSON.stringify(newTask))
    
    

    displayTaskList()
    


}


function generateNewID(){
    let str = '1234567890'
    let id = ''
    for(let i = 0; i < 4; i++){
        id+=str.charAt(Math.floor(Math.random()*str.length))
    }
    return id;
}



function displayTaskList(){

    const currentData = JSON.parse(localStorage.getItem('tasks'))

    
    if(currentData == null){
        newTask = []
    }else{
        newTask = currentData.filter((check)=> check.complete == false);
    }

    let li = ``
    newTask.forEach((task,index) => {
        li += `<li class="task-list" id="${task.id}">
                ${task.text}
                <div class="action">
                    <button class="check"><i class="fas fa-check"></i></button>
                    <button class="trash"><i class="fas fa-trash"></i></button>
                </div>
            </li>`
    })

    list.innerHTML = li;
    

    const checkBtns = document.querySelectorAll('.check')

    checkBtns.forEach((btn)=>{
        btn.addEventListener('click',(el)=>{
            const id = el.target.parentElement.parentElement.parentElement.id;

            localStorage.setItem('tasks',JSON.stringify(checkTask(id,currentData)))

            displayTaskList()
            displayCompletedTask()
        })
    })

    const trashBtns = document.querySelectorAll('.trash')

    trashBtns.forEach((btn)=>{
        btn.addEventListener('click',(el)=>{
            const id = el.target.parentElement.parentElement.parentElement.id;
            const li = el.target.parentElement.parentElement.parentElement;
            li.classList.add('fall')

            console.log(li)
            li.addEventListener('transitionend',()=>{
                localStorage.setItem('tasks',JSON.stringify(deleteTask(id,currentData)))
                displayTaskList()
                displayCompletedTask()
            })
        })
    })


    let cc = newTask.filter((e=>e.complete==false)).length
    
    listCount.innerHTML = `${cc} task`

    

}

function displayCompletedTask(){
    const currentData = JSON.parse(localStorage.getItem('tasks'))

    
    if(currentData == null){
        newTask = []
    }else{
        newTask = currentData.filter((check)=> check.complete == true);
    }

    let li = ``
    newTask.forEach((task,index) => {
        li += `<li class="task-list" id="${task.id}">
                ${task.text}
                <div class="action">
                    <button class="undo"><i class="fas fa-undo"></i></button>
                    <button class="trash"><i class="fas fa-trash"></i></button>
                </div>
            </li>`
    })

    listComplete.innerHTML = li;

    const trashBtns = document.querySelectorAll('.trash')

    trashBtns.forEach((btn)=>{
        btn.addEventListener('click',(el)=>{
            const id = el.target.parentElement.parentElement.parentElement.id;
            const li = el.target.parentElement.parentElement.parentElement;
            li.classList.add('fall')

            console.log(li)
            li.addEventListener('transitionend',()=>{
                localStorage.setItem('tasks',JSON.stringify(deleteTask(id,currentData)))
                displayTaskList()
                displayCompletedTask()
            })
            
        })
    })
    const undoBtns = document.querySelectorAll('.undo')

    undoBtns.forEach((btn)=>{
        btn.addEventListener('click',(el)=>{
            const id = el.target.parentElement.parentElement.parentElement.id;

            localStorage.setItem('tasks',JSON.stringify(undoTask(id,currentData)))
            
            displayTaskList()
            displayCompletedTask()
        })
    })

    let cc = newTask.filter((e=>e.complete==true)).length

    listCompleteCount.innerHTML = `${cc} completed task`

    if(cc > 0){
        clearAllTask.innerHTML = `<button id="clearBtn">Clear All Complete Task </button>`;

        const clearBtn = document.querySelector('#clearBtn').addEventListener('click',
        ()=>{
            let deleteComplete = currentData.filter((e=>e.complete==false))
            localStorage.setItem('tasks',JSON.stringify(deleteComplete))
            displayTaskList()
            displayCompletedTask()
        })
    }else{
        clearAllTask.innerHTML = ''
    }
        
}



function checkTask(id,currentData){
    let checkArr = currentData.map((e)=>{
        return {id:e.id,
                text: e.text,
                complete: e.id==id.trim()?true:e.complete }
    })
    return checkArr;
}
function undoTask(id,currentData){
    let checkArr = currentData.map((e)=>{
        return {id:e.id,
                text: e.text,
                complete: e.id==id.trim()?false:e.complete }
    })
    return checkArr;
}
function deleteTask(id,currentData){
    return currentData.filter(e => e.id !== id.trim())
}


function displayListCount(currentData){
    let listCount = document.querySelector('.list-count');
    
    return listCount = newTask.length;
}








