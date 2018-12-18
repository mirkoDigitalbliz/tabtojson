  import get_data_from_table from "../get_data_from_table"; 
  var cronJob = require('cron').CronJob;
  new cronJob("* 30 * * * *", get_data_from_table, null, true);

  function dataTable(router) {      
      router.get("/tab_to_json", (req, res) => {
        get_data_from_table().then((result) => {
            res.json(result);
          });
      });      
  }
    
export default dataTable;