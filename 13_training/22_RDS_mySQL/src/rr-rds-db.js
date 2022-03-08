import { RDSClient, AddRoleToDBClusterCommand } from "@aws-sdk/client-rds";
import { createConnection } from "mysql";
const run = async () => {
const con = createConnection({
host: "database-1.c7mrrjjwslyf.eu-central-1.rds.amazonaws.com",
user: "admin",
password: "1qaz2wsx",
database: "firstDB"
});
const conRR = createConnection({
host: "database-1-rr.c7mrrjjwslyf.eu-central-1.rds.amazonaws.com",
user: "admin",
password: "1qaz2wsx",
database: "firstDB"
});
con.connect(function (err) {
var sql = "INSERT INTO customers (name, address) VALUES('Company Inc', 'Highway 37 A')";
con.query(sql, function (err, result) {
    if (err)
    throw err;
    console.log("1 record inserted");
});
con.query("SELECT * FROM customers", function (err, result, fields) {
    if (err)
    throw err;
    console.log("Con result");
    console.log(result);
});
});
conRR.connect(function (err) {
var sql = "INSERT INTO customers (name, address) VALUES('Company Inc', 'Highway 37 B')";
conRR.query(sql, function (err, result) {
if (err)
throw err;
console.log("1 record inserted");
});
conRR.query("SELECT * FROM customers", function (err,result, fields) {
    if (err)
    throw err;
    console.log("Read replica result");
    console.log(result);
});
});
};
run();