Emp = JSON.parse(localStorage.getItem("identity"));

window.addEventListener('load', async function () {
    let employee = await fetch("http://localhost:3000/users/" + Emp.id);
    let employeeJsObj = await employee.json();
    let employeeName = this.document.getElementById("employeeName");
    employeeName.innerText = employeeJsObj.firstName + " " + employeeJsObj.lastName;
    let arrivalTime = document.getElementById("arrivalTime");
    let departureTime = document.getElementById("departure");
    let late = document.getElementById("late");
    let abscence = document.getElementById("abscence");
    let fromdate;
    $("#datepicker").datepicker({}).on("change", function () {
        arrivalTime.innerText = ""
        departureTime.innerText = ""
        late.innerText = ""
        abscence.innerText = "True"

        calculateDailyReport(this.value, employeeJsObj);
    });
    $("#from").datepicker({}).on("change", function () {
        fromdate = this.value;
    });
    $("#to").datepicker({}).on("change", function () {
        createMonthlyReport(fromdate, this.value, employeeJsObj);

    });

});
function calculateDailyReport(element, employeeJsObj) {
    let FullName = this.document.getElementById("Name");
    let DailyReportDiv = this.document.getElementById("DailyReportDiv");
    let ReportDate = this.document.getElementById("date");
    DailyReportDiv.style.display = "block";
    FullName.innerText = employeeJsObj.firstName + " " + employeeJsObj.lastName
    ReportDate.innerText = element;
    let arrivalTime = document.getElementById("arrivalTime");
    let departureTime = document.getElementById("departure");
    let late = document.getElementById("late");
    let excuseAt = document.getElementById("excuseAt")
    let excuse = document.getElementById("excuse");
    let abscence = document.getElementById("abscence");
    date = new Date(element);
    (employeeJsObj.attendance).map((dayObject) => {
        if (dayObject.month == date.getMonth()) {
            if (dayObject.day == date.getDate()) {
                arrivalTime.innerText = (dayObject.arrival).hours + ":" + (dayObject.arrival).minute;
                departureTime.innerText = (dayObject.departure).hours + ":" + (dayObject.departure).minute;
                late.innerText = (((dayObject.arrival).hours) - 9) + "Hours ," + (dayObject.arrival).minute + "minutes"
                if (dayObject.hours < 3) {
                    excuseAt.style.display = "inline"
                    excuse.innerText = (dayObject.departure).hours + ":" + (dayObject.departure).minute;
                }
                abscence.innerText = dayObject.absence
            }

        }
    });

}
function createMonthlyReport(from, to, employeeJsObj) {
    let arr = getDaysArray(from, to);
    document.getElementById('employeesMonthlyReportDiv').style.display="block"
    table = document.getElementById('table_id')
    table.style.display = "block";
    let MonthlyreportArray = [];
    for (let i = 0; i <arr.length; i++) {
        if ((employeeJsObj.attendance.map((obj)=>obj.day)).includes(arr[i].day)&&(employeeJsObj.attendance.map((obj)=>obj.month)).includes(arr[i].month)&&(employeeJsObj.attendance.map((obj)=>obj.year)).includes(arr[i].year)) {
            employeeJsObj.attendance.map((attendObj)=>{
                if(attendObj.day==arr[i].day)
                {
                    let rangeObj = {
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
                date: (1 + arr[i].month) + "/" + arr[i].day + "/" + arr[i].year,
                absence: "True",
                arrival: "",
                late: "",
                Departure: "",
                Excuse: ""
            }
            MonthlyreportArray.push(rangeObj1);
        }
    }
    console.log(MonthlyreportArray)
    $('#table_id').DataTable(
        {
            destroy: true,
            data: MonthlyreportArray,
            columns: [
                {
                    data: null,
                    render: function (data, type, row) {
                        return (row.date)
                    }
                },
                {
                    data: 'absence'

                },

                {
                    data: null,
                    render: function (data, type, row) {
                        return (row.arrival)
                    }
                },
                {
                    data: null,
                    render: function (data, type, row) {
                        return (row.late)
                    }
                },
                {
                    data: null,
                    render: function (data, type, row) {
                        return (row.Departure)
                    }
                },
                {
                    data: null,
                    render: function (data, type, row) {
                        return (row.Excuse)
                    }
                }

            ]
        }
    )
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
    return arr;
}
