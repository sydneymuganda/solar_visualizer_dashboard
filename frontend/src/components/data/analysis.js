//import {Configuration, OpenAIApi} from "openai";
//import  express from "express";
//import bodyParser from "m";


  
  export function findMaxTotal(arr) {
      return Math.max(...arr.map(item => item.total));
  }
  export function findMaxDiff(arr) {
    return Math.max(...arr.map(item => item.difference));
}
  export function findMaxConsumed(arr) {
    return Math.max(...arr.map(item => item.incomer));
}

export function findMaxGenerated(arr) {
    return Math.max(...arr.map(item => item.solar));
}
 // console.log(findMaxTotal(data));  // Outputs: 45 (or whatever the maximum is in your data)
  

 export function sumAllTotal(arr) {
    return arr.reduce((sum, item) => sum + item.total, 0);
}
export function sumAllDiff(arr) {
    return arr.reduce((sum, item) => sum + item.difference, 0);
}
export function findAllConsumed(arr) {
    return arr.reduce((sum, item) => sum + item.incomer, 0);
}

export function findAllGenerated(arr) {
    return arr.reduce((sum, item) => sum + item.solar, 0);
}
export function findMinTotal(arr) {
    return Math.min(...arr.map(item => item.total));
}
export function findMinDiff(arr) {
    return Math.min(...arr.map(item => item.difference));
}
export function findMinConsumed(arr) {
    return Math.min(...arr.map(item => item.incomer));
}

export function findMinGenerated(arr) {
    return Math.min(...arr.map(item => item.solar));
}

export function Totalconsumed(arr) {
    return Math.min(...arr.map(item => item.powerConsumed));
}

export function modifyData(data,season){
    let modifiedUserData;
    let modifiedUserSavedData;
    
    // Modify data based on the season
    if (season === "summer") {
        // Example: increase usage by 20% and decrease conservation by 10% for summer
        modifiedUserData = userData.map(data => ({ ...data, total: data.total * 1.2 }));
        modifiedUserSavedData = userSavedData.map(data => ({ ...data, difference: data.difference * 0.9 }));
    } if (season === "winter") {
        // Example: increase usage by 20% and decrease conservation by 10% for summer
        modifiedUserData = userData.map(data => ({ ...data, total: data.total * 1.2 }));
        modifiedUserSavedData = userSavedData.map(data => ({ ...data, difference: data.difference * 0.9 }));
     } else {
        // If season is not summer, use original data
        modifiedUserData = userData;
        modifiedUserSavedData = userSavedData;
    }

}

/*const configuration =new Configuration({
   organization:"",
   apiKey:"",

})*/