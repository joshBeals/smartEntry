
const username = document.querySelector('#username');
const password = document.querySelector('#password');
const id = document.querySelector('#role');


const login = () => {
    if(id.value == '0'){
        alert('pick a role!!!');
    }else{
        if(username.value == '' || password.value == ''){
            alert('fields cannot be left empty!!!');
        }else{
            fetch('http://159.65.185.132:8888/smartentry/signin', {
            	method: 'POST',
            	headers: {
            		'Accept':'application/json',
            		'Content-type':'application/json'
            	},
            	body:JSON.stringify({
                    id : id.value,
                    user_name : username.value,
                    password : password.value 
            	})
            })
            .then(res => res.json())
            .then(data => {
                alert(data.message);
                if(data.response_code == '00'){
                    if(id.value == '1'){
                        setCookie("token", data.token, 1);
                        setCookie("user", username.value, 1);
                        window.location.replace("./dashboard/protocol");
                    }else if(id.value == '2'){
                        setCookie("token", data.token, 1);
                        window.location.replace("./dashboard/faculty");
                    }else if(id.value == '3'){
                        setCookie("token", data.token, 1);
                        window.location.replace("./dashboard/department");
                    }
                }
            })
            .catch(err => console.log(err))
        }
    }
}

// function to set cookie
function setCookie(cname, cvalue, exdays) {
    let d = new Date();
    d.setTime(d.getTime() + (exdays*24*60*60*1000));
    let expires = "expires="+ d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}
