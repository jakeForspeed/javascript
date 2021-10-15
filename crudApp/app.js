const showModal = document.querySelector('.showAddModal')
const addModal = document.querySelector('.addModal')
const closeModal = document.querySelectorAll('.fa-window-close')
const addform = document.querySelector('.add-form')
const editform = document.querySelector('.edit-form')
const editModal = document.querySelector('.editModal');
const tbody = document.querySelector('.tbody')

const key = document.getElementById('key');

key.addEventListener('keyup',(e)=>{

    let crud = getCurrentData()

    buildTable(searchTable(e.target.value,crud))
    
})

function searchTable(value,data){
    let filterData = []

    for(let i = 0; i < data.length; i++){

        value = value.toLowerCase();

        let name = data[i].firstname.toLowerCase()

        if(name.includes(value)){

            filterData.push(data[i])

        }
    }
    return filterData

}
function buildTable(data){ 

    tbody.innerHTML = ''

    let row = ''
    for(let i = 0; i < data.length; i++){
        
        
        row += `<tr>
                        <td id="primaryKey">${data[i].id}
                        <td>${data[i].role}</td>
                        <td>${data[i].firstname}</td>
                        <td>${data[i].middlename}</td>
                        <td>${data[i].lastname}</td>
                        <td>${data[i].address}</td>
                        <td>${data[i].email}</td>
                        <td>${data[i].dateRegistered}</td>
                        <td>${data[i].timeRegistered}</td>
                        <td>
                            <button class="edit">edit</button>
                            <button class="remove">remove</button>
                        </td>
                    </tr>`
        
    }
    tbody.innerHTML = row;
    editBtnFunction()
    saveBtnFunction()

}


displayTableData()


showModal.addEventListener('click', () => {
    addModal.style.transform = 'translateY(calc(650px)';
})
closeModal.forEach((close) => {
    close.addEventListener('click', () => {
        addModal.style.transform = 'translateY(-500px)';
        editModal.style.transform = 'translateY(-500px)';
    })
})

addform.addEventListener('click', (e) => {
    e.preventDefault()
})
editform.addEventListener('click', (e) => {
    e.preventDefault()
})


/* add data */
const addFirstname = document.getElementById('add_firstName')
const addMiddlename = document.getElementById('add_middleName')
const addLastname = document.getElementById('add_lastName')
const addEmail = document.getElementById('add_email')
const addAddress = document.getElementById('add_address')
const addRole = document.getElementById('add_role')
const addBtnData = document.querySelector('.addBtnData')
const ad = document.querySelectorAll('.d')



addBtnData.addEventListener('click', () => {


    let dataCheck = [addFirstname.value, addMiddlename.value, addLastname.value, addEmail.value, addAddress.value, addRole.value].every((e) => {
        return e !== ''
    })

    if (dataCheck) {
        
        let crud = getCurrentData()

        let date = new Date()
        let time = date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds()


        let str = '1234567890';
        let gid = '';
        for(let i =0;i<4;i++){
            gid += str[Math.floor(Math.random()*str.length)]
        }

        crud.push({
            id: gid,
            role: addRole.value,
            firstname: addFirstname.value,
            middlename: addMiddlename.value,
            lastname: addLastname.value,
            email: addEmail.value,
            address: addAddress.value,
            dateRegistered: date.toDateString(),
            timeRegistered: time
        })
        crud.sort((a,b) => a.firstname.length - b.firstname.length)
        localStorage.setItem('crud', JSON.stringify(crud))


        addform.reset();


        // addModal.style.transform = 'translateY(-500px)';
    }

    displayTableData()
})


function displayTableData() {
    
    const currentData = getCurrentData()

    let tr = '';

    crud.sort((a,b) => a.firstname.length - b.firstname.length)

    crud.forEach((data) => {
        tr += `<tr>
                <td id="primaryKey">${data.id}
                <td>${data.role}</td>
                <td>${data.firstname}</td>
                <td>${data.middlename}</td>
                <td>${data.lastname}</td>
                <td>${data.address}</td>
                <td>${data.email}</td>
                <td>${data.dateRegistered}</td>
                <td>${data.timeRegistered}</td>
                <td>
                    <button class="edit">edit</button>
                    <button class="remove">remove</button>
                </td>
            </tr>`
    })

    tbody.innerHTML = tr;

    editBtnFunction()
    saveBtnFunction()


    

    
}

function getCurrentData(){
    const currentData = JSON.parse(localStorage.getItem('crud'))
    if (currentData == null) {
        crud = []
    } else {
        crud = currentData;
    }
    return crud;
}


function editBtnFunction(){

    const removeBtn = document.querySelectorAll('.remove')
    
    removeBtn.forEach((remove)=>{
        remove.addEventListener('click',(e)=>{
            let id = (e.target.parentElement.parentElement.cells[0].innerHTML).trim();

            const newData = JSON.parse(localStorage.getItem('crud')).filter(d=>d.id!==id)
            newData.sort((a,b) => a.firstname.length - b.firstname.length)
            localStorage.setItem('crud',JSON.stringify(newData))
            displayTableData()
        })
    })
}


function saveBtnFunction(){
    
    const editBtn = document.querySelectorAll('.edit')

    editBtn.forEach((edit) => {
        edit.addEventListener('click', (e) => {
            editModal.style.transform = 'translateY(calc(650px)';
            let id = (e.target.parentElement.parentElement.cells[0].innerHTML).trim();
            let date = (e.target.parentElement.parentElement.cells[7].innerHTML).trim();
            let time = (e.target.parentElement.parentElement.cells[8].innerHTML).trim();

            const editDating = JSON.parse(localStorage.getItem('crud')).filter((ed) => ed.id == id)

            let dataInput = `<input id="edit_firstName" value="${editDating[0].firstname}" type="text" placeholder="FirstName">
                            <input id="edit_middleName" value="${editDating[0].middlename}" type="text" placeholder="MiddleName">
                            <input id="edit_lastName" value="${editDating[0].lastname}" type="text" placeholder="LastName">
                            <input id="edit_email" value="${editDating[0].email}" type="text" placeholder="Email">
                            <textarea id="edit_address">${editDating[0].address}</textarea>
                            <select id="edit_role">
                                <option value="admin">Admin</option>
                                <option value="ceo">CEO</option>
                                <option value="manager">Manager</option>
                            </select>
                            <button class="saveEditbtn" type="submit">Save</button>`

            editform.innerHTML = dataInput
            // function selVal(id, val) {
            //     document.getElementById(id).value = val
            // }

            document.getElementById('edit_role').value = editDating[0].role

            // selVal('edit_role', editDating[0].role)

            const saveEditBtn = document.querySelector('.saveEditbtn');

            saveEditBtn.addEventListener('click', () => {
                const editFirstname = document.getElementById('edit_firstName')
                const editMiddlename = document.getElementById('edit_middleName')
                const editLastname = document.getElementById('edit_lastName')
                const editEmail = document.getElementById('edit_email')
                const editAddress = document.getElementById('edit_address')
                const editRole = document.getElementById('edit_role')

                let dataCheck = [editFirstname.value, editMiddlename.value, editLastname.value, editEmail.value, editAddress.value, editRole.value].every((e) => {
                    return e !== ''
                })

                if (dataCheck) {

                    let data = JSON.parse(localStorage.getItem('crud')).filter((d) => d.id !== id)

                    let date = new Date()
                    let time = date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds()

                    data.push({
                        id: id,
                        role: editRole.value,
                        firstname: editFirstname.value,
                        middlename: editMiddlename.value,
                        lastname: editLastname.value,
                        email: editEmail.value,
                        address: editAddress.value,
                        dateRegistered: date.toDateString(),
                        timeRegistered: time.toString()
                    })
                    data.sort((a,b) => a.firstname.length - b.firstname.length)
                    localStorage.setItem('crud', JSON.stringify(data))

                    editform.reset()

                    key.value=''
                    displayTableData()
                    editModal.style.transform = 'translateY(-500px)';
                }
            })
        })
    })
}
