const tabletojson = require('tabletojson');

async function getData() {
   try { 
          
    const data = tabletojson.convertUrl(
    'https://coinmarketcap.com/currencies/bitcoin/historical-data/?start=20180728&end=20181217',
    { useFirstRowForHeadings: true },
    function(tablesAsJson) {
      //console.log(tablesAsJson);
        }
    );    
        return data;
   } catch (e) {
       console.log("scraping start", e)
       return "error";
   }
}

export default getData;