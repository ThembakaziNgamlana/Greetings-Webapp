export default function createGreetingApp() {
  let greetCount = 0;
  let lastGreetedName = '';
  let greetedNames = {};
  
  function incrementPeopleNamesCount(selectedName) {
      if (selectedName !== lastGreetedName) {
          greetCount++;
          lastGreetedName = selectedName;
      }
      if (!greetedNames[selectedName]) {
        greetedNames[selectedName] = 1;
    } else {
        greetedNames[selectedName]++;
    }
  }

  
   

  function greetFunction(name){
  const collecteName = inputSpring(name)
 if  (!alreadyGreeted[collecteName]){
  greetNames[collecteName] = 1
  greetCount++
   return false;
 }
  greetNames[collecteName] ++
  return true;
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
      greetedNames
    
  };
}

   

