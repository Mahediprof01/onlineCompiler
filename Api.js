const express = require("express");
const app = express();
const bodyP = require("body-parser");
const compiler = require("compilex");
const options = { stats: true };

compiler.init(options);
app.use(bodyP.json());
app.use("/codemirror-5.65.16", express.static("D:/onlineCompiler/codemirror-5.65.16"));

app.get("/", function (req, res) {
    res.sendFile('D:/onlineCompiler/index.html');
});

app.post("/compile", function (req, res) {
    var code = req.body.code;
    var input = req.body.input;
    var lang = req.body.lang;
    var envData;

    try {
        if (lang === "C++") {
            envData = { OS: "windows", cmd: "C:\\MinGW\\bin\\g++.exe", options: { timeout: 10000 } }; // Full path to g++
            if (!input) {
                compiler.compileCPP(envData, code, function (data) {
                    if (data.error) {
                        console.log("C++ Compilation Error:", data.error);
                        res.send({ output: data.error });
                    } else {
                        res.send(data);
                    }
                });
            } else {
                compiler.compileCPPWithInput(envData, code, input, function (data) {
                    if (data.error) {
                        console.log("C++ Compilation Error:", data.error);
                        res.send({ output: data.error });
                    } else {
                        res.send(data);
                    }
                });
            }
        } else if (lang === "Java") {
            envData = { OS: "windows", cmd: "C:\\Program Files\\Java\\jdk-17\\bin\\javac.exe" }; // Full path to javac
            if (!input) {
                compiler.compileJava(envData, code, function (data) {
                    if (data.error) {
                        console.log("Java Compilation Error:", data.error);
                        res.send({ output: data.error });
                    } else {
                        res.send(data);
                    }
                });
            } else {
                compiler.compileJavaWithInput(envData, code, input, function (data) {
                    if (data.error) {
                        console.log("Java Compilation Error:", data.error);
                        res.send({ output: data.error });
                    } else {
                        res.send(data);
                    }
                });
            }
        } else if (lang === "Python") {
            envData = { OS: "windows" };
            if (!input) {
                compiler.compilePython(envData, code, function (data) {
                    if (data.error) {
                        console.log("Python Compilation Error:", data.error);
                        res.send({ output: data.error });
                    } else {
                        res.send(data);
                    }
                });
            } else {
                compiler.compilePythonWithInput(envData, code, input, function (data) {
                    if (data.error) {
                        console.log("Python Compilation Error:", data.error);
                        res.send({ output: data.error });
                    } else {
                        res.send(data);
                    }
                });
            }
        } else {
            res.send({ output: "Invalid language" });
        }
    } catch (e) {
        console.log("Server Error:", e);
        res.send({ output: "error" });
    }
});

app.listen(8000, () => {
    console.log("Server running on port 8000");
});
