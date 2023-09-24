function getMinMaxWater(responseData){
  const types = ["total", "difference", "flowrate"];
  const minValues = [100000,100000,100000];
  const maxValues = [-100000,-100000,-100000];

  // Loop through each element
  responseData.forEach(reading => {
    
    // Checking total
    if(reading.total < minValues[0]){
      minValues[0] = reading.total;
    }else if(reading.total > minValues[0]){
      maxValues[0] = reading.total;
    }

    // Checking total
    if(reading.difference < minValues[1]){
      minValues[1] = reading.difference;
    }else if(reading.difference > minValues[1]){
      maxValues[1] = reading.difference;
    }

    // Checking total
    if(reading.flowrate < minValues[2]){
      minValues[2] = reading.flowrate;
    }else if(reading.flowrate > minValues[2]){
      maxValues[2] = reading.flowrate;
    }

    
  });
  //Return Min and Max
  return (minValues.concat(maxValues));
}

export default getMinMaxWater;