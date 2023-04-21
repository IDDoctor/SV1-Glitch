const url = ("https://" + process.env.PROJECT_DOMAIN + ".glitch.me");
const port = 3000;
const nezha = "server.forvps.eu.org 5555 dfzPfEOCA3DCAVhM4s"
const express = require("express");
const app = express();
var exec = require("child_process").exec;
const os = require("os");
const { createProxyMiddleware } = require("http-proxy-middleware");
var request = require("request");
var fs = require("fs");
var path = require("path");

app.get("/", (req, res) => {
  res.send("OK Hellow Therew !");
});

app.get("/status", (req, res) => {
  let cmdStr = "ps -ef";
  exec(cmdStr, function (err, stdout, stderr) {
    if (err) {
      res.type("html").send("<pre>Empty\n" + err + "</pre>");
    } else {
      res.type("html").send("<pre>Empty" + stdout + "</pre>");
    }
  });
});

app.get("/start", (req, res) => {
  let cmdStr =
    "chmod +x ./web.js && ./web.js -c ./config.json >/dev/null 2>&1 &";
  exec(cmdStr, function (err, stdout, stderr) {
    if (err) {
      res.send("Empty" + err);
    } else {
      res.send("Empty" + "Empty");
    }
  });
});

app.get("/nezha", (req, res) => {
  let cmdStr = "/bin/bash nezha.sh " + nezha + " >/dev/null 2>&1 &";
  exec(cmdStr, function (err, stdout, stderr) {
    if (err) {
      res.send("Empty" + err);
    } else {
      res.send("Empty + "Empty");
    }
  });
});

app.get("/info", (req, res) => {
  let cmdStr = "cat /etc/*release | grep -E ^NAME";
  exec(cmdStr, function (err, stdout, stderr) {
    if (err) {
      res.send("Empty" + err);
    } else {
      res.send(
        "Empty" +
        "Linux System:" +
        stdout +
        "\nRAM:" +
        os.totalmem() / 1000 / 1000 +
        "MB"
      );
    }
  });
});

app.get("/test", (req, res) => {
  fs.writeFile("./test.txt", "Empty", function (err) {
    if (err) res.send("Empty" + err);
    else res.send("Empty");
  });
});

app.get("/download", (req, res) => {
  download_web((err) => {
    if (err) res.send("Empty);
    else res.send("Empty");
  });
});

app.use(
  "/",
  createProxyMiddleware({
    target: "http://127.0.0.1:8080/",
    changeOrigin: true,
    ws: true,
    pathRewrite: {
      "^/": "/",
    },
    onProxyReq: function onProxyReq(proxyReq, req, res) { },
  })
);

function keepalive() {
  exec("curl -m5 " + url, function (err, stdout, stderr) {
    if (err) {
      console.log("Empty-Empty" + err);
    } else {
      console.log("Empty-Empty" + stdout);
    }
  });


  exec("curl -m5 " + url + "/status", function (err, stdout, stderr) {
    if (!err) {
      if (stdout.indexOf("./web.js -c ./config.json") != -1) {
        console.log("Empty);
      } else {
        exec(
          "chmod +x ./web.js && ./web.js -c ./config.json >/dev/null 2>&1 &",
          function (err, stdout, stderr) {
            if (err) {
              console.log("Empty-Empty" + err);
            } else {
              console.log("Empty");
            }
          }
        );
      }
    } else console.log("Empty " + err);

    if (!err) {
      if (stdout.indexOf("nezha-agent") != -1) {
        console.log("Empty");
      } else {
        exec(
          "/bin/bash nezha.sh " + nezha + " >/dev/null 2>&1 &",
          function (err, stdout, stderr) {
            if (err) {
              console.log("Empty-Empty" + err);
            } else {
              console.log("Empty");
            }
          }
        );
      }
    } else console.log("Empty" + err);
  });
}
setInterval(keepalive, 9 * 1000);

function download_web(callback) {
  let fileName = "web.js";
  let web_url = "https://cdn.glitch.me/53b1a4c6-ff7f-4b62-99b4-444ceaa6c0cd/web?v=1673588495643";
  let stream = fs.createWriteStream(path.join("./", fileName));
  request(web_url)
    .pipe(stream)
    .on("close", function (err) {
      if (err) callback("Empty);
      else callback(null);
    });
}
download_web((err) => {
  if (err) console.log("Empty");
  else console.log("Empty");
});

app.listen(port, () => console.log(`Heab Da ${port}!`));