export default function createGreetingApp() {
  let greetCount = 0;
  let lastGreetedName = {};
  let greetedNames = {};
 let validationMessage ='';
 let greeting = '';

  function incrementPeopleNamesCount(selectedName) {
      if ( !greetedNames[selectedName]) {
        greetedNames[selectedName]= 1
        greetCount++;
        return false
          //lastGreetedName[selectedName] = 1;
        
      }
        greetedNames[selectedName]++;
      return true
    }


    function getGreetCountForUser(userName) {
      return greetedNames[userName] || 0;
    }

    function reset() {
      greetCount = 0;
      lastGreetedName = {};
      greetedNames = {};
      validationMessage = '';
    }



function greetFunction(){
    return greetedNames
  }

 function getNameCount() {
      return greetCount;
  }
  

  function getGreetingMessage(selectedLanguage, selectedName) {
      
      if(selectedLanguage && selectedName){
        //incrementPeopleNamesCount(selectedName)
        if (selectedLanguage === 'english') {
          greeting = `Hello, ${selectedName}`;
      } else if (selectedLanguage === 'isixhosa') {
          greeting = `Molo, ${selectedName}`;
      } else if (selectedLanguage === 'french') {
          greeting = `Bonjour, ${selectedName}`;
      }
     
  }
      }
       
    function displayGreetings(){
      return greeting;
    }


  function handleGreetBtnClick(selectedName, selectedLanguage) {
  
    if (!selectedName && selectedLanguage == null) {
      return "Please enter name and select language."
  }
  else if (selectedLanguage == null) {
      return "Language not selected."
  }
else if (!selectedName) {
      return "Please enter your name."
  }
    
  }

  // function displayMessage(message) {
  //   validationMessage = message; 
  //   setTimeout(() => {
  //     validationMessage = ''; 
  //   }, 2000);
  // }

  return {
      incrementPeopleNamesCount,
      getNameCount,
      getGreetingMessage,
      handleGreetBtnClick,
     greetFunction,
    getGreetCountForUser,
    reset,
    displayGreetings,
    //displayMessage,
    
    
  };
}

   

