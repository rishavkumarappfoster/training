console.log("hello");
//getting all users

const getAllUser = async () => {
    try {
        let url = `http://localhost:3000/api/users`;
        const response = await fetch(url);
        const json = await response.json();
        console.log(json);


        //show all user
        let html = "";
        json.forEach(element => {
            html += `
            <li class="list-group-item d-flex flex-row align-items-center">
            <span class="me-auto fs-4 align-text-bottom">${element.name}</span>
            <div class="d-flex align-items-center flex-row">
                <div class="me-2">
                    <!-- Button trigger modal -->
                    <button onclick="showUserProject(${element.id})" type="button" class="btn btn-info">
                        Show User Project
                    </button>
                </div>

                <div class="me-2">
                    <!-- Button trigger modal -->
                    <button onclick="viewUser(${element.id})" type="button" class="btn btn-info" data-bs-toggle="modal" data-bs-target="#viewdetailexampleModal">
                        View Detail
                    </button>
                    <!-- Modal -->
                    <div class="modal fade" id="viewdetailexampleModal" tabindex="-1" aria-labelledby="exampleModalLabel"
                        aria-hidden="true">
                        <div class="modal-dialog">
                            <div class="modal-content">
                                <div class="modal-header">
                                    <h5 class="modal-title" id="exampleModalLabel">View User Detail</h5>
                                    <button type="button" class="btn-close" data-bs-dismiss="modal"
                                        aria-label="Close"></button>
                                </div>
                                <div class="modal-body" id="viewuser">
                                ...
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="me-2">
                    <!-- Button trigger modal -->
                    <button onclick="updateUser(${element.id})" type="button" class="btn btn-info" data-bs-toggle="modal" data-bs-target="#exampleModal">
                        Update User
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
                                          <label for="upname" class="form-label">Name</label>
                                          <input type="text" class="form-control" id="upname" name="upname" value="">
                                        </div>
                                        <div class="col-md-6">
                                          <label for="upemail" class="form-label">Email</label>
                                          <input type="email" class="form-control" id="upemail" name="upemail" value="">
                                        </div>
                                        <div class="col-md-6">
                                            <label for="form-check" class="form-label">Gender</label>
                                            <div class="form-check">
                                                <input class="form-check-input" type="radio" name="upgender" id="upmale" value="male">
                                                <label class="form-check-label" for="upmale">
                                                    Male
                                                </label>
                                            </div>
                                            <div class="form-check">
                                                <input class="form-check-input" type="radio" name="upgender" id="upfemale" value="female">
                                                <label class="form-check-label" for="upfemale">
                                                    Female
                                                </label>
                                            </div>
                                        </div>
                                        <div class="col-md-6">
                                            <label for="form-check" class="form-label">Status</label>
                                            <div class="form-check">
                                                <input class="form-check-input" type="radio" name="upstatus" id="upactive" value="active">
                                                <label class="form-check-label" for="upactive">
                                                    active
                                                </label>
                                            </div>
                                            <div class="form-check">
                                                <input class="form-check-input" type="radio" name="upstatus" id="upinactive" value="inactive">
                                                <label class="form-check-label" for="upinactive">
                                                    inactive
                                                </label>
                                            </div>
                                        </div>
                                        <div class="col-12 d-flex justify-content-end">
                                            <button onclick="updateUserDetail(${element.id})" type="button" class="btn btn-secondary" data-bs-dismiss="modal">Submit</button>
                                        </div>
                                      </form>


                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="me-0">
                    <!-- Button trigger modal -->
                    <button onclick="deleteUser(${element.id})" type="button" class="btn btn-info" data-bs-toggle="modal" id="deletebtn">
                        Delete User
                    </button>
                </div>

            </div>
        </li>
            `;
        });
        
        document.getElementsByClassName("list-group")[0].innerHTML = html;


        

    }
    catch (err) {
        console.log(err.message);
    }
}

getAllUser();


//creating all user
const createUser = async ()=>{
    try{
        const Name = document.getElementById("name").value;
        const Email = document.getElementById("email").value;
        const Gender = document.querySelector('input[name="gender"]:checked').value;
        const Status = document.querySelector('input[name="status"]:checked').value;
        console.log(Name);
        console.log(Email);
        console.log(Gender);
        console.log(Status);

        let url = `http://localhost:3000/api/users/addUser`;
        fetch(url, {

                // Adding method type
                method: "POST",

                // Adding body or contents to send
                body: JSON.stringify({
                    name:Name,
                    email:Email,
                    gender:Gender,
                    status:Status
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
             console.log(json)
             const data = json;
             document.getElementById("log-form").reset();
             getAllUser();
            });
   
            
    }
    catch(err){
        console.log(err.message);
        document.getElementById("log-form").reset();
    }

    
}

//view user detail
const viewUser = async (id)=>{
    try{

        let url = `http://localhost:3000/api/users/${id}`;
        const response = await fetch(url); 
        const json = await response.json(); 

        let html = `
        <div class="d-flex justify-content-between align-items-center flex-row">
        <p class="fs-6 fw-bolder">Name : </p>
        <p class="fs-6">${json.name}</p>
        </div>
        <div class="d-flex justify-content-between align-items-center flex-row">
        <p class="fs-6 fw-bolder">Email : </p>
        <p class="fs-6">${json.email}</p>
      </div>
      <div class="d-flex justify-content-between align-items-center flex-row">
        <p class="fs-6 fw-bolder">Gender : </p>
        <p class="fs-6">${json.gender}</p>
      </div>
      <div class="d-flex justify-content-between align-items-center flex-row">
        <p class="fs-6 fw-bolder">Status : </p>
        <p class="fs-6">${json.status}</p>
      </div>
        `;
        console.log(json);
        let userfield = document.getElementById("viewuser");
        userfield.innerHTML = html;
        



    }catch(err){
        console.log(err.message);
    }
}

//update user
const updateUser = async (id)=>{
   try{
    let url = `http://localhost:3000/api/users/${id}`;
    const response = await fetch(url); 
    const json = await response.json(); 

    document.querySelector("#upname").value = json.name;
    document.querySelector("#upemail").value = json.email;

    const genderelements = document.querySelectorAll('input[name="upgender"]');

    genderelements.forEach(element => {
  if (element.value === json.gender) {
    element.setAttribute('checked', 'checked');
  }
});

//status
const statuselements = document.querySelectorAll('input[name="upstatus"]');

statuselements.forEach(element => {
if (element.value === json.status) {
element.setAttribute('checked', 'checked');
}
});
   }
   catch(err){
    console.log(err);
   }

}
//update user detail
const updateUserDetail = async (id)=>{
        
    try{ 
        const Name = document.querySelector("#upname").value;
        const Email = document.querySelector("#upemail").value;
        const Gender = document.querySelector('input[name="upgender"]:checked').value;
        const Status = document.querySelector('input[name="upstatus"]:checked').value;
        console.log(Name);
        console.log(Email);
        console.log(Gender);
        console.log(Status);

        let url = `http://localhost:3000/api/users/${id}`;
        fetch(url, {

                // Adding method type
                method: "PUT",

                // Adding body or contents to send
                body: JSON.stringify({
                    id:id,
                    name:Name,
                    email:Email,
                    gender:Gender,
                    status:Status
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
             console.log(json)
             const data = json;
             getAllUser();
            });

    
    }
    catch(err){
        console.log(err.message);
    }

    
}

//delete user
const deleteUser = async (id)=>{
    try{

        let url = `http://localhost:3000/api/users/${id}`;
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
                console.log(json);
                getAllUser();
            });

                       

    }
    catch(err){
        console.log(err);
    }

    
}