const GAMEMASTER_ABI = [
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "matchId",
				"type": "uint256"
			}
		],
		"name": "joinMatch",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "matchFactory",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "unitOneId",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "unitTwoId",
				"type": "uint256"
			}
		],
		"name": "resolveBattle",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"name": "addressToAccount",
		"outputs": [
			{
				"internalType": "address",
				"name": "owner",
				"type": "address"
			},
			{
				"internalType": "enum GameMaster.Rank",
				"name": "rank",
				"type": "uint8"
			},
			{
				"internalType": "uint256",
				"name": "experience",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "gameIdToMatch",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "id",
				"type": "uint256"
			},
			{
				"internalType": "address",
				"name": "playerA",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "playerB",
				"type": "address"
			},
			{
				"internalType": "enum GameMaster.GameState",
				"name": "state",
				"type": "uint8"
			}
		],
		"stateMutability": "view",
		"type": "function"
	}
]

export type Contract = { address: string; abi: any; chainId: number };

export const GAMEMASTER_DATA = {
	testnetAddress: "0xE3438D6A71f6387e2b4Ef0D2d68a9420aeAbA970",
	
	abi: GAMEMASTER_ABI,
}
