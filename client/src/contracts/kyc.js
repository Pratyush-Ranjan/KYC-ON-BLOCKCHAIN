//import web3 from '../web333';
import Web3 from 'web3';
const web3=new Web3(window.web3.currentProvider);
const address='0xA4D193235aCaC374F8512486c8A569F6856A22e0';
//console.log("web3kyc"+web3.eth.getAccounts());

const abi= [
	{
		"constant": false,
		"inputs": [
			{
				"name": "newBank",
				"type": "address"
			}
		],
		"name": "addBank",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"name": "askingBank",
				"type": "address"
			},
			{
				"indexed": false,
				"name": "customerAddress",
				"type": "address"
			},
			{
				"indexed": false,
				"name": "originalBank",
				"type": "address"
			}
		],
		"name": "AskDocument",
		"type": "event"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "customerAddress",
				"type": "address"
			}
		],
		"name": "consentConfirmation",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "bankAddress",
				"type": "address"
			}
		],
		"name": "consentInitiation",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "receiverBank",
				"type": "address"
			},
			{
				"name": "customerAddress",
				"type": "address"
			},
			{
				"name": "keyhash",
				"type": "string"
			}
		],
		"name": "GiveRecord",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "customerAddress",
				"type": "address"
			},
			{
				"name": "keyhash",
				"type": "string"
			},
			{
				"name": "documentType",
				"type": "string"
			},
			{
				"name": "documentAddresshash",
				"type": "string"
			}
		],
		"name": "recordData",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "originalBank",
				"type": "address"
			},
			{
				"name": "customerAddress",
				"type": "address"
			}
		],
		"name": "requestTransfer",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "bankAddress",
				"type": "address"
			}
		],
		"name": "revokeConsent",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "constructor"
	}
];

export default new web3.eth.Contract(abi,address);