const usersList = document.querySelector('.users-list');
const url = 'https://jsonplaceholder.typicode.com/users';
const addUserForm =document.querySelector(".add-post-form");
const nameValue = document.getElementById('name-value');
const userNameValue = document.getElementById('username-value');
const emailValue = document.getElementById('email-value');
const phoneValue = document.getElementById('phone-value');
const btnSubmit = document.querySelector('.btn-primary');
let output = '';
const renderUsers = (users)=>{
    users.forEach((user)=>{
        output +=`<div ><tr data-id = ${user.id} >
        <td class="table-name">${user.name}</td>
        <td class="table-username"> ${user.username}</td>
        <td class="table-email"> ${user.email}</td>
        <td class = "table-phone"> ${user.phone}</td>
        <td ><button id='edit-user' >Edit</button><button id='delete-user'>Delete</button></td></tr></div>`
    })
    usersList.innerHTML = output;
}
// Get Request
fetch(url)
    .then(res=>res.json())
    .then(data=>{
        renderUsers(data);
        })
        usersList.addEventListener('click', (e)=>{
            e.preventDefault();
            let delButtonIsPressed = e.target.id =='delete-user';
            let editButtonIsPressed = e.target.id =='edit-user';
            //Delete request
            let id = e.target.parentElement.parentElement.dataset.id;
            let tr = e.target.parentElement.parentElement;
        

       
            if(delButtonIsPressed){
                fetch(`${url}/${id}` , {
                    method: 'DELETE',
                   
                  })
                .then(res => res.json())
                .then(()=>tr.remove())
                
            }
            if(editButtonIsPressed){
                const parent =  e.target.parentElement.parentElement;
                let nameContent = parent.querySelector('.table-name').textContent;
                let usernameContent = parent.querySelector('.table-username').textContent;
                let emailContent = parent.querySelector('.table-email').textContent;
                let phoneContent = parent.querySelector('.table-phone').textContent;
                //console.log(nameContent , usernameContent, emailContent ,phoneContent);
                nameValue.value = nameContent;
                userNameValue.value = usernameContent;
                emailValue.value = emailContent;
                phoneValue.value = phoneContent;
            }
            btnSubmit.addEventListener('click', (e)=>{
                e.preventDefault();
                fetch(`${url}/${id}` , {
                    method: 'PUT',
                    headers: {
                        'Accept':'application/json',
                        'Content-Type':'application/json'
                    },
                    body: JSON.stringify({
                        name : nameValue.value,
                        username: userNameValue.value,
                        email: emailValue.value,
                        phone : phoneValue.value
                    })

                })
                .then(res => res.json())
                .then()
            })
        });
// POST Request
addUserForm.addEventListener('submit',(e)=>{
    e.preventDefault()

    fetch(url , {
        method : 'POST',
        headers :{
            'Content-type': 'application/json; charset=UTF-8',
          },
          body: JSON.stringify({
              name: nameValue.value,
              username:userNameValue.value,
              email:emailValue.value,
              phone:phoneValue.value,
              
          })

    }).then(res =>res.json())
    .then(data=>{
        const dataArr = [];
        dataArr.push(data);
        renderUsers(dataArr);
        deleteInputValues()
    })
   
})
function deleteInputValues(){
    nameValue.value="";
    userNameValue.value="";
    emailValue.value= "";
    phoneValue.value="";


}
