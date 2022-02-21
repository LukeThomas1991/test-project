const Tx = require('ethereumjs-tx').Transaction
var Common = require('ethereumjs-common').default;
const fs = require("fs");
const path = require("path");
const basePath = process.cwd();
const Web3 = require('web3')
const rpcURL = 'https://polygon-rpc.com/'
const web3 = new Web3(rpcURL)

const idToStartOn = 1
const idToFinishOn = 10000




const privateKey = '<PRIVATE KEY FROM METAMASK>'
const privateKeyBuffer = Buffer.from(privateKey, 'hex')

const userAddress = '<PUBLIC KEY FROM METAMASK>'
const contractdAddress = '<CONTRACT ADDRESS CREATED BY NFTPORT.xyz>'
const abi = [{ "inputs": [{ "internalType": "string", "name": "_name", "type": "string" }, { "internalType": "string", "name": "_symbol", "type": "string" }, { "internalType": "address", "name": "owner", "type": "address" }, { "internalType": "bool", "name": "_metadataUpdatable", "type": "bool" }, { "internalType": "bool", "name": "_tokensBurnable", "type": "bool" }, { "internalType": "bool", "name": "_tokensTransferable", "type": "bool" }, { "internalType": "string", "name": "_initBaseURI", "type": "string" }], "stateMutability": "nonpayable", "type": "constructor" }, { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "address", "name": "owner", "type": "address" }, { "indexed": true, "internalType": "address", "name": "approved", "type": "address" }, { "indexed": true, "internalType": "uint256", "name": "tokenId", "type": "uint256" }], "name": "Approval", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "address", "name": "owner", "type": "address" }, { "indexed": true, "internalType": "address", "name": "operator", "type": "address" }, { "indexed": false, "internalType": "bool", "name": "approved", "type": "bool" }], "name": "ApprovalForAll", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": false, "internalType": "string", "name": "_value", "type": "string" }, { "indexed": true, "internalType": "uint256", "name": "_id", "type": "uint256" }], "name": "PermanentURI", "type": "event" }, { "anonymous": false, "inputs": [], "name": "PermanentURIGlobal", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "bytes32", "name": "role", "type": "bytes32" }, { "indexed": true, "internalType": "bytes32", "name": "previousAdminRole", "type": "bytes32" }, { "indexed": true, "internalType": "bytes32", "name": "newAdminRole", "type": "bytes32" }], "name": "RoleAdminChanged", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "bytes32", "name": "role", "type": "bytes32" }, { "indexed": true, "internalType": "address", "name": "account", "type": "address" }, { "indexed": true, "internalType": "address", "name": "sender", "type": "address" }], "name": "RoleGranted", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "bytes32", "name": "role", "type": "bytes32" }, { "indexed": true, "internalType": "address", "name": "account", "type": "address" }, { "indexed": true, "internalType": "address", "name": "sender", "type": "address" }], "name": "RoleRevoked", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "address", "name": "from", "type": "address" }, { "indexed": true, "internalType": "address", "name": "to", "type": "address" }, { "indexed": true, "internalType": "uint256", "name": "tokenId", "type": "uint256" }], "name": "Transfer", "type": "event" }, { "inputs": [], "name": "DEFAULT_ADMIN_ROLE", "outputs": [{ "internalType": "bytes32", "name": "", "type": "bytes32" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "MINTER_ROLE", "outputs": [{ "internalType": "bytes32", "name": "", "type": "bytes32" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "to", "type": "address" }, { "internalType": "uint256", "name": "tokenId", "type": "uint256" }], "name": "approve", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "owner", "type": "address" }], "name": "balanceOf", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "baseURI", "outputs": [{ "internalType": "string", "name": "", "type": "string" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "uint256", "name": "_tokenId", "type": "uint256" }], "name": "burn", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "name": "freezeTokenUris", "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "uint256", "name": "tokenId", "type": "uint256" }], "name": "getApproved", "outputs": [{ "internalType": "address", "name": "", "type": "address" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "bytes32", "name": "role", "type": "bytes32" }], "name": "getRoleAdmin", "outputs": [{ "internalType": "bytes32", "name": "", "type": "bytes32" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "bytes32", "name": "role", "type": "bytes32" }, { "internalType": "address", "name": "account", "type": "address" }], "name": "grantRole", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "bytes32", "name": "role", "type": "bytes32" }, { "internalType": "address", "name": "account", "type": "address" }], "name": "hasRole", "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "owner", "type": "address" }, { "internalType": "address", "name": "operator", "type": "address" }], "name": "isApprovedForAll", "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "metadataUpdatable", "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "caller", "type": "address" }, { "internalType": "uint256", "name": "tokenId", "type": "uint256" }, { "internalType": "string", "name": "tokenURI", "type": "string" }], "name": "mintToCaller", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [], "name": "name", "outputs": [{ "internalType": "string", "name": "", "type": "string" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "owner", "outputs": [{ "internalType": "address", "name": "", "type": "address" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "uint256", "name": "tokenId", "type": "uint256" }], "name": "ownerOf", "outputs": [{ "internalType": "address", "name": "", "type": "address" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "bytes32", "name": "role", "type": "bytes32" }, { "internalType": "address", "name": "account", "type": "address" }], "name": "renounceRole", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "bytes32", "name": "role", "type": "bytes32" }, { "internalType": "address", "name": "account", "type": "address" }], "name": "revokeRole", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "from", "type": "address" }, { "internalType": "address", "name": "to", "type": "address" }, { "internalType": "uint256", "name": "tokenId", "type": "uint256" }], "name": "safeTransferFrom", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "from", "type": "address" }, { "internalType": "address", "name": "to", "type": "address" }, { "internalType": "uint256", "name": "tokenId", "type": "uint256" }, { "internalType": "bytes", "name": "_data", "type": "bytes" }], "name": "safeTransferFrom", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "operator", "type": "address" }, { "internalType": "bool", "name": "approved", "type": "bool" }], "name": "setApprovalForAll", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "bytes4", "name": "interfaceId", "type": "bytes4" }], "name": "supportsInterface", "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "symbol", "outputs": [{ "internalType": "string", "name": "", "type": "string" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "uint256", "name": "index", "type": "uint256" }], "name": "tokenByIndex", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "owner", "type": "address" }, { "internalType": "uint256", "name": "index", "type": "uint256" }], "name": "tokenOfOwnerByIndex", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "uint256", "name": "tokenId", "type": "uint256" }], "name": "tokenURI", "outputs": [{ "internalType": "string", "name": "", "type": "string" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "tokensBurnable", "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "tokensTransferable", "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "totalSupply", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "_to", "type": "address" }, { "internalType": "uint256", "name": "_tokenId", "type": "uint256" }], "name": "transferByOwner", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "from", "type": "address" }, { "internalType": "address", "name": "to", "type": "address" }, { "internalType": "uint256", "name": "tokenId", "type": "uint256" }], "name": "transferFrom", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "string", "name": "_newBaseURI", "type": "string" }, { "internalType": "bool", "name": "_tokensTransferable", "type": "bool" }, { "internalType": "bool", "name": "_freezeUpdates", "type": "bool" }], "name": "update", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "uint256", "name": "_tokenId", "type": "uint256" }, { "internalType": "string", "name": "_tokenUri", "type": "string" }, { "internalType": "bool", "name": "_isFreezeTokenUri", "type": "bool" }], "name": "updateTokenUri", "outputs": [], "stateMutability": "nonpayable", "type": "function" }]



web3.eth.getBalance(userAddress, (err, wei) => {
    balance = web3.utils.fromWei(wei, 'ether')
    console.info('user balance ', balance)
})

const delay = ms => new Promise(res => setTimeout(res, ms));
const contract = new web3.eth.Contract(abi, contractdAddress)

const commonMatic = Common.forCustomChain(
    'mainnet',
    {
        name: 'matic-mainnet',
        networkId: 137,
        chainId: 137,
        url: 'https://rpc-mainnet.maticvigil.com/'
    },
    'petersburg'
)

contract.methods.totalSupply().call((err, result) => { console.log('total supply ', result) })
contract.methods.name().call((err, result) => { console.log('name ', result) })
contract.methods.symbol().call((err, result) => { console.log('symbol ', result) })
contract.methods.balanceOf(userAddress).call((err, result) => { console.log('balance of ', result) })


async function main() {
    if (!fs.existsSync(path.join(`${basePath}`, "error"))) {
        fs.mkdirSync(path.join(`${basePath}`, "error"));
    }


    const ipfsMetas = JSON.parse(
        fs.readFileSync(`${basePath}/_ipfsMetas.json`)
    );

    let txCount = -1

    for (const meta of ipfsMetas) {

        let index = meta.custom_fields.edition
        let metadata_uri = meta.metadata_uri
        if (index < idToStartOn) {
            continue
        } else if (index > idToFinishOn) {
            break
        }
        console.log('Starting ', index)
        try {
            let gasPrice = await web3.eth.getGasPrice()

            // I've seen the transaction count (nonce) decrement. So call this function and wait until
            // the transaction count is greated than the previous. Retry 10 times, use existing number if retry limit exceeded.
            let previousTxCount = txCount
            txCount = await web3.eth.getTransactionCount(userAddress)
            let retryCounter = 0
            while (previousTxCount >= txCount) {
                if(previousTxCount == txCount) {
                    retryCounter = retryCounter + 1
                    if(retryCounter == 10) {
                        break
                    }
                }
                console.info('txCount:', txCount, 'previousTxCount: ', previousTxCount)
                await delay(5000);
                txCount = await web3.eth.getTransactionCount(userAddress)
            }

            console.log('gas => ', gasPrice, 'txCount => ', txCount, 'index => ', index, 'metadata_uri ', metadata_uri)

            let txObject = {
                nonce: web3.utils.toHex(txCount),
                gas: web3.utils.toHex(359845),
                gasPrice: web3.utils.toHex(gasPrice),
                maxFeePerGas: web3.utils.toHex(gasPrice),
                maxPriorityFeePerGas: web3.utils.toHex(gasPrice),
                from: web3.utils.toHex(userAddress),
                to: web3.utils.toHex(contractdAddress),
                data: contract.methods.mintToCaller(userAddress, index, metadata_uri).encodeABI(),
                chainId: web3.utils.toHex(137),
                type: 2
            }

            let tx = new Tx(txObject, { common: commonMatic })
            tx.sign(privateKeyBuffer)

            let serializedTx = tx.serialize()
            let raw = '0x' + serializedTx.toString('hex')


            let transactionResult = await web3.eth.sendSignedTransaction(raw)
            let txHash = transactionResult.transactionHash



            let totalSupply = await contract.methods.totalSupply().call()
            console.log('txHash ', txHash, 'total supply ', totalSupply)

            // Get the transaction that was created and wait for it to be completed before continuing to next id.
            let transaction = await web3.eth.getTransactionReceipt(txHash)
            while (transaction == null) {
                console.info('transaction refresh')
                await delay(5000);
                transaction = await web3.eth.getTransactionReceipt(txHash)
            }


            // Get my balance and stop for loop if I have under 1 Matic remaining.
            let wei = await web3.eth.getBalance(userAddress)
            balance = web3.utils.fromWei(wei, 'ether')
            console.info('user balance ', balance)
            balanceFloat = parseFloat(balance)
            if(balanceFloat < 1) {
                break
            }
        } catch (error) {
            // Catch any errors and create file in /error directory so I can rerun later, carry on with for loop.
            console.error(error);
            let errorData = {
                id: index,
                metadata_uri: metadata_uri,
                error, error
            }
            fs.writeFileSync(path.join(`${basePath}`, "error\\" + index + ".json"), JSON.stringify(errorData, null, 2));
        }
    }
    console.info('Finished For Loop')
}

main()