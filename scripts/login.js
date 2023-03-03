window.addEventListener('load',function()
{
    this.localStorage.setItem("Elsayed@123",JSON.stringify({userName:"Elsayed@123",pass:"x8j904cz",role:"admin"}));
    this.localStorage.setItem("Hassan@123",JSON.stringify({userName:"Hassan@123",pass:"x8jp04cz",role:"security"}));
    loginForm=document.getElementById('loginForm')
    userNamespan=document.getElementById('userNamespan');
    passwordspan=this.document.getElementById('passwordspan')
    pass=this.document.getElementById('password')
   userName= this.document.getElementById("userName")
 
    loginForm.addEventListener('submit',function(e)
    {
        e.preventDefault();
        let loginData = Object.fromEntries(new FormData(loginForm).entries());
       actualData= JSON.parse(localStorage.getItem(loginData.userName.toString()));
     
       if(actualData!=null)
       {
        if(actualData.userName==loginData.userName)
       {
         if(actualData.pass==loginData.password)
         {
            pass.style.border="1px solid #ccc";
            passwordspan.style.display="none"
            if(actualData.role=="employee")
            { 
              localStorage.setItem("identity",JSON.stringify({id:actualData._id }));
               location.assign("employeePages/employee-dailyreports.html")
             
            }
            else if(actualData.role=="admin")
            {
                location.assign("adminPages/adminpending.html")
            }
            else
            {
                 location.assign("attendance.html")
            }

            
         }
         else
         {
            pass.style.border="1px solid red"
            passwordspan.style.display="block"
            if(actualData.userName==loginData.userName)
            {
                
            }

         }
       }
       }
       else{
           userName.style.border="1px solid red"
           userNamespan.style.display="block";
       }
    })
     
});