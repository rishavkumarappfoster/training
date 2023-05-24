// console.log("hello");

const showAllProjectofUser = async()=>{
        //extracting product id from the url
        const url = window.location.href;
        var user_id = url.split("/")[4];

        const url2 = `http://localhost:3000/api/users/${user_id}/projects`;

        const response  = await fetch(url2);
        const json = await response.json();
        // console.log(json);
        // console.log(json.project);

        let createbutton = `
        <button type="button" class="btn btn-success" data-bs-toggle="modal" data-bs-target="#createexampleModal">
        Create Project
    </button>
    <!-- Modal -->
    <div class="modal fade" id="createexampleModal" tabindex="-1" aria-labelledby="exampleModalLabel"
        aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalLabel">Create Project</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal"
                        aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <!-- form start -->

                    <form class="row g-3" id="log-form1">
                        <div class="col-md-6">
                          <label for="name" class="form-label">Project Name</label>
                          <input type="text" class="form-control" id="name" name="name" value="">
                        </div>
                        <div class="col-md-6">
                          <label for="user_id" class="form-label">User ID</label>
                          <input type="number" class="form-control" id="user_id" name="user_id" value="${json.id}" disabled>
                        </div>
                        
                        <div class="col-12 d-flex justify-content-end">
                            <button onclick="createUserProject(${json.id})" type="button" class="btn btn-secondary" data-bs-dismiss="modal">Submit</button>
                        </div>
                      </form>
                    <!-- from end -->

                </div>
            </div>
        </div>
    </div>
        `;

        document.getElementsByClassName("createbutton")[0].innerHTML = createbutton;

        let html = "";
        json.project.forEach(element => {
            // console.log(element.id)
            html+=`
            <li class="list-group-item d-flex flex-row align-items-center">
            <span class="me-auto fs-4 align-text-bottom">${element.name}</span>
            <div class="d-flex align-items-center flex-row">

                <div class="me-2">
                    <!-- Button trigger modal -->
                    <button onclick="viewProject(${element.id})" type="button" class="btn btn-info" data-bs-toggle="modal" data-bs-target="#viewdetailexampleModal">
                        View Detail
                    </button>
                    <!-- Modal -->
                    <div class="modal fade" id="viewdetailexampleModal" tabindex="-1" aria-labelledby="exampleModalLabel"
                        aria-hidden="true">
                        <div class="modal-dialog">
                            <div class="modal-content">
                                <div class="modal-header">
                                    <h5 class="modal-title" id="exampleModalLabel">View Project Detail</h5>
                                    <button type="button" class="btn-close" data-bs-dismiss="modal"
                                        aria-label="Close"></button>
                                </div>
                                <div class="modal-body" id="viewproject">
                                ...
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="me-2">
                    <!-- Button trigger modal -->
                    <button onclick="updateProject(${element.id})" type="button" class="btn btn-warning" data-bs-toggle="modal" data-bs-target="#exampleModal">
                        Update Project
                    </button>
                    <!-- Modal -->
                    <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel"
                        aria-hidden="true">
                        <div class="modal-dialog">
                            <div class="modal-content">
                                <div class="modal-header">
                                    <h5 class="modal-title" id="exampleModalLabel"> Update Details</h5>
                                    <button type="button" class="btn-close" data-bs-dismiss="modal"
                                        aria-label="Close"></button>
                                </div>
                                <div class="modal-body " id="updatedetail">
                                    
                                <form class="row g-3" id="log-form2">
                                <div class="col-md-6">
                                  <label for="proname" class="form-label">Project Name</label>
                                  <input type="text" class="form-control" id="proname" name="proname" value="${element.name}">
                                </div>
                                <div class="col-md-6">
                                  <label for="prouser_id" class="form-label">User ID</label>
                                  <input type="text" class="form-control" id="prouser_id" name="prouser_id" value="${element.user_id}">
                                </div>
                                <div class="col-md-6">
                                  <label for="project_id" class="form-label">ID</label>
                                  <input type="text" class="form-control" id="project_id" name="project_id" value="${element.id}" disabled>
                                </div>
                                <div class="col-12 d-flex justify-content-end">
                                    <button onclick="saveUserProject()" type="button" class="btn btn-secondary" data-bs-dismiss="modal">Submit</button>
                                </div>
                              </form>


                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="me-0">
                    <!-- Button trigger modal -->
                    <button onclick="deleteProject(${element.id})" type="button" class="btn btn-danger" data-bs-toggle="modal" id="deletebtn">
                        Delete Project
                    </button>
                </div>

            </div>
        </li>
            `;
        });
        if(json.project.length === 0){
            document.getElementsByClassName("list-group")[0].innerHTML = `<li class="list-group-item d-flex flex-row align-items-center"><p class="fs-3 fw-bolder">No Project Avaliable</p></li>`;  
        }
        else{
            document.getElementsByClassName("list-group")[0].innerHTML = html;
        }
        
}
showAllProjectofUser();



const createUserProject = async (id)=>{
    const Name = document.getElementById("name").value;
    const User_Id = document.getElementById("user_id").value;

    let url = `http://localhost:3000/api/users/${id}/addProject`;
    fetch(url, {

        // Adding method type
        method: "POST",

        // Adding body or contents to send
        body: JSON.stringify({
            name:Name,
            user_id:User_Id,
        }),

        // Adding headers to the request
        headers: {
            "Content-type": "application/json; charset=UTF-8"
        }
    })

    // Converting to JSON
    .then(response => response.json())
        
    // Displaying results to console
    .then(json => {
     const data = json;
     document.getElementById("log-form1").reset();
     showAllProjectofUser();
    });
}

const viewProject = async (id)=>{
    try{

        let url = `http://localhost:3000/api/users/project/${id}`;
        const response = await fetch(url); 
        const json = await response.json(); 

        let html = `
        <div class="d-flex justify-content-between align-items-center flex-row">
        <p class="fs-6 fw-bolder">ID : </p>
        <p class="fs-6">${json.id}</p>
        </div>
        <div class="d-flex justify-content-between align-items-center flex-row">
        <p class="fs-6 fw-bolder">Project Name : </p>
        <p class="fs-6">${json.name}</p>
        </div>
        <div class="d-flex justify-content-between align-items-center flex-row">
        <p class="fs-6 fw-bolder">User Id : </p>
        <p class="fs-6">${json.user_id}</p>
      </div>
        `;
        let userfield = document.getElementById("viewproject");
        userfield.innerHTML = html;
        


    }catch(err){
        console.log(err);
    }
}

const updateProject = async (id)=>{
    try{
    let url = `http://localhost:3000/api/users/project/${id}`;
    const response = await fetch(url); 
    const json = await response.json(); 
    console.log(json);
    document.querySelector("#proname").value = json.name;
    document.querySelector("#prouser_id").value = json.user_id;
    document.querySelector("#project_id").value = json.id;

    }catch(err){
        console.log(err);
    }

}

//update user detail
const saveUserProject = async ()=>{
        
    try{ 
        const Name = document.querySelector("#proname").value;
        const User_id = document.querySelector("#prouser_id").value;
        const id = document.querySelector("#project_id").value;
        // console.log(Name);
        // console.log(User_id);
        // console.log(id);

        let url = `http://localhost:3000/api/users/project/${id}`;
        fetch(url, {

                // Adding method type
                method: "PUT",

                // Adding body or contents to send
                body: JSON.stringify({
                    id:id,
                    name:Name,
                    user_id:User_id
                }),

                // Adding headers to the request
                headers: {
                    "Content-type": "application/json; charset=UTF-8"
                }
            })

            // Converting to JSON
            .then(response => response.json())
                
            // Displaying results to console
            .then(json => {
            //  console.log(json)
             const data = json;
             showAllProjectofUser();
            });

    
    }
    catch(err){
        console.log(err.message);
    }

    
}



const deleteProject = async (id)=>{
    try{

        let url = `http://localhost:3000/api/users/project/${id}`;
                   await fetch(url, {

                           // Adding method type
                           method: "DELETE",

                           // Adding headers to the request
                           headers: {
                               "Content-type": "application/json; charset=UTF-8"
                           }
                       })

                       // Converting to JSON
                       .then(response => response.text()) //converting to JSON
            .then(json => {
                showAllProjectofUser();
            });

                       

    }
    catch(err){
        console.log(err);
    }
}