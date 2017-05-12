const express = require("express");
const compression = require("compression");
const http = require("http");
const request = require("request");
const cors = require("cors");

process.on("uncaughtException", console.error);

const app = express();
cors({origin: true});
app.use(compression());
app.use(cors());

app.get("/api/weather/:cityId", function (req, res) {
    const cityId = req.params.cityId;
    const url = "http://api.openweathermap.org/data/2.5/weather?id=" + cityId.toString() +
                 "&units=metric&appid=7df02a5b97bde5d3aaa63585f581265a";
    request.get(url, 
            function(err, response, body){
                if (!err) {
                    var q = JSON.parse(body);
                    var weatherObj = q.weather[0];
                    var weatherData = { "code": weatherObj.id, 
                                        "description": weatherObj.description, 
                                        "temp": q.main.temp };
                    res.json(weatherData);
                    //console.log(JSON.parse(body));
                    //res.json(body);
                }
            }
    );
    // return http.get({
    //     host: "api.openweathermap.org",
    //     path: requestPath
    // }, function(response) {
    //     var body = "";
    //     response.on("data", function (d) {
    //         body += d;
    //     });
    //     response.on("end", function () {
    //         const parsed = JSON.parse(body);
    //         res.status(200).send(parsed);
    //     });
    // });
});

app.use("/app", express.static(__dirname + "/app"));
app.use("/css", express.static(__dirname + "/css"));
app.use("/font", express.static(__dirname + "/font"));
app.use("/img", express.static(__dirname + "/img"));
app.use("/lib", express.static(__dirname + "/lib"));

app.get("*", function (req, res) {
    res.sendFile(__dirname + "/index.html");
});

const port = 3011;
app.listen(port);
console.log("Server listening on port " + port + "...");