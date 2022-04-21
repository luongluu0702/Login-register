var mesPwd= document.querySelector('.mes-pwd')
var mesEmail= document.querySelector('.mes-email')
function getLoginEmail(email){
    email = document.getElementById('email').value
    if(email!= ""){
        console.log(email)
    }
    if(email==""){
       mesEmail.innerText='Vui lòng nhập email'

   } else{
       mesEmail.innerText=''
   }
    return email
}

function getLoginPwd(pwd){
   pwd = document.getElementById('pwd').value
   if(pwd!= ""){
       console.log(pwd)
   }
   if(pwd==""){
       mesPwd.innerText='Vui lòng nhập password'
       
   }else{
       mesPwd.innerText=''
   }
   return pwd
}

function checkLogin(event){
   event.preventDefault()
   var email = getLoginEmail(email)
   var pwd =  getLoginPwd(pwd)
   var user= {}
   var getArrSingUp = JSON.parse(localStorage.getItem('arrValue'))
   var succes = false
   getArrSingUp.forEach(function(element){
       console.log(element)
       if(email==element['email'] && pwd==element['pwd'] ){
           user['firstname'] = element['firstname']
           user['lastname']= element['lastname']
           succes = true;
       }
   })
   console.log(user)
   if(succes){
    //    ShowWelcome()
    //    mesPwd.innerText=''
    //    mesEmail.innerText=''
    //    var welcomeName = document.querySelector('.wellcome-header')
    //    welcomeName.innerText += ', ' + user['firstname'] +' '+ user['lastname']
    showPage('http://127.0.0.1:5500/listUser.html#')
   } else {
       if(pwd!="" && email!=""){

           alert('Email hoặc pass không đúng')
       }
   } 
}
function showPage(path){
    location.assign(path)
}