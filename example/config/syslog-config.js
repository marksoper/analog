
//
// modified logging levels for analog
//
 
var syslogConfig = exports;

syslogConfig.levels = {
  debug: 0,
  analog: 1, 
  info: 2, 
  notice: 3, 
  warning: 4,
  error: 5, 
  crit: 6,
  alert: 7,
  emerg: 8
};

syslogConfig.colors = {
  debug: 'blue',
  analog: 'green',
  info: 'green',
  notice: 'yellow',
  warning: 'red',
  error: 'red', 
  crit: 'red',
  alert: 'yellow',
  emerg: 'red'
};