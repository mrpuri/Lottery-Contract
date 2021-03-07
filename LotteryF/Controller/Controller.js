const router = require('express');
const bodyparser = require('body-parser');
const Web3 = require('web3');
const MyContract = require("../build/contracts/Lottery.json");
const HDWalletProvider = require('truffle-hdwallet-provider')
require('dotenv').config();

   exports.owner = async (req, res) => {
    const mnemonic = process.env.mnemonic;
    httpProvider = process.env.httpProvider
    const provider =  new HDWalletProvider(mnemonic, httpProvider)
       const web3 = new Web3(provider);
       const networkId = await web3.eth.net.getId();
    
    
       const Contract = new web3.eth.Contract(
           MyContract.abi,
           MyContract.networks[networkId].address
       );
    
       const result = await Contract.methods
       .owner()
       .call();
     if(!result){
       res.send(error)
     }
     else{
       res.send({
         owner : result
       })
     }
   }
   exports.startLottery = async (req, res) => {
    const mnemonic = process.env.mnemonic;
  httpProvider = process.env.httpProvider
    const provider =  new HDWalletProvider(mnemonic, httpProvider)
       const web3 = new Web3(provider);
       const networkId = await web3.eth.net.getId();
    
    
       const Contract = new web3.eth.Contract(
           MyContract.abi,
           MyContract.networks[networkId].address
       );
      var acc = await web3.eth.getAccounts();

       const result = await Contract.methods
       .startLottery(req.body.ticket, req.body.price, req.body.uptodate)
       .send({ from: acc[0] });
          if(!result){
       res.send(error)
     }
     else{
       res.send(result)
     }
   
   }
   exports.status = async (req, res) => {
    const mnemonic = process.env.mnemonic;
  httpProvider = process.env.httpProvider
    const provider =  new HDWalletProvider(mnemonic, httpProvider)
       const web3 = new Web3(provider);
       const networkId = await web3.eth.net.getId();
    
    
       const Contract = new web3.eth.Contract(
           MyContract.abi,
           MyContract.networks[networkId].address
       );
       const result = await Contract.methods
       .status()
       .call();
    //     if(!result){
    //    res.send(error)
    //  }
    //  else{
       res.send(result)
    //  }
   
   }
   exports.drawWinner = async (req, res) => {
    const mnemonic = process.env.mnemonic;
  httpProvider = process.env.httpProvider
    const provider =  new HDWalletProvider(mnemonic, httpProvider)
       const web3 = new Web3(provider);
       const networkId = await web3.eth.net.getId();
    
    
       const Contract = new web3.eth.Contract(
           MyContract.abi,
           MyContract.networks[networkId].address
       );
      var acc = await web3.eth.getAccounts();

       const result = await Contract.methods
       .drawWinner()
       .call();
       console.log("drawwinner")
         if(!result){
       res.send(error)
     }
     else{
       res.send(result)
     }
   
   }
   exports.buyTicket = async (req, res) => {
    const mnemonic = process.env.mnemonic;
  httpProvider = process.env.httpProvider
    const provider =  new HDWalletProvider(mnemonic, httpProvider)
       const web3 = new Web3(provider);
       const networkId = await web3.eth.net.getId();
    
    
       const Contract = new web3.eth.Contract(
           MyContract.abi,
           MyContract.networks[networkId].address
       );
      var acc = await web3.eth.getAccounts();

       const result = await Contract.methods
       .buyTicket()
       .call();
         if(!result){
       res.send(error)
     }
     else{
       res.send(result)
     }
   
   }