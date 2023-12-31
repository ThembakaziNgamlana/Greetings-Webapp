export default function createGreetingApp() {
  let greetCount = 0;
  let greetedNames = {};
  let validationMessage = '';
  let greeting = '';

//   function increment(selectedName) {
//       if (!greetedNames[selectedName]) {
//           greetedNames[selectedName] = 1;
//           greetCount++;
//           return false;
//       }
//       greetedNames[selectedName]++;
//       return true;
//   } 

  function getGreetCountForUser(userName) {
      return greetedNames[userName] || 0;
  }

  function reset() {
     greeting = '';
      greetCount = 0;
      greetedNames = {};
      validationMessage = '';
     
  }

  function greetFunction() {
      return greetedNames;
  }

  function getNameCount() {
      return greetCount;
  }

  function getGreetingMessage(selectedLanguage, selectedName) {
   

    if (selectedLanguage && selectedName) {
          if (selectedLanguage === 'english') {
              greeting = `Hello, ${selectedName}`;
          } else if (selectedLanguage === 'isixhosa') {
              greeting = `Molo, ${selectedName}`;
          } else if (selectedLanguage === 'french') {
              greeting = `Bonjour, ${selectedName}`;
          }
      } 
      
  }

 function greetMessage(){
  return greeting
 }



  function handleGreetBtnClick(selectedName, selectedLanguage) {
    const nameRegex = /^[A-Za-z\s]+$/;
      if (!selectedName && selectedLanguage == null) {
          return "Please enter name and select language.";
      } else if (selectedLanguage == null) {
          return "Language not selected.";
      } else if (!selectedName) {
          return "Please enter your name.";
      }else if(!nameRegex.test(selectedName)){
        return "Name should only contain letters and spaces.";
      }

  }
 
  return {
      //increment,
       getNameCount,
      getGreetingMessage,
      handleGreetBtnClick,
      greetFunction,
    getGreetCountForUser,
      reset,
      greetMessage,
  };
}

   

