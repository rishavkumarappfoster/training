console.log("java");

//adding event to the button
let ele = document.getElementById("btn");
ele.addEventListener("click", func);

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
        
//calling function when someone clicks on button
function func(e){
    e.preventDefault();
    console.log("Hii Rishav");
    //reading data 
    let firstnumber = document.getElementById("firstn").value;
    let secondnumber = document.getElementById("secondn").value;
    console.log(firstnumber, secondnumber);

    //dividing the number
    let division = Math.floor( firstnumber/secondnumber );
    console.log(division);
    let modvalue = firstnumber%secondnumber;
    console.log(modvalue);
    let lengthoffirstbox = Number(division)+Number(modvalue);
    
    //add secondnumber of element on container
    let container = document.getElementsByClassName("container")[0];
    // console.log(container);

    let html = "";
    for(let i = 0; i < secondnumber; i++){
        if(i==0){
            html += `<div class="child">${lengthoffirstbox}</div>`;
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
        if(j==0){
            let val = Number(lengthoffirstbox)*num;
            totalpercentage-=val;
            console.log(val, totalpercentage);
            item.style.width  = Number(val)+"%";  
        }
        else{
            let val = Number(division)*num;
            totalpercentage-=val; 
            console.log(totalpercentage);
            item.style.width  = Number(val)+"%";  
        }
    }
    else{
        if(j==0){
            let val = Number(lengthoffirstbox)/num;
            totalpercentage-=val;
            console.log(val, totalpercentage);
            item.style.width  = Number(val)+"%";  
        }
        else{
            let val = Number(division)/num;
            totalpercentage-=val;
            console.log(totalpercentage);
            item.style.width  = Number(val)+"%";  
        }
    }
    
    j++;
    })
    

    // document.getElementById("firstn").value = "";
    // document.getElementById("secondn").value = "";
}

