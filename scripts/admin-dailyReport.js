window.addEventListener('load', async function () {
    let EmployeePromiseObject = await fetch("http://localhost:3000/users");
    let EmployeeJsObject = await EmployeePromiseObject.json();
    $("#datepicker").datepicker({}).on("change", function () {
        createDailyReportForAllEmployee(EmployeeJsObject, this.value)
    });
});
function createDailyReportForAllEmployee(EmployeeJSObject, daydate) {
    document.getElementById("employeesDailyReportDiv").style.display = "block";
    let date = new Date(daydate);
    let dailyReportEmployeeArr = [];
    let empObj;
    for (let i = 0; i < EmployeeJSObject.length; i++) {
       if(EmployeeJSObject[i].role=="employee"){
         empObj= {
                    date: ((date.getMonth()) + 1) + "/" + (date.getDate()) + "/" + (date.getFullYear()),
                    FullName: (EmployeeJSObject[i].firstName) + (EmployeeJSObject[i].lastName),
                    absence: "True",
                    arrival: "0:0",
                    late: "0:0",
                    departure: "0:0",
                    Excuse: "0:0",


                }
       if(((EmployeeJSObject[i].attendance).map((dayObject) => { dayObject.day }).includes(date.day)))
       {
        (EmployeeJSObject[i].attendance).map((dayObject) => {
            if ((dayObject.day == date.getDate()) && (dayObject.month == date.getMonth())&&(dayObject.year==date.getFullYear())) {
                 empObj = {
                    date: ((date.getMonth()) + 1) + "/" + (date.getDate()) + "/" + (date.getFullYear()),
                    FullName: (EmployeeJSObject[i].firstName) + (EmployeeJSObject[i].lastName),
                    absence: "false",
                    arrival: (dayObject.arrival).hours + ":" + (dayObject.arrival).minute,
                    late: (((dayObject.arrival).hours) - 9) + "H ," + (dayObject.arrival).minute + "M",
                    departure: (dayObject.departure).hours + ":" + (dayObject.departure).minute,
                    Excuse: (dayObject.departure).hours < 15 ? (dayObject.departure).hours + ":" + (dayObject.departure).minute : " "
                }
               
            }
        
        })
       }
    
      dailyReportEmployeeArr.push(empObj);

   
       }
    }
    console.log(dailyReportEmployeeArr);
    createDataTable(dailyReportEmployeeArr)
}
function createDataTable(dailyReportEmployeeArr) {
    table = $('#employeesDailyReport').DataTable(
        {
            destroy: true,
            data: dailyReportEmployeeArr,
            columns: [
                {
                    data: 'date'
                },
                {
                    data: 'FullName'
                },
                {
                    data: "absence"
                },
                {
                    data: 'arrival',

                },
                {
                    data: 'late'
                },
                {
                    data: "departure"
                },
                {
                    data: 'Excuse'

                },

            ],

        }
    );
}


