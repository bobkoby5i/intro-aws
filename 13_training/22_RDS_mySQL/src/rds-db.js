import { RDSClient, AddRoleToDBClusterCommand } from "@aws-sdk/client-rds";
import { createConnection } from "mysql";
const run = async () => {
const con = createConnection({host: "database-1.c7mrrjjwslyf.eu-central-1.rds.amazonaws.com",
user: "admin",
password: "1qaz2wsx",
database: "firstDB"
});
con.connect(function (err) {
if (err)
throw err;
console.log("Connected!");
var sql = "CREATE TABLE customers (id INT AUTO_INCREMENT PRIMARY KEY, name VARCHAR(255), address VARCHAR(255))";
con.query(sql, function (err, result) {
if (err)
    throw err;
    console.log("Table created");
});
var sql = "INSERT INTO customers (name, address) VALUES('Company Inc', 'Highway 37')";
con.query(sql, function (err, result) {
    if (err) throw err;
    console.log("1 record inserted");
});
con.query("SELECT * FROM customers", function (err, result,fields) {
    if (err) throw err;
    console.log(result);
    });
});
};
run();