const assert = require("assert");
const ganache = require("ganache-cli"); // serves as local eth test network
const Web3 = require("web3"); //constructor func
const web3 = new Web3(ganache.provider()); //instance of it
const { interface, bytecode } = require("../compile");

let accounts;
let inbox;

beforeEach(async () => {
  // Get a list of all accounts
  accounts = await web3.eth.getAccounts();

  //use one of those accounts to deploy the contract
  inbox = await new web3.eth.Contract(JSON.parse(interface))
    .deploy({ data: bytecode, arguments: ["Hi there!"] }) //it is an initial message which we describe earlier
    .send({ from: accounts[0], gas: "1000000" });
});

describe("Inbox", () => {
  it("deploys a contract", () => {
    console.log(inbox);
  });
});
