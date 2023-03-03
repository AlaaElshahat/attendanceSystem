
window.addEventListener("load",function(){
   let  firstName=document.getElementById("firstName");
    firstName.focus();
   let lastName=document.getElementById("lastName");
   let address=document.getElementById("address");
   let email=document.getElementById("email");
   let age=document.getElementById("age")
   let firstNameSpan=this.document.getElementById('firstNameSpan');
   let lastNameSpan=this.document.getElementById('lastNameSpan');
   let invalidEmailSpan=this.document.getElementById('InvalidEmailSpan');
   let DuplicateEmailSpan=this.document.getElementById('duplicateEmailSpan');
   let ageSpan=this.document.getElementById('ageSpan');
   let reigisterFormElm=document.getElementById("formRegister");
   firstName.focus();
   firstName.addEventListener('blur', function () {
               if(!isUserNameValide(firstName))
               {
                firstName.style.border="2px solid red";
                firstNameSpan.style.display="block"
               }
               else{

                   lastName.focus;
                   firstName.style.border="1px solid #ccc";
                   firstNameSpan.style.display="none"
               }
        });
        lastName.addEventListener('blur',function(){
                if(!isUserNameValide(lastName))
                {
                    lastName.style.border="2px solid red";
                    lastNameSpan.style.display="block";
                }
                else{
                 address.focus();
                 lastName.style.border="1px solid #ccc";
                 lastNameSpan.style.display="none"
                }
           
        });
        address.addEventListener("blur",function()
        {
                   if(!isAddressVaild(address))
                   {
                    address.style.border="2px solid red";
                   }
                   else
                   {
                    email.focus();
                    address.style.border="2px solid #ccc";
                   }
        });
        email.addEventListener("blur",function(){
                if((!isEmailValide(email)))
                {
                    email.style.border="2px solid red";
                  invalidEmailSpan.style.display="block"
                }
                else if(isDuplicateEmail(email)) {
                  email.style.border="2px solid red";
                  DuplicateEmailSpan.style.display="block"
                }
                else{
                  age.focus();
                  email.style.border="1px solid #ccc";
                  invalidEmailSpan.style.display="none"
                  DuplicateEmailSpan.style.display="none"
                }
                
            
        });
        age.addEventListener('blur',function()
      {
              if(!(isAgeVaild(age)))
              {
                age.style.border="2px solid red";
                ageSpan.style.display="block"
              }
              else{
                age.style.border="1px solid #ccc";
                ageSpan.style.display="none"
              }
      }) ;
      reigisterFormElm.addEventListener("submit",async function(e){
        e.preventDefault();
        if(!(isUserNameValide(firstName) && isUserNameValide(lastName) && isAddressVaild(address)&&isAgeVaild(age)&&isEmailValide(email)&&(!isDuplicateEmail(email)))){
            e.preventDefault();
            firstName.focus();
        }
        else{
            let employeeData = Object.fromEntries(new FormData(reigisterFormElm).entries());
             console.log(employeeData);
            await fetch('http://localhost:3000/pendingEmployees', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json'
              },
              body: JSON.stringify(employeeData),
              
            });
           localStorage.setItem("email"+email.value,JSON.stringify({exist:true}));
            alert("Thank You for Your Registertion.Please Wait until Admin Confirm You")
        }
      });
    
});
function isUserNameValide(usertxt) {
        let usernamepattern =  /^[A-Za-z]+$/;
        return usertxt.value.match(usernamepattern);
    }
    function isEmailValide(email) {
        let emailpattern=/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
          return(email.value.match(emailpattern));
         
    }
    function isAddressVaild(address)
    {
        let addressPattern=/^[A-Za-z]+$/;
        return address.value.match(addressPattern);
    }
    function isAgeVaild(age)
    {
        return Number(age.value)>=22;
    }
    function isDuplicateEmail(email)
    {
     
      let regestirEmail= JSON.parse(localStorage.getItem("email"+email.value));
     return(regestirEmail!=null);
    }
    
    



