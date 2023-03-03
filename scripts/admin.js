window.addEventListener("load", async function (e) {
    table = document.getElementById("pendingEmployeeTable");
    let pendingEmployeePromiseObject = await fetch("http://localhost:3000/pendingEmployees");
    let pendingEmployeeJsObject = await pendingEmployeePromiseObject.json();
    for (let i = 0; i < pendingEmployeeJsObject.length; i++) {
        // every Employee
        let createdtr = document.createElement('tr');
        for (let property in pendingEmployeeJsObject[i]) {
            if (property == "age") {
                break;
            }
            else {
                if (property != "address") {
                    let createdtd = document.createElement('td');
                    createdtd.innerText = pendingEmployeeJsObject[i][property];
                    createdtr.appendChild(createdtd);
                }

            }
        }
        let createdVerfiedCheckBoxTd = document.createElement('td');
        createdVerfiedCheckBoxTd.innerHTML = '<td ><input type="checkbox" id="verify"></input></td>'
        createdtr.appendChild(createdVerfiedCheckBoxTd);
        createdVerfiedCheckBoxTd.addEventListener('click', async function (e) {
            let EmployeeObject = {
                firstName: (pendingEmployeeJsObject[i].firstName).toString().toLowerCase(),
                lastName: (pendingEmployeeJsObject[i].lastName).toString().toLowerCase(),
                address: pendingEmployeeJsObject[i].address,
                email: pendingEmployeeJsObject[i].email,
                age: pendingEmployeeJsObject[i].age,
                role: "employee",
                userName: generateRandomUsername() ,
                password: generateRandomPassword(),
                attendance: []
            };
            await Email.send({
                SecureToken :  "af2b79d9-5c99-4157-9871-98c0de4bd255",
                To:  pendingEmployeeJsObject[i].email,
                From: 'javascriptproj789@gmail.com',
                Subject: "Clock It System Confirmation",
                Body: "Welcome " + EmployeeObject.firstName + " " + EmployeeObject.lastName +
                    "<br>User Name :" + EmployeeObject.userName
                    + "<br>Password :" + EmployeeObject.password,
            }).then(
               message => alert(message)
               
            );
            await fetch('http://localhost:3000/users', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(EmployeeObject),

            }).then(() => {
            });
            localStorage.setItem(EmployeeObject.userName.toString(), JSON.stringify({ userName: EmployeeObject.userName, pass: EmployeeObject.password, _id: pendingEmployeeJsObject[i].id, role: EmployeeObject.role }));
            await fetch('http://localhost:3000/pendingEmployees/' + pendingEmployeeJsObject[i].id, {
                method: 'DELETE',
            }).then(() => {
            });

        });

        let createdUnverfiedCheckBoxTd = document.createElement('td');
        createdUnverfiedCheckBoxTd.innerHTML = '<td id="unverify"><input type="checkbox"></input></td>';
        createdUnverfiedCheckBoxTd.addEventListener('click', async function () {
            await fetch('http://localhost:3000/pendingEmployees/' + pendingEmployeeJsObject[i].id, {
                method: 'DELETE',
            })
        });
        createdtr.appendChild(createdUnverfiedCheckBoxTd);
        table.appendChild(createdtr);
    }
});
function generateRandomPassword() {
    let chars = "0123456789abcdefghijklmnopqrstuvwxyz!@#$%^&*()ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    let passwordLength = 6;
    let password = "";
    for (var i = 0; i <= passwordLength; i++) {
        var randomNumber = Math.floor(Math.random() * chars.length);
        password += chars.substring(randomNumber, randomNumber + 1);
    }
    return password;
}
function generateRandomUsername() {
    let chars ="0123456789-_ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    let usernameLength = 6;
    let username = "";
    for (let i = 0; i <= usernameLength; i++) {
      let randomNumber = Math.floor(Math.random() * chars.length);
      username += chars.substring(randomNumber, randomNumber + 1);
    }
  
    return username;
  }