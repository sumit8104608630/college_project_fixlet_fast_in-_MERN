// let's create the live web socket server 
// let's first require the http from module 
const http=require("http");
// let's require the Server from socket.io
const { Server } = require("socket.io");
//let's require the the app from the app file

const express=require("express");
const app=express()

// now creating the server
const server=http.createServer(app);
const io = new Server( server,{cors: {origin:"*"}});

// exports the io as module

module.exports = {io};

