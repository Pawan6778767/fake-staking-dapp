let web3;
let userAccount;
let contractAddress = "0xYOUR_FAKE_CONTRACT_ADDRESS"; // Change this
let tokenAddress = "0xTESTNET_TOKEN_ADDRESS"; // Change this

async function connectWallet() {
    if (window.ethereum) {
        web3 = new Web3(window.ethereum);
        await window.ethereum.request({ method: 'eth_requestAccounts' });
        let accounts = await web3.eth.getAccounts();
        userAccount = accounts[0];
        alert("Wallet connected: " + userAccount);
    } else {
        alert("Please install MetaMask.");
    }
}

async function stakeTokens() {
    let amount = document.getElementById("stakeAmount").value;
    let contract = new web3.eth.Contract([
        {
            "constant": false,
            "inputs": [{"name": "amount", "type": "uint256"}],
            "name": "stakeTokens",
            "outputs": [],
            "payable": false,
            "stateMutability": "nonpayable",
            "type": "function"
        }
    ], contractAddress);

    await contract.methods.stakeTokens(amount).send({ from: userAccount });
    alert("Tokens Staked! (But actually stolen...)");
}

document.getElementById("connect").addEventListener("click", connectWallet);
document.getElementById("stake").addEventListener("click", stakeTokens);