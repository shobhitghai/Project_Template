var application_root = __dirname,
    express = require("express"),
    fs = require("fs"),
    bodyParser = require("body-parser"),
    // dataController = require("./private/controllers/dataController.js"),
    constants = require("./private/constants.js"),
    path = require('path'),
    port = 3001;

var app = express();

function server() {
    var self = this;
    self.configureExpress();
};

server.prototype.configureExpress = function() {
    var router = express.Router();

    app.use(bodyParser.urlencoded({
        extended: true
    }));
    app.use(bodyParser.json());
    app.use(express.static('public'));

    app.use('/api', router);
    app.get('/', function(req, res) {
        var obj;
        var filePath = path.join(__dirname, 'data/data.JSON');
        fs.readFile(filePath, 'utf8', function(err, data) {
            if (err) throw err;
            obj = JSON.parse(data);

            var i = 0;
            var resObj = [];
            for (i; i < obj.length; i++) {
                if (obj[i].arrivalCity == "Delhi" && obj[i].departureCity == "Mumbai") {
                    resObj.push(obj[i]);
                }
            }
            res.send(resObj);
        });
    });

    this.startServer();
}

server.prototype.startServer = function() {
    app.listen(port, function() {
        console.log("All right ! I am alive at Port." + port);
    });
}

server.prototype.stop = function(err) {
    console.log("ISSUE WITH MYSQL \n" + err);
    process.exit(1);
}

new server();



// [
//   '{{repeat(300)}}',
//   {
//     index: '{{index()}}',
//     guid: '{{guid()}}',
//     flightNumber: '{{floating(166, 385, 3, "0,0")}}',
//     ticketPrice: '{{floating(2000, 6000, 2, "0,0")}}',
//     arrivalTime: '',
//     refundable: '{{bool()}}',
//     duration: '{{integer(2, 5)}}',
//     picture: 'http://placehold.it/32x32',
//     departureTime: '{{date(new Date(2015, 0, 1), new Date(), "HH:mm")}}',
//     arrivalCity: "{{random('Delhi', 'Mumbai', 'Chennai', 'Pune', 'Chandigarh', 'Hyderabad', 'Bangalore', 'Jaipur', 'Indore')}}",
//     departureCity: "{{random('Delhi', 'Mumbai', 'Chennai', 'Pune', 'Chandigarh', 'Hyderabad', 'Bangalore', 'Jaipur', 'Indore')}}",
//     provider: "{{random('GoAir', 'Indigo', 'Jet', 'AI', 'SpiceJet', 'Air Asia' )}}",
//   }
// ]