const createCombinations = (fields, extraData) => {

  const mainCombinations = (fields, currentCombinations) => {
    
      //prevent side-effects
      let tempFields = fields.slice();
      
      //recursively build a list combinations
      if (!tempFields || tempFields.length == 0) {
        return currentCombinations;
      }
      else {
        let combinations = [];
        let field = tempFields.pop();
        
        for (let valueIndex = 0; valueIndex < field.length; valueIndex++) {
          let valueName = field[valueIndex];
          
          

          if (!currentCombinations || currentCombinations.length == 0) {
            let combinationName = valueName;
            combinations.push(combinationName);
          }
          else {
            for (let combinationIndex = 0; combinationIndex < currentCombinations.length; combinationIndex++) {
              let currentCombination = currentCombinations[combinationIndex];
              let combinationName = [valueName];
              if(Array.isArray(currentCombination)){
                
                for(let newCurrentCombination of currentCombination){
                    combinationName.push(newCurrentCombination)
                }
              }else{
                
                combinationName.push(currentCombination);
              }
              combinations.push({
                directions: combinationName,
                bookingComponents: extraData
              });
            }
          }
        }
        return mainCombinations(tempFields, combinations);
      }
    }
    return mainCombinations(fields);
}


  module.exports = createCombinations;