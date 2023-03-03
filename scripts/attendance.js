window.addEventListener('load',function()
{
    attendanceForm=document.getElementById('attendanceForm')
    userNamespan=document.getElementById('userNamespan');
   userName= this.document.getElementById("userName")
   attendanceForm.addEventListener('submit',async function(e)
    {
        e.preventDefault();
        let loginData = Object.fromEntries(new FormData(attendanceForm).entries());
        console.log(loginData)
       actualData= JSON.parse(localStorage.getItem(loginData.userName.toString()))
       console.log(actualData)
       if(actualData==null)
       {
        userName.style.border="1px solid red"
        userNamespan.style.display="block";
       }
       else
       {
        
        let employee= await fetch("http://localhost:3000/users/"+actualData._id);
        let emp=await employee.json();
        let date=new Date();
        empAttendanceObject={
          year:date.getFullYear(),
           month:date.getMonth(),
           day:date.getDate(),
           arrival:{hours:date.getHours(),
            minute:date.getMinutes()},
            departure:{hours:17,minute:0},
            absence:false
          }
          if(emp.attendance.length!=0)
          {
                     if((emp.attendance[(emp.attendance.length)-1]).day==date.getDate())
                     {
                         if((((emp.attendance[emp.attendance.length-1]).departure).hours)==17)
                         {
                          ((emp.attendance[emp.attendance.length-1]).departure)={hours:date.getHours(),minute:date.getMinutes()};
                         }
                         else
                         {
                          alert("already recorded")
                         }
                        
                     }
                     else{
                      emp.attendance.push(empAttendanceObject);
                     }
          }
          else{
            emp.attendance.push(empAttendanceObject);
          }
        updateAttendance(actualData,emp)
       
       }
      
    })
     
});
  async function updateAttendance(actualData, emp)
     
{
  console.log(actualData._id)
    await fetch("http://localhost:3000/users/"+actualData._id, {
        method: 'PATCH',
      body: JSON.stringify({
      attendance: emp.attendance,
      }),
    headers: {
'Content-type': 'application/json; charset=UTF-8',
     },
})
.then((response) => response.json())
.then((json) => console.log(json));
}
