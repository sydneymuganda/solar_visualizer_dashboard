from datetime import datetime, timedelta
from flask_sqlalchemy import SQLAlchemy
  
class solarDatabase:
  def __init__(self, incomer, load, solar):
    self.incomer = incomer
    self.load = load
    self.solar = solar
    
class solarHourly(solarDatabase):
  def __init__(self,  time, incomer, load, solar):
    super().__init__( incomer, load, solar)
    self.time = time
    
class solarDaily(solarDatabase):
  def __init__(self, day, incomer, load, solar):
    super().__init__( incomer, load, solar)
    self.day = day
    
class solarMonthly(solarDatabase):
  def __init__(self, month, incomer, load, solar):
    super().__init__( incomer, load, solar)
    self.month = month