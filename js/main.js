
const signUp = document.querySelector('.btn-signUp-login')
const modalSignUp = document.querySelector('.modal-signUp')
const closeSignUp = document.querySelector('.modal-header-close')
const modalSignUpContainer = document.querySelector('.modalSignUp-container')
const welcome = document.querySelector('.wellcome-container')

//  signUp.addEventListener('click', ShowSignUp);
// closeSignUp.addEventListener('click', HiddenSignUp);
// modalSignUp.addEventListener('click', HiddenSignUp);
// modalSignUpContainer.addEventListener('click', function(event){
//     event.stopPropagation()
// })
function resetMsgError(){
    var formElement = document.querySelector('#formSignUp')
    var inputValues = formElement.querySelectorAll('[name]')
    for(var inputValue of inputValues){
        inputValue.classList.remove('invalid')
    }
    var mes= document.querySelectorAll('.mes')
    mes.forEach(function(element){
        element.innerHTML = ''
    })
    document.querySelector('.gender-error').innerHTML=''
}
function ShowSignUp(){
    
    let checkMail = localStorage.getItem('checkMail')
    localStorage.setItem('checkMail',JSON.stringify(1))
    var formElement = document.querySelector('#formSignUp')
    document.querySelector('.signUp--title').innerHTML='Đăng kí'
    document.querySelector('.btn--signUp').style.display ='block'
    document.querySelector('.btn--save').style.display ='none'
    document.querySelector('.end-text').style.display ='block'
    document.querySelector('.username').style.display ='block'
    document.querySelector('.email').style.display ='block'
    var inputValues = formElement.querySelectorAll('[name]')
    for(var inputValue of inputValues){
        inputValue.value = ''
    }
    var pass= document.querySelectorAll('.pass')
    pass.forEach(function(element){
        element.style.display ='block'
    })
    resetMsgError()
    modalSignUp.classList.add('open');
}
function showEdit(){
    let checkMail = localStorage.getItem('checkMail')
    localStorage.setItem('checkMail',JSON.stringify(2))
    modalSignUp.classList.add('open');
    document.querySelector('.signUp--title').innerHTML='Thông tin tài khoản'
    document.querySelector('.username').style.display ='none'
    document.querySelector('.email').style.display ='none'
    document.querySelector('.btn--signUp').style.display ='none'
    document.querySelector('.btn--save').style.display ='block'
    document.querySelector('.end-text').style.display ='none'
    var pass= document.querySelectorAll('.pass')
    pass.forEach(function(element){
        element.style.display ='none'
    })
    resetMsgError()
}

function ShowWelcome(){
    welcome.classList.add('open');
}

function HiddenSignUp(){
    modalSignUp.classList.remove('open');
    location.assign("http://127.0.0.1:5500/login.html")
    
}
function HiddenGenderError(){
    document.querySelector('.gender-error').innerHTML= ""
}

function getGender(){
    var gender = []
    if(document.getElementById('male').checked){
        gender[0] ='Nam'
        gender[1] = 1
    }else if(document.getElementById('female').checked){
        gender[0] = 'Nữ'
        gender[1] = 2
    }
    return gender
}
var selectorRules = {}
function validate(inputElement, rule){
        
    var isError 
    var messError = inputElement.parentElement.querySelector('.mes')
    var rulesCheck = selectorRules[rule.selector]
    // console.log(rulesCheck)
    for( var i = 0; i< rulesCheck.length; i++){
        isError = rulesCheck[i](inputElement.value)
        if(isError) break
    }
    if(isError){
        inputElement.classList.add('invalid')
        messError.innerText = isError
        
    } else{
        inputElement.classList.remove('invalid')
        messError.innerText = ''
    }
    // console.log(isError)
    return isError;
}
function checkSignUp(obj){
    //Check sign up
    var formElement = document.querySelector(obj.form)
    var inputValues = formElement.querySelectorAll('[name]')
    function getformValue(){
        var gender =  getGender()
        var formValue ={}
        for(var inputValue of inputValues){
            formValue[inputValue.name] = inputValue.value
            formValue['genderType'] = gender[0]
        }
        // console.log(formValue)
        let  arrValue  = localStorage.getItem('arrValue')? JSON.parse(localStorage.getItem('arrValue')) :[]
        arrValue.push(formValue)
        localStorage.setItem('arrValue', JSON.stringify(arrValue))
    }
    //Lấy element
    if(formElement){
        formElement.onsubmit = function (event){
            event.preventDefault()
            
            var formValide = true;
            if(getGender() == ""){
                document.querySelector('.gender-error').innerHTML="Vui lòng chọn giới tính"
                formValide = false
            } else {
                document.querySelector('.gender-error').innerHTML= ""
            }
            obj.rule.forEach(function (rule){
                var inputElement = formElement.querySelector(rule.selector)
                var inputValid = validate(inputElement, rule)
                if(inputValid){
                    formValide = false
                }
            })
            if(formValide){
                getformValue()
                location.assign('http://127.0.0.1:5500/listUser.html#')
            } 
        }
        
        obj.rule.forEach(function (rule){
            if(Array.isArray(selectorRules[rule.selector])){
                selectorRules[rule.selector].push(rule.check)
            } else {
                selectorRules[rule.selector] = [rule.check]
            }

            var inputElement = formElement.querySelector(rule.selector)
            
            if(obj.form !='#formLogIn'){
                if(inputElement) {
                    inputElement.onblur = function () {
                        console.log(inputElement.value)
                        validate(inputElement, rule)
                    }
                }
                
            }
        })
        // var emailSignUp = document.querySelector('#emailSignUp')
        // emailSignUp.onblur= isExist('#emailSignUp',email, 'Đã tồn tại')

        
        //check save edit
        var btnSave= document.querySelector('.btn--save')
        btnSave.onclick = function(event){
        event.preventDefault()
        var formValide = true;
        obj.rule.forEach(function (rule){
            var inputElement = formElement.querySelector(rule.selector)
            var inputValid = validate(inputElement, rule)
            if(inputValid){
                formValide = false
            }
        })
        if(formValide){
            updateUser()
            HiddenEdit()
        } 
        checkOpen()
    }
    }

}
isRequired = function (selector,message){
    return {
        selector: selector,
        check: function(value){
            return value ? undefined:message ||'Vui lòng nhập trường này'
        }
    }
}
isEmail = function (selector,message){
    return {
        selector: selector,
        check: function(value){
            var regex = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
            return value.match(regex)? undefined : message|| 'Trường này phải là email'
        }
    }
}
isConfirm = function (selector, getConfirmValue,message){
    return {
        selector: selector,
        check: function(value){
            return value === getConfirmValue() ? undefined: message||'Nhập lại không chính xác'
        }
    }
}
isExist = function (selector,data,message){
    return {
        selector: selector,
        check: function(value){
            var exist = false;
            JSON.parse(localStorage.getItem('arrValue')).forEach(function(element){
                if(value === element[data]) {
                    exist = true
                } 
            })
            return exist ? message||'Nhập lại không chính xác' : undefined
        }
    }
}

// function isExist(selector, data,message){
//     var inputElement = document.querySelector(selector)
//     var messError= inputElement.parentElement.querySelector('.mes')
//     var exist = false;
//         JSON.parse(localStorage.getItem('arrValue')).forEach(function(element){
//             if(inputElement.value === element[data]) {
//                 exist = true
//             } 
//         })
//         if(exist){
//             inputElement.classList.add('invalid')
//             messError.innerText = message
//         } else{
//             inputElement.classList.remove('invalid')
//             messError.innerText = ''
//         }
//         // return exist ? message||'Đã tồn tại email' : undefined
// }
isMinPW = function(selector,min, message){
    return {
        selector: selector,
        check: function(value){
            return value.length >= min ? undefined: message||'Nhập tối thiểu 6 kí tự'
        }
    }
}

function checkOpen(){
    var checkMail = JSON.parse(localStorage.getItem('checkMail'))
    if(checkMail==1){
        console.log('check mail')
        checkSignUp({
            form: '#formSignUp',
            rule: [
                isRequired('#firstname'),
                isRequired('#lastname'),
                isRequired('#emailSignUp'),
                isRequired('#username'),
                isRequired('#age'),
                isRequired('#address'),
                isRequired('#phone'),
                isRequired('#pwdSignUp-confirm'),
                isEmail('#emailSignUp'),
                isMinPW('#pwdSignUp', 6),
                isConfirm('#pwdSignUp-confirm',function(){
                    return document.querySelector('#formSignUp #pwdSignUp').value
                }),
                isExist('#emailSignUp', 'email',"Đã tồn tại email"),
                isExist('#username', 'username',"Tên người dùng đã tồn tại")
            ]
          })
    }
    if(checkMail==2){
        console.log('no check mail')
    }
}

// Test JS
// var topics = [
//     {
//         topic: 'FE',
//         courses: [
//             {
//                 id: 1,
//                 title: 'HTML, CSS'
//             },
//             {
//                 id: 2,
//                 title: 'JS'
//             }

//         ]
//     },
//     {
//         topic: 'BE',
//         courses: [
//             {
//                 id: 3,
//                 title: 'Java'
//             },
//             {
//                 id: 4,
//                 title: 'PHP'
//             }

//         ]
//     }
// ]

// var flatTopic = topics.reduce(function(courses,topics){
//     return courses.concat(topics.courses)

// },[])
// console.log(flatTopic)
// var renderCourse = flatTopic.map(function(courses){
//     return `
//      <div>
//             <h2>Khóa học:${courses.title}</h2>
//      </div>

//     `
// })
// console.log(renderCourse)

// //Promise
// var promise = new Promise (
//     function(resolve, reject){
//         resolve({
//             id: 123,
//             name: "HUST"
//         })
//     }
// );
// function sleep (ms){
//     return new Promise(function(resolve){
//         setTimeout(resolve,ms);
//     })
// }
// sleep(1000)
//     // .then(function(){
//     //     return new Promise(
//     //         function(resolve){
//     //             setTimeout(function(){
//     //                 resolve([1,2,3])
//     //             },3000)
//     //         }
//     //     )
//     // })
//     // .then(function(resolve){
//     //     console.log(resolve)
//     //     return 2
//     // })
//     .then(function(){
//         console.log(1)
//         return sleep(1000)
//     })
//     .then(function(){
//         console.log(2)
//         return sleep(1000)
//     })
