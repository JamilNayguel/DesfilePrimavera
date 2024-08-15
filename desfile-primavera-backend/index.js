const express=
require("express")
var app= express()

app.get("/",function(request,response)
{
    response.send("hello word")
})
app.listen(10000,function(){
    console.log("started apli on port %d",10000)
})
