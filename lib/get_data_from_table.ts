const tabletojson = require('tabletojson');
var mysql = require('mysql');

var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "mysql_coin"
});

async function getData() {
    try {
        let data = [];
        let keys = [];
        let tmp = [];
        let clean_array = [];
        let keys_array = [];
        let values_array = [];
        let promise_func = [];
        let coin_list = ['bitcoin', 'ripple', 'ethereum', 'eos', 'stellar', 'bitcoin-cash', 'tether', 'litecoin', 'bitcoin-sv', 'tron'];
        //let coin_list = ['bitcoin', 'ripple'];
        con.connect();
        // coin_list.forEach(async function (valueC, c) {
        for (var valueC of coin_list) {
            var token = valueC;
            await tabletojson.convertUrl(
                'https://coinmarketcap.com/currencies/' + token + '/historical-data/?start=20181116&end=20181217',
                //{ useFirstRowForHeadings: true },
                async function (tablesAsJson) {
                    data = tablesAsJson;
                    var value_pars
                    //await data[0].forEach(function (value, i) {
                    for (var value of data[0]) {
                        value = JSON.stringify(value);
                        value_pars = JSON.parse(value);
                        keys = Object.keys(value_pars);
                        for (var j = 0; j < keys.length; j++) {
                            var key = keys[j].replace(/[^a-zA-Z ]/g, "");
                            key = key.replace(" ", "_");
                            tmp[key] = value_pars[keys[j]];
                            clean_array.push(tmp);
                        }
                        const values = Object.keys(value_pars).map(key => value_pars[key]);
                        values[0] = (new Date(values[0]).getTime() / 1000)
                        values_array.push(values);

                    }
                    keys_array = await Object.keys(clean_array[0]);
                    token = token.replace("-", "_");

                    /*var sql_create_table = '';
                    sql_create_table = "CREATE TABLE " + token + " (id_row int NOT NULL AUTO_INCREMENT, " + keys_array[0] + " int(13), ";
                    for (var k = 1; k <= keys_array.length - 1; k++) {
                        sql_create_table += " " + keys_array[k].replace(" ", "_") + " DECIMAL(30,8) DEFAULT NULL,";
                    }
                    sql_create_table += " PRIMARY KEY (id_row) );"
                    promise_func.push(createTableQuery(sql_create_table, keys_array, token));*/

                    var sql = '';
                    sql = "INSERT INTO " + token + " (" + keys_array + ") VALUES ?";
                    promise_func.push(saveQuery(sql, values_array, token));
                    values_array = [];
                });

        }
        await Promise.all(promise_func);
        con.end();
        return data;
    } catch (e) {
        console.log("scraping start", e)
        return "error";
    }
}

async function saveQuery(sql, values_array, token) {
    let token_result
    await new Promise(function (resolve) {
        con.query(sql, [values_array], function (err, result) {
            if (err) throw err;
            console.log("Number of records inserted: " + result.affectedRows);
            if (!err) {
                token_result = token;
                resolve();
            }
        });
    });
    return token_result;
}

async function createTableQuery(sql_create_table, keys_array, token) {
    let token_result
    await new Promise(function (resolve) {
        con.query(sql_create_table, function (err, result) {
            if (err) throw err;
            console.log("Number of records inserted: " + result);
            if (!err) {
                token_result = token;
                resolve();
            }
        });
    });
    return token_result;
}

export default getData;