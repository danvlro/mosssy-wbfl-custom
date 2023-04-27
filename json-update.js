//Getting the supplier name
const supID = document.getElementById('supplier-ID').innerHTML;
//Transforming the supplier name to lowercase & erasing "
const supplierIdentifier = supID.toLowerCase().replaceAll('"', '');
//Getting the div that holds the saved icons
const statusIcon = document.getElementById('status-icon');
//Getting the icon for not saved suppliers
const notSavedIcon = document.querySelector('.not-saved-icon');

let jsonData


// Reading JSON and changing the saved icon
async function fetchData() {
    const memberData = await window.$memberstackDom.getMemberJSON();
    //Getting the data and converting it to a string
    const dataDotSaved = memberData.data.saved; 

    //Getting the whole JSON data
    //Moving data globaly
    jsonData = memberData.data;
    //Checking if the supplier is already saved
    let shouldShowDiv = false;

    for (var i = 0; i < dataDotSaved.length; i++) {
     if (supplierIdentifier === dataDotSaved[i]) {
       shouldShowDiv = true;		
       break;
      }else{
      }
    }
    
    //Adding or removing the icon
    if (shouldShowDiv) {
    statusIcon.classList.add('saved-icon');
    statusIcon.classList.remove('not-saved-icon');
    } else {
    statusIcon.classList.add('not-saved-icon');
    statusIcon.classList.remove('saved-icon');
    }

   
    // Listen for clicks on the icon with the not-saved-icon class
    statusIcon.addEventListener('click', () => {

    if (statusIcon.classList.contains('not-saved-icon')) {
      
      // Changing the class to saved-icon  
      statusIcon.classList.remove('not-saved-icon');
      statusIcon.classList.add('saved-icon');  
      
      // Check if "saved" key exists in jsonData, if not, create a new key with an empty array as its value
      if (!jsonData.hasOwnProperty("saved")) {  
      jsonData.saved = [];
      }

      // If "saved" is not an array, convert it into an array
      if (!Array.isArray(jsonData.saved)) {
      jsonData.saved = [jsonData.saved];
      }

      // Add newValue to the array associated with the "saved" key
      jsonData.saved.push(supplierIdentifier);  

      //Updating the JSON with the new data
      window.$memberstackDom.updateMemberJSON({
      	json: {
        	"saved": jsonData.saved
          }
      	}); 

    } else {

      // Changing the class to saved-icon  
      statusIcon.classList.remove('saved-icon');
      statusIcon.classList.add('not-saved-icon');

      //Getting the saved values
      const savedValues = Object.values(dataDotSaved);
      //Storing the new saved values
      const valuesToKeep = []
     
      //Keeping just the values that are not from this supplier
      for (let i = 0; i < savedValues.length; i++) {
        if(savedValues[i] !== supplierIdentifier) {
        	console.log('not the same' + savedValues[i] + supplierIdentifier)
          valuesToKeep.push(savedValues[i])
        
        } 
      }
			
      // Updating the JSON data
      window.$memberstackDom.updateMemberJSON({
        json: {
          "saved": valuesToKeep
        }
      });	
    } 
    }) 
 }
 
fetchData()