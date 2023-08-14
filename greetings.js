export default function createGreetingApp() {
  let greetCount = 0;
  let lastGreetedName = '';
  
  function incrementPeopleNamesCount(selectedName) {
      if (selectedName !== lastGreetedName) {
          greetCount++;
          lastGreetedName = selectedName;
      }
  }

  function resetPeopleNamesCount() {
      greetCount = 0;
      lastGreetedName = '';
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

  return {
      incrementPeopleNamesCount,
      resetPeopleNamesCount,
      getNameCount,
      getGreetingMessage
  };
}

   

