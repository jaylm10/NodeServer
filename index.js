const fs = require("fs");
const http = require("http");
const path = require("path");
const querystring = require("querystring");
const port = 3000;

const home = path.join(__dirname,"public/index.html");
const form = path.join(__dirname,"/public/form.html");
const card = path.join(__dirname,"/public/card.html");
const file = path.join(__dirname,"/obj.json");

const app = http.createServer((req,res)=>{
    if(req.url==="/"){
        fs.readFile(home,"utf-8",(err,data)=>{
            if(err){
                console.log(err);
                
            } else{
                res.writeHead(200,{"Content-Type":"text/html"});
                res.end(data);
            }
        })
    } else if(req.url==="/form"){
        fs.readFile(form,"utf-8",(err,data)=>{
            if(err){
                console.log(err);
                
            } else{
                res.writeHead(200,{"Content-Type":"text/html"});
                res.end(data);
            }
        })
    } 
    else if(req.url==="/card"){
        fs.readFile(card,"utf-8",(err,data)=>{
            if(err){
                console.log(err);
                
            } else{
                res.writeHead(200,{"Content-Type":"text/html"});
                res.end(data);
            }
        })

    }
     else if(req.url==="/submit"){
        let body="";
        req.on("data",(chunks)=>{
           body+= chunks.toString();
        })
        req.on("end",()=>{
            let parsedData = querystring.parse(body);
            fs.readFile("obj.json","utf-8",(err,data)=>{
              if(data==""){
                parsedData = [parsedData];
                fs.writeFile("obj.json",JSON.stringify(parsedData,null,2),(err)=>{
                    if(err) console.log(err);
                    
                })
              } else{
                let jsonArray = JSON.parse(data);
                jsonArray.push(parsedData);
                fs.writeFile("obj.json",JSON.stringify(jsonArray,null,2),(err)=>{
                    if(err) console.log(err);
                    
                });
              }
            })
            res.writeHead(302,{location:"/"});
            res.end();

        })
    } else if(req.url === "/obj.json"){
        fs.readFile(file,"utf-8",(err,data)=>{
            if(err) console.log(err);
            else{
                res.writeHead(200,{"Content-Type":"application/json"});
                res.end(data);
            }
            
        })
    }

})

app.listen(port,()=>{
    console.log(`Server running on http://localhost:${port}`);
    
})