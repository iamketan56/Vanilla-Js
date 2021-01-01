const form = document.getElementById('form');
const username = document.getElementById('username');
const email = document.getElementById('email');
const password = document.getElementById('password');
const cpassword = document.getElementById('cpassword');

function showerror(input, message)
{
    const formcontrol = input.parentElement;
    formcontrol.className = 'form-control error';
    const small = formcontrol.querySelector('small');
    small.innerText = message;
}

function showsuccess(input)
{
    const formcontrol = input.parentElement;
    formcontrol.className = 'form-control success';

}

function checklength(input ,min,max)
{

    if (input.value.length < min)
    {
        showerror(input, `must be at least ${min} characters`);
    }
    else if (input.value.length > max)
    {
        showerror(input, `should not more than ${max} character`);
        }
}
function checkReq(inputArr)
{
    inputArr.forEach(function (input) {
        if (input.value.trim() === '')
        {
            showerror(input,'is required');
           }

    else
    {
        showsuccess(input)
        }
    });
}
function matchpass(input1, input2)
{
    if (!(input1.value == input2.value))
    {
        showerror(input2, 'Confirm Password do not match');
    }

}
form.addEventListener('submit', function (e) {

    e.preventDefault();
    checkReq([username, email, password, cpassword]);
    checklength(username,4,8);
    checklength(password, 6, 10);
    checklength(cpassword, 6, 10);
    matchpass(password, cpassword);

});

