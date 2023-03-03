window.addEventListener('load',async function()
{
    let EmployeePromiseObject=  await fetch("http://localhost:3000/users");
    let  EmployeeJsObject= await EmployeePromiseObject.json();
    $('#table_Emp').DataTable(
                        {
                         data:EmployeeJsObject,
                            columns: [
                                                        { 
                                                            data:"firstName"
                                                        } ,
                                                        {
                                                            data:"lastName"
                                                        },
                                                        {
                                                            data:'address',
                                                            
                                                        },
                                                        {
                                                            data:'email'},
                                                        {
                                                            data:'age'
                                                           
                                                        },
                                    
                                                    ],
                                    
                        }
        )
})
