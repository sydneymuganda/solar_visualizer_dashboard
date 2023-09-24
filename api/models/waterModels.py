class waterDatabase:
  def __init__(self, id, serial, description, timedate, total, difference, flowrate):
    self.id = id
    self.serial = serial
    self.description = description
    self.timedate = timedate
    self.total = total
    self.difference = difference
    self.flowrate = flowrate
    
class waterHourly(waterDatabase):
  def __init__(self, id, serial, description, timedate, total, difference, flowrate):
    super.__init__(self, id, serial, description, timedate, total, difference, flowrate)
    
class waterDaily(waterDatabase):
  def __init__(self, id, serial, description, timedate, total, difference, flowrate):
    super.__init__(self, id, serial, description, timedate, total, difference, flowrate)
    
class waterMonthly(waterDatabase):
  def __init__(self, id, serial, description, timedate, total, difference, flowrate):
    super.__init__(self, id, serial, description, timedate, total, difference, flowrate)
    
class waterYearly(waterDatabase):
  def __init__(self, id, serial, description, timedate, total, difference, flowrate):
    super.__init__(self, id, serial, description, timedate, total, difference, flowrate)