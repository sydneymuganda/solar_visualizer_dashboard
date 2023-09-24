class DevelopmentConfig:
    DEBUG = True
    SQLALCHEMY_BINDS = {
      'solarHourly':'sqlite:///solarHourly.db',
      'waterHourly':'sqlite:///waterHourly.db',
      'solarDaily':'sqlite:///solarDaily.db',
      'solarWeekly':'sqlite:///solarWeekly.db',
      'solarMonthly':'sqlite:///solarMonthly.db',
      'solarYearly':'sqlite:///solarYearly.db',
    }
    SQLALCHEMY_TRACK_MODIFICATIONS = False
