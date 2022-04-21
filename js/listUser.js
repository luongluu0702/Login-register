function HiddenEdit(){
    modalSignUp.classList.remove('open');
    resetColorRow()
}
addListUser()
function addListUser(){
    var userlists =  localStorage.getItem('arrValue')? JSON.parse(localStorage.getItem('arrValue')) :[]
    let rows = `<tr>
            <td>#</td>
            <td>Họ</td>
            <td>Tên</td>
            <td>Tên người tài khoản</td>
            <td>Tuổi</td>
            <td>Giới tính</td>
            <td>Số điện thoại</td>
            <td>Email</td>
            <td> Địa chỉ </td> 
            <td>Hành động </td> 
            </tr>`
    userlists.forEach(function(userlist, index){
        var userId = index;
        index++
        let row =`<tr>
            <td>${index}</td>
            <td>${userlist.firstname}</td>
            <td>${userlist.lastname}</td>
            <td>${userlist.username}</td>
            <td>${userlist.age}</td>
            <td>${userlist.genderType}</td>
            <td>${userlist.phone}</td>
            <td>${userlist.email}</td>
            <td>${userlist.address}</td>
            <td>  <a href="#" class="edit" onclick="editUser(${userId})">Chỉnh sửa |</a> <a href="#" class="delete" onclick="deleteUser(${userId})">Xóa</a> </td> 
            </tr>`
        rows += row
    })
    document.querySelector('table').innerHTML = rows
}

function deleteUser(id){
    var agree = confirm('Bạn chắc chắn muốn xóa tài khoản này khỏi danh sách?')
    if(agree){

        var arrValue =   JSON.parse(localStorage.getItem('arrValue')) 
        arrValue.splice(id,1)
        localStorage.setItem('arrValue',JSON.stringify(arrValue))
        console.log(arrValue)
        
        addListUser()
    }
}
function resetColorRow(){
    var row = document.querySelectorAll('tr')
    row.forEach(function(element){
        element.style.backgroundColor= 'white'
    })
    
}
function editUser(id){
    var arrValue =   JSON.parse(localStorage.getItem('arrValue')) 
    resetColorRow()
    var row = document.querySelectorAll('tr')
    row[id+1].style.backgroundColor= '#b2bcf2'
    setInputForm(id)
    showEdit(id)
}
let idUser
function setInputForm(id){
    var arrValue =   JSON.parse(localStorage.getItem('arrValue'))
    $('.custom-control-input').prop("checked", false )
    var user = arrValue[id] 
    if(user.genderType =='Nam'){
        $('#male').prop("checked", true )
    }
    else if(user.genderType =='Nữ') {
        $('#female').prop("checked", true )
    }
    var formElement = document.querySelector('#formSignUp')
    var inputValues = formElement.querySelectorAll('[name]')
    for(var inputValue of inputValues){
        inputValue.value= user[inputValue.name]
    }
    
    idUser = id
}

function updateUser(){

    var arrValue =  JSON.parse(localStorage.getItem('arrValue')) 
    var gender = getGender()
    var user = arrValue[idUser]
    
    var formElement = document.querySelector('#formSignUp')
    var inputValues = formElement.querySelectorAll('[name]')
    for(var inputValue of inputValues){
        user[inputValue.name] = inputValue.value
        user.genderType = gender[0]
    }
    arrValue.splice(idUser,1,user)
    localStorage.setItem('arrValue', JSON.stringify(arrValue))
    addListUser()
}
