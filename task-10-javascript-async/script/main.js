console.log("fetching data");


//fetching the data


const getinfo = async ()=>{
    console.log("getting info of all the user");

    try{
       
        let url = `https://gorest.co.in/public/v2/users`;
        const resonse = await fetch(url);
        const json = await resonse.json();
        console.log(json);
        //show the data to the user
        let html = "";
        json.forEach(element => {
            console.log(element);
            html+=`
             <div class="info-wrapper">
             <hr>
             <div class="lines-detail d-flex flex-row justify-content-between align-items-center">
               <p class="me-auto">${element.name}</p>
               <div class="d-flex" style= float:right;">
                 <!-- Button trigger modal -->
                 <button onclick="getdata(${element.id})" type="button" class="button btn-link" data-bs-toggle="modal" data-bs-target="#exampleModal">
                   <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="rgb(74, 158, 158)"
                     class="bi bi-eye-fill" viewBox="0 0 16 16">
                     <path d="M10.5 8a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0z" />
                     <path d="M0 8s3-5.5 8-5.5S16 8 16 8s-3 5.5-8 5.5S0 8 0 8zm8 3.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7z" />
                   </svg>
                 </button>
               </div>
             </div>
             </div>
            `;
        });

        document.getElementsByClassName('content-container')[0].innerHTML = html;



        //paging

        var li = document.getElementById("content-container").getElementsByClassName("info-wrapper");
       console.log(Array.from(li));
        var paginationNumber = document.getElementById("pagination-numbers");
        var display = 5;
        var count = 1;
        var buttonCount = Math.ceil(li.length/display);
        console.log(buttonCount);
        for(let i = 1; i <= buttonCount; i++){
            var button = document.createElement("button");
            button.innerHTML = i;
            paginationNumber.appendChild(button);
        }

        document.getElementById("prev-button").addEventListener('click', prev);
        document.getElementById("next-button").addEventListener('click', next);

        document.getElementById("prev-button").setAttribute("disabled", true);

        function main(pageNum){
            var nextPage = display * pageNum;
            var prevPage = display * (pageNum - 1);
            for(let i = 0; i < li.length; i++){
                li[i].style.display = "none";
                if(i < nextPage && i >= prevPage){
                    li[i].style.display = "block";
                }
            }
        }

        main(1);

        var buttonNumbers = paginationNumber.getElementsByTagName("button");
        for(let i = 0; i < buttonNumbers.length; i++){
            buttonNumbers[i].addEventListener("click", buttonClick);
        }

        buttonNumbers[count-1].classList.add("active");
        function buttonClick(){
            buttonNumbers[count-1].classList.remove("active"); 
            console.log(this);
            if(this.innerHTML == buttonCount){
                document.getElementById("next-button").setAttribute("disabled", true);
                document.getElementById("prev-button").removeAttribute("disabled");
            }
            else if(this.innerHTML == 1){
                document.getElementById("next-button").removeAttribute("disabled");
                document.getElementById("prev-button").setAttribute("disabled", true);
            }
            else{
                document.getElementById("prev-button").removeAttribute("disabled");
                document.getElementById("next-button").removeAttribute("disabled");
            }
            count = this.innerHTML;
            main(count);
            this.classList.add("active");
        }

        function prev(){
            buttonNumbers[count-1].classList.remove("active");
            buttonNumbers[count-2].classList.add("active");

            document.getElementById("next-button").removeAttribute("disabled");
            if(count !== 1){
                count--;
            }
            if(count === 1){
                document.getElementById("prev-button").setAttribute("disabled", true);
            }
            main(count);
        }

        function next(){
            document.getElementById("prev-button").removeAttribute("disabled");
            if(count !== buttonCount){
                buttonNumbers[count-1].classList.remove("active");
                buttonNumbers[count].classList.add("active");
                count++;
            }
            if(count== buttonCount){
                document.getElementById("next-button").setAttribute("disabled", true);
            }
            main(count);
        }
    }
    catch(err){
        console.log(err);
    }
}
//calling to data information of user
getinfo();


const getdata = async (Ids)=>{
   console.log(" I am clicked");
   document.getElementsByClassName("modal-body")[0].innerHTML = "";
   try{

    let url = `https://gorest.co.in/public/v2/users/${Ids}`;
    const resonse = await fetch(url);
    const json = await resonse.json();
    console.log(json);

    let elems = document.getElementsByClassName("modal-header")[0];
    elems.innerHTML = `<h5 class="modal-title fs-5 fw-bolder" id="exampleModalLabel">${json.name}</h5>`;
    let html = "";
    html = `
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
     document.getElementsByClassName("modal-body")[0].innerHTML = html;
   }catch(err){
    console.log(err);
   }
}


// pagging



