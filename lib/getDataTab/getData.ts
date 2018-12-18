  import get_data_from_table from "../get_data_from_table";  
  
  function dataTable(router) {
      var all_data = get_data_from_table();
      router.get("/tab_to_json", (req, res) => {
          res.send(all_data);
      });      
  }
    
  export default dataTable;