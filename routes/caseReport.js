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
console.log('SELECT * FROM "WHATISTHIS"."SupportCase"');
    client.query('SELECT * FROM "WHATISTHIS"."SupportCase"', function (err, result) {
        if (err) {
            console.log(err);
            res.status(400).send(err);
        }

            res.render('caseReport/list', { title: "Support Cases", data: result.rows});

    });

};
console.log('done...');
exports.add = function (req, res) {
    res.render('caseReport/add', { title: "Add Customer"  });
};

exports.edit = function (req, res) {

    var id = req.params.id;

    client.query('SELECT * FROM "WHATISTHIS"."SupportCase" WHERE id=$1', [id], function (err, result) {
        if (err) {
            console.log(err);
            res.status(400).send(err);
        }
        res.render('caseReport/edit', { title: "Edit Case", data: result.rows });
    });

};

exports.save = function (req, res) {

    var cols = [req.body.CallerName, req.body.Issue, req.body.Solution];
    console.log(req.body.CallerName)

    client.query('INSERT INTO "WHATISTHIS"."SupportCase" ("CallerName", "Issue", "Solution") VALUES($1, $2, $3) RETURNING *', cols, function (err, result) {
        if (err) {
            console.log("Error Saving : %s ", err);
        }
        res.redirect('/caseReport');
    });

};

exports.update = function (req, res) {

    var cols = [req.body.name, req.body.address, req.body.email, req.body.phone, req.params.id];

    client.query('UPDATE "WHATISTHIS"."SupportCase" SET CallerName=$1, Issue=$2,Solution=$3 WHERE id=$5', cols, function (err, result) {
        if (err) {
            console.log("Error Updating : %s ", err);
        }
        res.redirect('/caseReport');
    });

};

exports.delete = function (req, res) {

    var id = req.params.id;

    client.query('DELETE FROM "WHATISTHIS"."SupportCase" WHERE id=$1', [id], function (err, rows) {
        if (err) {
            console.log("Error deleting : %s ", err);
        }
        res.redirect('/caseReport');
    });

};


