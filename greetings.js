export default function createGreetingApp() {
  let greetCount = 0;
  let lastGreetedName = {};
  let greetedNames = {};
 let validationMessage ='';

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
      let greeting = '';
      if (selectedLanguage === 'english') {
          greeting = `Hello, ${selectedName}`;
      } else if (selectedLanguage === 'isixhosa') {
          greeting = `Molo, ${selectedName}`;
      } else if (selectedLanguage === 'french') {
          greeting = `Bonjour, ${selectedName}`;
      }
      return greeting;
  }


  function handleGreetBtnClick(selectedName, selectedLanguage) {
  if (!selectedName && !selectedLanguage) {
    return ('Please enter a name and select a language.');
  
    }

    else if  (!selectedName) {
      return ('Please enter a name.');
      
    }

    else if (!selectedLanguage) {
      return ('Please select a language.');
      
    }
  }



  return {
      incrementPeopleNamesCount,
      getNameCount,
      getGreetingMessage,
      handleGreetBtnClick,
     greetFunction,
    getGreetCountForUser,
    reset,
    
    
  };
}

   

