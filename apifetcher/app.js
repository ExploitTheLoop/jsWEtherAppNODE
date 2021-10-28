const fs = require('fs');
const http = require('http');
const requests = require('requests')
const { Http2ServerRequest } = require('http2');

const html = fs.readFileSync('html/index.html',"utf-8");

const replace = (tmpval,orgval)=>{
    let temp = tmpval.replace('{% temp %}',orgval.main.temp)
    return temp

}

const server = http.createServer((req,res)=>{



    
    if(req.url=="/"){

        
        requests('https://api.openweathermap.org/data/2.5/weather?q=Kolkata&appid=4a5ba8d1f93ccbb89959c42e14d12261')
            .on('data', function (chunk) {
            let response = JSON.parse(chunk)
            const arrdata = [response]
            const realtimedata = arrdata
            .map((val) => replace(html,val))
            .join(" ")

           console.log(realtimedata)
           res.write(realtimedata)
           res.end()

            })
            .on('end', function (err) {
            if (err) return console.log('connection closed due to errors', err);
            
            console.log('end');
            });
    }

})

server.listen(8000,"127.0.0.1");
