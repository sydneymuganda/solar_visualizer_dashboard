from flask import Blueprint, request, jsonify
from models.solarModels import *
import json
from flask_cors import cross_origin 
import pandas as pd

solar_BluePrint = Blueprint('solar', __name__)
@solar_BluePrint.route('/todaySolarValues', methods=['GET'])
@cross_origin()
def todaySolarValues():
  # Get the file
  solarGenerationData = openFile()
  
  # Get the date of search
  getDate = request.args.get("date").replace("{", "").replace("}", "")
  
  # Get the current date to be searched
  dateSearch = pd.to_datetime(getDate).date()
  
  # Filter For a Particular Date and just get the hour part. Sort it before
  filtered_solar_data = solarGenerationData[solarGenerationData['timedate'].dt.date == dateSearch]
  filtered_solar_data['timedate'] = filtered_solar_data['timedate'].dt.hour.astype(str)
  filtered_solar_data['timedate'] = filtered_solar_data['timedate'] + ":00"
  
  # Return data in jsonified form
  return (filtered_solar_data.to_json(orient='records'))
@solar_BluePrint.route('/todayWeekSolarValues', methods=['GET'])
def thisWeeksValues():
  # Get the file
  solarGenerationData = openFile()
  
  # Get the date of search
  getDate = request.args.get("date").replace("{", "").replace("}", "")
  
  # Get the current date to be searched
  dateSearch = pd.to_datetime(getDate).date()
  one_week_behind = dateSearch - timedelta(days=6)
  
  # Filter Database for all values within that range
  filter_week = solarGenerationData[(solarGenerationData['timedate'].dt.date <= dateSearch) & (solarGenerationData['timedate'].dt.date>= one_week_behind)]
  
  # Get day value and sort that
  filter_week['timedate'] = filter_week['timedate'].dt.day
  # Get Averaged Data
  filter_week = getAverages(filter_week)
  # Return data in jsonified form
  return (filter_week.to_json(orient='records'))
  
@solar_BluePrint.route('/thisMonthSolarValues', methods=['GET'])
def thisMonthValues():
  # Get dataset
  solarGenerationData = openFile()
  
  # Get the date of search
  getDate = request.args.get("date").replace("{", "").replace("}", "")
  
  # Get the current date to be searched
  dateSearch = pd.to_datetime(getDate).date()
  
  # Filter Through For all Data for the Month and tweak it to each day of that month
  filtered_solarGenerationData = solarGenerationData[solarGenerationData['timedate'].dt.month == dateSearch.month]
  filtered_solarGenerationData['timedate'] = filtered_solarGenerationData['timedate'].dt.day
    
  #Get Averaged Data
  filtered_solarGenerationData = getAverages(filtered_solarGenerationData)

  # Return data in jsonified form
  return (filtered_solarGenerationData.to_json(orient='records'))

@solar_BluePrint.route('/thisYearSolarValues', methods=['GET'])
def thisYearValues():
  # Get the file
  solarGenerationData = openFile()
  
  # Get the date of search
  getDate = request.args.get("date").replace("{", "").replace("}", "")
  
  # Get the current date to be searched
  dateSearch = pd.to_datetime(getDate).date()
  
  # Filter Through For all Data for each Month
  filtered_solar_data = solarGenerationData[solarGenerationData['timedate'].dt.year == dateSearch.year]
  filtered_solar_data['timedate'] = filtered_solar_data['timedate'].dt.month
  #Get Averaged Data
  filtered_solar_data = getAverages(filtered_solar_data)
  # Change Month part to actual Name
  filtered_solar_data = changeMonthNames(filtered_solar_data)

  # Return data in jsonified form
  return (filtered_solar_data.to_json(orient='records'))

# Read and Tweak the file
def openFile():
  # Read the required file(For now we just take July)
  solarGenerationData = pd.read_csv("./databases/solarGeneration_2023.csv", delimiter=';', na_values=['x'])
  solarConsumptionData = pd.read_csv("./databases/solarConsumption_2023.csv")
  
  solarGenerationData.fillna(0, inplace = True)
  # Tweak The Column names
  solarGenerationData = solarGenerationData.rename(columns={"Timestamp": "timedate" ,
                                        "UCT - DSchool - Basics - UCT - DSchool Incomer Power [W] - P_INCOMER":"incomer",	
                                        "UCT - DSchool - Basics - UCT - DSchool Load Power [W] - P_LOAD":"load",	
                                        "UCT - DSchool - Basics - UCT - DSchool Solar [W] - P_SOLAR":"solar"})
  
  # Filter out for only essential Data
  solarConsumptionData = solarConsumptionData[solarConsumptionData['Meter Name'] == 'UCT School of Design - Essential Meter Main DB']
  
  # Get Timestamp & Exported Kilowhatt Hours, then change name of columns
  solarConsumptionData = solarConsumptionData[["Timestamp", "ImpkWh"]]
  solarConsumptionData = solarConsumptionData.rename(columns={"Timestamp":"timedate",
                                                            "ImpkWh": "powerConsumed"})
  # Change timedate to datetime format
  solarGenerationData['timedate'] = pd.to_datetime(solarGenerationData['timedate'])
  solarConsumptionData['timedate'] = pd.to_datetime(solarConsumptionData['timedate'])
  
  # Sort by ascending order
  solarGenerationData = solarGenerationData.sort_values(by='timedate', ascending=True)
  solarConsumptionData = solarConsumptionData.sort_values(by='timedate', ascending=True)
  
  # Concatenate the 2 dataframes
  solarData = pd.concat([solarGenerationData[['timedate', 'solar', 'incomer']], solarConsumptionData[['powerConsumed']]], axis=1)
  
  return solarData
  
def changeMonthNames(data):
  # Month Dictionary
  month_dict = {
      1: 'January',
      2: 'February',
      3: 'March',
      4: 'April',
      5: 'May',
      6: 'June',
      7: 'July',
      8: 'August',
      9: 'September',
      10: 'October',
      11: 'November',
      12: 'December'
  }
  # Map to the functions
  data['timedate'] = data['timedate'].map(month_dict)
  
  # return dataframe
  return data
  
def getAverages(data):
  # Create dataframe with only 4 Main columns: datetime, total, difference, flowrate
  subFrame = pd.DataFrame(columns=['timedate', 'load', 'solar', 'incomer'])
  # Get the times of all values
  dates_times = data['timedate'].unique()
  
  # Loop through All elements in array
  for currentValue in dates_times:
    count = (data['timedate'] == currentValue).sum()
    # Filter through Database
    time_filter = data[data['timedate'] == currentValue]
    
    # Get totals
    load = time_filter['powerConsumed'].sum()/count
    solar = time_filter['solar'].sum()/count
    incomer = time_filter['incomer'].sum()/count
    
    # Add it back to subframe
    sumValues = [{'timedate':currentValue, 'powerConsumed':load, 'solar':solar, 'incomer':incomer}]
    sumValuesdata = pd.DataFrame(sumValues)
    
    subFrame = pd.concat([subFrame, sumValuesdata], ignore_index=True)
    
  return subFrame
  
  