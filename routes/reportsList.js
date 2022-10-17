const {Client} = require('pg');
const client = new Client({
    host: "10.3.1.52",
    user: "alvin@dewse.net",
    port: 49161,
    password: "temp1234!",
    database: "TESTDB"
})

//var connectionString = "postgres://alvin@dewse.net:temp1234!@10.3.1.52:49164/TESTDB";

//const client = new Client({
//    connectionString: connectionString
//});

client.connect();




exports.list = function (req, res) {
    console.log('QUERY START')
    console.log(req.query);
    console.log(req.query.reportName);
    console.log('QUERY END')

    var sqlString
    var tableParams
    
    client.query('SELECT * FROM "WHATISTHIS"."ReportsList"', function (err, resultsMenu) {
            if (err) {
                console.log(err);
                res.status(400).send(err);
            }

            if(!req.query){
                console.log('NO REPORT');
                res.render('reportsList/list', { title: "MOPED Reports", menu: resultsMenu.rows, data: 'No Data'});
            }else
            {
                console.log('HAS REPORT');
                if(req.query.reportName=='Chart Test') {
                    sqlString = 'SELECT "DTE", "MSA", SUM("AdjIncoming") AS "AdjIncoming", SUM("Proc") AS "Proc", Sum("WoH") AS "WoH", Avg("CalcAHT") AS "CalcAHT" FROM "WHATISTHIS"."MSA_Processing" WHERE "MSA"=\'MSA_GREEN\' GROUP BY "DTE", "MSA" ORDER BY "DTE"'

//                    client.query('SELECT DISTINCT("MSA") FROM "WHATISTHIS"."MSA_Processing"', function (err, msaReports) {
  //                      if (err) {
    //                        console.log(err);
      //                      res.status(400).send(err);
        //                } 
          //          });
                    //console.log(msaReports)

                }
                
                else if(req.query.reportName=='MSA_Processing') {
                    sqlString = 'SELECT "DTE", "MSA", SUM("AdjIncoming") AS "AdjIncoming", SUM("Proc") AS "Proc", Sum("WoH") AS "WoH", Avg("CalcAHT") AS "CalcAHT" FROM "WHATISTHIS"."MSA_Processing" GROUP BY "DTE", "MSA" ORDER BY "DTE"'
                }


                if(sqlString) {
                //console.log(sqlString)
                client.query(sqlString, function (err, results) {
                    if (err) {
                        console.log(err);
                        res.status(400).send(err);
                    }
                    //console.group(results.rows);
                if(req.query.reportName=='Chart Test'){
                    res.render('reportsList/chartTest', { title: "MOPED Reports - Chart Test", menu: resultsMenu.rows, chartTitle: "MSA_GREEN",  data: JSON.stringify(results.rows)}); 
                    } else {
                    res.render('reportsList/list', { title: "MOPED Reports", menu: resultsMenu.rows, data: results.rows});
                    }
                });
                
            }
            else
            {
                console.log('NO REPORT')
                res.render('reportsList/list', { title: "MOPED Reports", menu: resultsMenu.rows, data: 'No Data'});
            }

            }
            
            

    });

};

exports.chartTest = function(req, res) {
    client.query('SELECT * FROM "WHATISTHIS"."ReportsList"', function (err, resultsMenu) {
        if (err) {
            console.log(err);
            res.status(400).send(err);
        }

        client.query('SELECT * FROM "WHATISTHIS"."ChartData"', function (err, results) {
            if (err) {
                console.log(err);
                res.status(400).send(err);
            }

            res.render('reportsList/chartTest', { title: "MOPED Reports", menu: resultsMenu.rows, data: results.rows});
         });
    });
   
}

exports.add = function (req, res) {
    res.render('customer/add', { title: "Add Customer"  });
};

exports.edit = function (req, res) {

    var id = req.params.id;

    client.query('SELECT * FROM "WHATISTHIS"."customer" WHERE id=$1', [id], function (err, result) {
        if (err) {
            console.log(err);
            res.status(400).send(err);
        }
        res.render('customer/edit', { title: "Edit Customer", data: result.rows });
    });

};

exports.save = function (req, res) {

    var cols = [req.body.name, req.body.address, req.body.email, req.body.phone];

    client.query('INSERT INTO "WHATISTHIS"."customer"(name, address, email, phone) VALUES($1, $2, $3, $4) RETURNING *', cols, function (err, result) {
        if (err) {
            console.log("Error Saving : %s ", err);
        }
        res.redirect('/customers');
    });

};

exports.update = function (req, res) {

    var cols = [req.body.name, req.body.address, req.body.email, req.body.phone, req.params.id];

    client.query('UPDATE "public"."customer" SET name=$1, address=$2,email=$3, phone=$4 WHERE id=$5', cols, function (err, result) {
        if (err) {
            console.log("Error Updating : %s ", err);
        }
        res.redirect('/customers');
    });

};

exports.delete = function (req, res) {

    var id = req.params.id;

    client.query('DELETE FROM "WHATISTHIS"."customer" WHERE id=$1', [id], function (err, rows) {
        if (err) {
            console.log("Error deleting : %s ", err);
        }
        res.redirect('/customers');
    });

};


