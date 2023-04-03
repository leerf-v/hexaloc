let http = require('http')
let fs = require('fs')
let url = require ('url')

const hostname = '127.0.0.1'
const port = 8080;

const server = http.createServer()

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});

server.on('request',(request,response) => {


    // Analyse de la requête : 

    //console.log("Il y a eu une requête ! URL : "+request.url)
    //console.log(url.parse(request.url,true)) // Mettre true découpe les arguments en objets exploitables
    


    // if(url.parse(request.url,true).query.name !== undefined){
    
    //   console.log(`La valeur de l'argument "nom" est => ` + url.parse(request.url,true).query.name)

    // }else{

    //   console.log(`Pas d'argument "nom" dans la requête`)

    // }

    // Lecture d'un ficher HTML pour le renvoyer ensuite 

    fs.readFile("./index.html" , "utf-8" , (err,data) => {

      if(err){ //S'il y a eu un couac

        response.writeHead(404, { 'Content-Type': 'text/html; charset=utf-8'}); 
        response.end("Hexacode d'erreur : 001")
        console.log("Hexacode d'erreur : 001")
        
      }else{

        response.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8'}); 
        response.end(data) // Renvoi de la page

      }
    })
})









