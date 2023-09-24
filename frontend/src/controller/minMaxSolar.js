// Get the min and max values
function getMinMax(responseData){
  const types = ["incomer", "load", "solar"];
  const minValues = [100000,100000,100000];
  const maxValues = [-100000,-100000,-100000];
  console.log(responseData.length);
  // Loop through each element
  responseData.forEach(reading => {
    
    // Checking incomer
    if(reading.incomer < minValues[0]){
      minValues[0] = reading.incomer;
    }else if(reading.incomer > minValues[0]){
      maxValues[0] = reading.incomer;
    }

    // Checking incomer
    if(reading.load < minValues[1]){
      minValues[1] = reading.load;
    }else if(reading.load > minValues[1]){
      maxValues[1] = reading.load;
    }

    // Checking incomer
    if(reading.solar < minValues[2]){
      minValues[2] = reading.solar;
    }else if(reading.solar > minValues[2]){
      maxValues[2] = reading.solar;
    }

    
  });
  //Return Min and Max
  return (minValues.concat(maxValues));
}

export default getMinMax;