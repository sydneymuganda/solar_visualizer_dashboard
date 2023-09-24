from flask import Blueprint, request, jsonify
from models.solarModels import *
import json
from flask_cors import cross_origin 
import pandas as pd
from datetime import datetime

water_BluePrint = Blueprint('water', __name__)

# Get todays solar Values
@water_BluePrint.route('/todayWaterValues', methods = ['GET'])
def todayWaterValues():
  # Get dataset
  water_data = openFile()
  
  # Get the date of seach
  getDate = request.args.get("date").replace("{", "").replace("}", "")
  
  # Get the current date to be searched
  dateSearch = pd.to_datetime(getDate).date()
  
  # Filter For a Particular Date and just get the hour part. Sort it before
  filtered_water_data = water_data[water_data['timedate'].dt.date == dateSearch]
  filtered_water_data['timedate'] = filtered_water_data['timedate'].dt.hour.astype(str)
  filtered_water_data['timedate'] = filtered_water_data['timedate'] + ":00"

  # Get Which location to output
  location = request.args.get("location").replace("{", "").replace("}", "")
  # Filter By Location
  filtered_water_data = locationFilter(filtered_water_data, location)

  # Return data in jsonified form
  return (filtered_water_data.to_json(orient='records'))
  
# Get this weeks Water Values
@water_BluePrint.route('/thisWeekWaterValues', methods = ['GET'])
def thisWeekWaterValues():
  # Get dataset
  water_data = openFile()
  # Get the date of search
  getDate = request.args.get("date").replace("{", "").replace("}", "")
  
  # Get the current date to be searched
  # Get Desired Start Date & end of week date
  dateSearch = pd.to_datetime("2023-07-05").date()
  one_week_behind = dateSearch - timedelta(days=6)
  
  # Filter Database for all values within that range
  filter_week = water_data[(water_data['timedate'].dt.date >= dateSearch) & (water_data['timedate'].dt.date<= one_week_behind)]
  
  # Get day value and sort that
  filter_week['timedate'] = filter_week['timedate'].dt.day
  # Get Which location to output
  location = request.args.get("location").replace("{", "").replace("}", "")
  # Send it through the filter
  filter_week = locationFilter(filter_week, location)
  
  # Return data in jsonified form
  return (filter_week.to_json(orient='records'))
  
# Get This Month's water Values
@water_BluePrint.route('/thisMonthWaterValues', methods = ['GET'])
def thisMonthWaterValues():
  # Get dataset
  water_data = openFile()
  
  # Get the date of search
  getDate = request.args.get("date").replace("{", "").replace("}", "")
  
  # Get the current date to be searched
  dateSearch = pd.to_datetime(getDate).date()
  
  # Filter Through For all Data for the Month and tweak it to each day of that month
  filtered_water_data = water_data[water_data['timedate'].dt.month == dateSearch.month]
  filtered_water_data['timedate'] = filtered_water_data['timedate'].dt.day
  # Get Which location to output
  location = request.args.get("location").replace("{", "").replace("}", "")
  # Send it through the filter
  filter_month = locationFilter(filtered_water_data, location)
  
  # Return data in jsonified form
  return (filter_month.to_json(orient='records'))
  
# Get this years solar values
@water_BluePrint.route('/thisYearWaterValues', methods = ['GET'])
def thisYearWaterValues():
  # Get dataset
  water_data = openFile()
  
  # Get the date of search
  getDate = request.args.get("date").replace("{", "").replace("}", "")
  
  # Get the current date to be searched
  dateSearch = pd.to_datetime(getDate).date()
  
  # Filter Through For all Data for the Month and tweak it to each day of that month
  filtered_water_data = water_data[water_data['timedate'].dt.year == dateSearch.year]
  filtered_water_data['timedate'] = filtered_water_data['timedate'].dt.month
  
  # Get Which location to output
  location = request.args.get("location").replace("{", "").replace("}", "")
  
  # Send it through the filter
  filter_year = locationFilter(filtered_water_data, location)
  
  # Change Month part to actual Name
  filter_year = changeMonthNames(filter_year)
  
  # Return data in jsonified form
  return (filter_year.to_json(orient='records'))

# Function to get overall
def getOverall(data):
  # Create dataframe with only 4 Main columns: datetime, total, difference, flowrate
  subFrame = pd.DataFrame(columns=['timedate', 'total', 'difference', 'flowrate'])
  
  # Get the times of all values
  dates_times = data['timedate'].unique()
  
  # Loop through All elements in array
  for currentValue in dates_times:
    # Get number of times the instance occurs
    count = (data['timedate'] == currentValue).sum()
    
    # Get totals
    total = time_filter['total'].sum()
    difference = time_filter['difference'].sum()
    flowrate = time_filter['flowrate'].sum()
    
    # Add it back to subframe
    sumValues = [{'timedate':currentValue, 'total':total, 'difference':difference, 'flowrate':flowrate}]
    sumValuesdata = pd.DataFrame(sumValues)
    
    subFrame = pd.concat([subFrame, sumValuesdata], ignore_index=True)
    
  return subFrame

# Get Building part
def getSection(data, location):
  return data[data['serial'] == location]

# Get location and return database
def locationFilter(data, location):
  filterData = 0
  #Check condition if its overall or just a specific part of the building
  if location == "all":
    filterData = getOverall(data)
  else:
    filterData = getSection(data, location)
  return filterData

# Change Month Names
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

# Read and Tweak the file
def openFile():
  # Read the required file(For now we just take July)
  water_data = pd.read_csv("./databases/waterData_2023.csv")
  # Tweak The Column names
  water_data = water_data.rename(columns={"Internal Meter ID": "id" ,
                                        "Meter Serial":"serial",	
                                        "Meter Description":"description",	
                                        "tstamp":"timedate",
                                        "total_kl":"total",
                                        "difference_kl":"difference",
                                        "flow_rate":"flowrate"})
  # Change timedate to datetime format
  water_data['timedate'] = pd.to_datetime(water_data['timedate'])
  
  # Sort by ascending order
  water_data = water_data.sort_values(by='timedate', ascending=True)
  
  return water_data