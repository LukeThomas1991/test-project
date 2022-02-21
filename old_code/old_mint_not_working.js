(async () => {
    try {
        console.log('Running mint script...');

        const contractName = 'ERC721NFTCustom';
        const contract_address = '0x6660523163865fbdc10922161c08c4DDa107a37A';
        const artifactsPath = `browser/contracts/artifacts/${contractName}.json`;        


        const metadata = JSON.parse(
            await remix.call('fileManager', 'getFile', artifactsPath)
        );
        const accounts = await web3.eth.getAccounts();
        console.log('accounts => ', accounts);
        const contract = new web3.eth.Contract(
            metadata.abi,
            contract_address,
            {
                from: accounts[0]
            }
        );
        
        const mintToCallerResult = await contract.methods
            .mintToCaller(accounts[0], 135, 'ipfs://bafkreih7vdqjgmzrxir45th6ep7iuomk7g737yoktypqsmiwu2a7durgwm')
            .send({ from: accounts[0] });
        
        
        console.log('mintToCallerResult:', mintToCallerResult);
    } catch (e) {
        console.log(e.message);
    }
})();