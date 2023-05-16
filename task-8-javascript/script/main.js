
// generating random colors
const hexCharacters = [0,1,2,3,4,5,6,7,8,9,"A","B","C","D","E","F"]
function getCharacter(index) {
	return hexCharacters[index]
}

function generateNewColor() {
	let hexColorRep = "#"

	for (let index = 0; index < 6; index++){
		const randomPosition = Math.floor ( Math.random() * hexCharacters.length ) 
    	hexColorRep += getCharacter( randomPosition )
	}
	
	return hexColorRep
}
//generating color ends

//generating the boxes with different colors
function generateboxes(firstnumber, secondnumber){
    //dividing the number
    let division = Math.floor( firstnumber/secondnumber );
    console.log(division);
    let modvalue = firstnumber%secondnumber;
    console.log(modvalue);
    
    //add secondnumber of element on container
    let container = document.getElementsByClassName("container")[0];

    let html = "";
    for(let i = 0; i < secondnumber; i++){
        if(i < modvalue){
            html += `<div class="child">${division+1}</div>`;
        }
        else{
            html += `<div class="child">${division}</div>`;
        }
    }
    container.innerHTML = html;


    //generating random color for each element of container and adding width and background color to each element.
    let ele = document.querySelectorAll('.child');
    let num;
    let flag = false;
    if(firstnumber <= 10){
        flag = false;
       num = (100/(firstnumber));
    }
    else{
        flag = true;
       num = ((firstnumber)/100);
    }
    let totalpercentage = Number(firstnumber)*10;
    let j = 0;
    ele.forEach(item=>{
    const newColor = generateNewColor();
	item.style.backgroundColor  = newColor;
    if(flag==false){
        if(j<modvalue){
            let val = Number(division+1)*num;
            totalpercentage-=val; 
            console.log(val, totalpercentage);
            item.style.width  = Number(val)+"%"; 
            j++;
        }
        else{
            let val = Number(division)*num;
            totalpercentage-=val; 
            console.log(totalpercentage);
            item.style.width  = Number(val)+"%";  
        }
    }
    else{
        if(j<modvalue){
            let val = Number(division+1)/num;
            totalpercentage-=val;
            console.log(val, totalpercentage);
            item.style.width  = Number(val)+"%";
            j++;  
        }
        else{
            let val = Number(division)/num;
            totalpercentage-=val;
            console.log(totalpercentage);
            item.style.width  = Number(val)+"%";  
        }
    }
    })
}
        
//calling function when someone clicks on button
function func(e){
    e.preventDefault();
    //reading data 
    document.getElementsByClassName("container")[0].innerHTML = "";
    try{
        let firstnumber = document.getElementById("firstn").value;
        let secondnumber = document.getElementById("secondn").value;
        console.log(firstnumber, secondnumber);
        
        let container = document.getElementsByClassName("container")[0];
    
        if(Number(firstnumber) <= 0 || Number(secondnumber) <= 0){
           let html = `<h1>Number can never be negative</h1>`;
           container.innerHTML = html;
        }
        else if(Number(secondnumber) < Number(firstnumber)){
            generateboxes(firstnumber, secondnumber);
           
        }
        else{
            let html = `<h1>First number should never be smaller then second number</h1>`;
            container.innerHTML = html;
        }
    }catch(err){
        console.log(err);
    }
    
    

    //  document.getElementById("firstn").value = "";
    //  document.getElementById("secondn").value = "";
}


//adding event to the button
let ele = document.getElementById("btn");
ele.addEventListener("click", func);

