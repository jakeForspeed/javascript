

const url = 'https://random-data-api.com/api/users/random_user?size=100'

const tbody = document.querySelector('tbody')
const paginationElement = document.getElementById('pagination')


let current_Page = 1
let rows_Per_Page = 5;

async function getRandomPerson(){

    const resp = await fetch(url)

    const respData = await resp.json()

    displayTableData(respData,tbody,rows_Per_Page,current_Page)
    setUpPagenation(respData,paginationElement,rows_Per_Page)

}


function displayTableData(datas,tbody,rows_Per_Page,current_Page){

    let tr = ''

    current_Page--

    let start_Page = rows_Per_Page * current_Page
    let end_Page = start_Page + rows_Per_Page
    let page_Item = datas.slice(start_Page, end_Page)



    page_Item.forEach(data => {
        tr += `<tr>
                    <td>${data.id}</td>
                    <td>${data.first_name}</td>
                    <td>${data.last_name}</td>
                    <td>${data.gender}</td>
                    <td>${data.date_of_birth}</td>
                    <td>${data.phone_number}</td>
                    <td>${data.email}</td>
                    <td>${data.address.city}</td>
                    <td>${data.address.country}</td>
                    <td><img width="50px" height="50px" src="${data.avatar}"></td>
                </tr>`
    });

    tbody.innerHTML = tr;
}


function setUpPagenation(datas,wrapper,rows_Per_Page){
    wrapper.innerHTML = ''
    let page_Count = Math.ceil(datas.length / rows_Per_Page)
    for(let i = 1; i < page_Count+1; i++){
        let btn = pagenationBtn(i,datas)
        wrapper.appendChild(btn)
    }
}

function pagenationBtn(page,datas){
    let btn = document.createElement('button')
    btn.innerText = page;

    if(current_Page == page){
        btn.classList.add('active')
    }

    btn.addEventListener('click',()=>{
        current_Page = page
        displayTableData(datas, tbody, rows_Per_Page, current_Page)

        let currentBtn = document.querySelector('.pagenumbers button.active')
        currentBtn.classList.remove('active')
        btn.classList.add('active')
    })

    return btn
}

getRandomPerson()