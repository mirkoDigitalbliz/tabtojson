const tabletojson = require('tabletojson');

async function getData() {
   try {          
    let data = [];
    await tabletojson.convertUrl(
    'https://coinmarketcap.com/currencies/bitcoin/historical-data/?start=20180728&end=20181217',
    { useFirstRowForHeadings: true },
    function(tablesAsJson) {
        data.push(tablesAsJson);
        }
    );   
    console.log(data);
    return data;
   } catch (e) {
       console.log("scraping start", e)
       return "error";
   }
}

export default getData;