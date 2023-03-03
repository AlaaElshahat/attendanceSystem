window.addEventListener('load',async function()
{
    let EmployeePromiseObject=  await fetch("http://localhost:3000/users");
    let  EmployeeJsObject= await EmployeePromiseObject.json();
    $("#from").datepicker({}).on("change", function () {
        fromdate = this.value;
    });
    $("#to").datepicker({}).on("change", function () {
        createMonthlyReportForallEmployee(fromdate, this.value, EmployeeJsObject);

    });
})
function createMonthlyReportForallEmployee(from, to, employeeJsObj)
{
  let arr=[];
    for(let i=0;i<employeeJsObj.length;i++)
    {
        if(employeeJsObj[i].role=="employee")
        {
          let ar= createMonthlyReport(from, to, employeeJsObj[i]);
          arr.push(ar);
        }
    }
    let xArray = arr.map(function(tuple) {
        return tuple[0];
    });
    let yArray = arr.map(function(tuple) {
        return tuple[arr.length];
    });
    let arr1=[].concat(...arr);
    console.log("...")
   
     console.log(arr1)
     console.log(arr)
    document.getElementById('employeesMonthlyReportDiv').style.display="block"
    table = document.getElementById('table_id')
    table.style.display = "block";
        $('#table_id').DataTable(
                {
                    destroy: true,
                    data: arr1,
                    columns: [
                                 {
                                    data:"fullName",
                                 }   ,
                                 {
                                    data:"date"
                                 },
                                 {
                                    data:"absence"
                                 },
                                 {
                                    data: 'arrival',
                
                                },
                                {
                                    data: 'late'
                                },
                                {
                                    data: "Departure"
                                },
                                {
                                    data: 'Excuse'
                
                                },
                    ]
                })
    
}
   
function createMonthlyReport(from, to, employeeJsObj) {
    let arr = getDaysArray(from, to);
    let MonthlyreportArray = [];
    for (let i = 0; i <arr.length; i++) {
        if ((employeeJsObj.attendance.map((obj)=>obj.day)).includes(arr[i].day)&&(employeeJsObj.attendance.map((obj)=>obj.month)).includes(arr[i].month)) {
            employeeJsObj.attendance.map((attendObj)=>{
                if(attendObj.day==arr[i].day)
                {
                    let rangeObj = {
                            fullName:employeeJsObj.firstName+" "+employeeJsObj.lastName,
                            date: (1 + (attendObj.month)) + "/" + attendObj.day + "/" + attendObj.year,
                            absence:"false",
                            arrival: attendObj.arrival.hours + ":" + attendObj.arrival.minute,
                            late: ((attendObj.arrival.hours) - 9) + ":" + attendObj.arrival.minute,
                            Departure: attendObj.departure.hours + ":" +attendObj.departure.minute,
                            Excuse: attendObj.departure.hours < 15 ?attendObj.departure.hours + ":" + attendObj.departure.minute : " "
            
                        }
                       
                        MonthlyreportArray.push(rangeObj);
                }
            })
           
        }
        else {
            let rangeObj1 = {
                fullName:employeeJsObj.firstName+" "+employeeJsObj.lastName,
                date: (1 + arr[i].month) + "/" + arr[i].day + "/" + arr[i].year,
                absence: "True",
                arrival: "0:0",
                late: "0:0",
                Departure: "0:0",
                Excuse: "0:0"
            }
            MonthlyreportArray.push(rangeObj1);
        }
    }
    console.log(MonthlyreportArray)
    return MonthlyreportArray;
}

function getDaysArray(start, end) {
    var arr = [];
    let date_1 = new Date(start);
    let date_2 = new Date(end);
    let difference = date_2.getTime() - date_1.getTime();
    let TotalDays = Math.ceil(difference / (1000 * 3600 * 24));
    for (var i = 0; i < TotalDays + 1; i++) {
        arr.push({ year: date_1.getFullYear(), month: date_1.getMonth(), day: date_1.getDate() });
        date_1.setDate((date_1.getDate() + 1));


    }
    console.log("Days array")
    console.log(arr)
    return arr;
}