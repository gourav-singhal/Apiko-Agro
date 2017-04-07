const schedule = require('node-schedule');
const findEndingContracts = require('./tasks/end-of-contract');

/**
 * Provide tasks schedule execution
 *
 * just create new task in ./tasks folder and
 * set time of execution via docs below
 *
     *    *    *    *    *    *
     ┬    ┬    ┬    ┬    ┬    ┬
     │    │    │    │    │    |
     │    │    │    │    │    └ day of week (0 - 7) (0 or 7 is Sun)
     │    │    │    │    └───── month (1 - 12)
     │    │    │    └────────── day of month (1 - 31)
     │    │    └─────────────── hour (0 - 23)
     │    └──────────────────── minute (0 - 59)
     └───────────────────────── second (0 - 59, OPTIONAL)
 **/

schedule.scheduleJob('2 * * *', findEndingContracts);
