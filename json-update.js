

//Getting the supplier name
const supH1 = document.getElementById('supplier-name').innerHTML;
//Transforming the supplier name to lowercase & erasing "
const supplierName = supH1.toLowerCase().replaceAll('"', '');
//Getting the div that holds the saved icons
const statusIcon = document.getElementById('status-icon');
//Getting the icon for not saved suppliers
const notSavedIcon = document.querySelector('.not-saved-icon');

let jsonData


// Reading JSON and changing the saved icon
async function fetchData() {
    const memberData = await window.$memberstackDom.getMemberJSON();
    //Getting the data and converting it to a string
    const dataDotSaved = JSON.stringify(memberData.data.saved); 

    //Getting the whole JSON data
    //Moving data globaly
    jsonData = memberData.data;
    //Checking if the supplier is already saved
    let shouldShowDiv = false;

    for (var i = 0; i < dataDotSaved.length; i++) {
		 console.log(dataDotSaved[i])
     console.log(supplierName)
     if (supplierName === dataDotSaved[i]) {
       shouldShowDiv = true;		
			 //console.log('TRU!')
       break;
      }else{
      //console.log('NOPE')
      }
    }
    
    console.log('shouldShowDiv= ' + shouldShowDiv)

    // //Deciding if we should show the icon or not
    // const shouldShowDiv = (dataDotSaved === supplierName) ? true : false;
    
    //Adding or removing the icon
    if (shouldShowDiv) {
    statusIcon.classList.add('saved-icon');
    statusIcon.classList.remove('not-saved-icon');
    } else {
    statusIcon.classList.add('not-saved-icon');
    statusIcon.classList.remove('saved-icon');
   }

     // Saving this supplier's name when save btn is clicked
    const notSavedIcon = document.querySelector('.not-saved-icon');
    // Listen for clicks on the icon with the not-saved-icon class
    notSavedIcon.addEventListener('click', () => {
    
    // Changing the class to saved-icon  
    statusIcon.classList.add('not-saved-icon');
    statusIcon.classList.remove('saved-icon');  
    
    // Check if "saved" key exists in jsonData, if not, create a new key with an empty array as its value
    if (!jsonData.hasOwnProperty("saved")) {  
    jsonData.saved = [];
    }

    // If "saved" is not an array, convert it into an array
    if (!Array.isArray(jsonData.saved)) {
    jsonData.saved = [jsonData.saved];
    }

    // Add newValue to the array associated with the "saved" key
    jsonData.saved.push(supplierName);  

    //Updating the JSON with the new data
    window.$memberstackDom.updateMemberJSON({
    	json: {
      	"saved": jsonData.saved
        }
    	});
    })  

 }
 
fetchData()