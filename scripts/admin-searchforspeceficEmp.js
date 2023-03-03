window.addEventListener('load', async function () {
    let EmployeePromiseObject = await fetch("http://localhost:3000/users");
    let EmployeeJSObject= await EmployeePromiseObject.json();
   let chart=this.document. getElementById("myChart")
   let  input = document.getElementById('myInput');
   let  div = document.getElementById('unavailableEmp');
   let searchbtn=this.document.getElementById('submitsearch')
    searchbtn.addEventListener('click',()=>{
          let EmpName=(input.value).toLowerCase();
          let displayed,existance=false;
           for (let i = 0; i < EmployeeJSObject.length; i++) {
            if((EmployeeJSObject[i].firstName==(EmpName.split(' '))[0])&&
            (EmployeeJSObject[i].lastName==(EmpName.split(' '))[1])){
              existance=true;
               chart.style.display="block"
               displayed=true
               let  empChart= new Chart(chart, {
                type: "bar",
                data: {
                  labels:["","absenceDays","lateDays","ExecuseDays"],
                  datasets: [{
                    backgroundColor: ["white","red", "green","blue"],
                    data:calculateEmpReportRatio(EmployeeJSObject[i]) 
                  }]
                },
                options: {
                  legend: {display: false},
                  title: {
                    display: true,
                    text: EmpName.toUpperCase()
                  }
                }
              });
               if(displayed==true)
               {
                  empChart.destroy();
                  new Chart(chart, {
                    type: "bar",
                    data: {
                      labels:["","absenceDays","lateDays","ExecuseDays"],
                      datasets: [{
                        backgroundColor: ["white","red", "green","blue"],
                        data:calculateEmpReportRatio(EmployeeJSObject[i]) 
                      }]
                    },
                    options: {
                      legend: {display: false},
                      title: {
                        display: true,
                        text: EmpName.toUpperCase()
                      }
                    }
                  });
               }
             
            }
           }
           if(existance==false)
           {
            chart.style.display="none"
            div.style.display="block"
           }
     })
    
})
 function calculateEmpReportRatio(EmployeeJSObject)
{
    let date=new Date();
    let absencedays=0;
    let lateDays=0;
    let execuseDays=0;

    let alldays=((date.getDate())-(EmployeeJSObject.attendance[0]).day)
    +(((date.getMonth())-(EmployeeJSObject.attendance[0]).month)*30)
    +(((date.getFullYear())-(EmployeeJSObject.attendance[0]).year)*360)
     absencedays=alldays-((EmployeeJSObject.attendance).length)
     console.log(absencedays)
     EmployeeJSObject.attendance.map((dayObj)=>
     {
       if((dayObj.arrival.hours>9)||((dayObj.arrival.minute>0)))
       {
        lateDays++;
       }
       if((dayObj.departure.hours<17))
       {
         execuseDays++;
       }
     })
     return [0,absencedays,lateDays,execuseDays]
}