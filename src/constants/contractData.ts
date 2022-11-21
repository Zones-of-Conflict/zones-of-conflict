const GAMEMASTER_ABI = [
	{
		"inputs": [],
		"name": "createMatch",
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
				"name": "_matchId",
				"type": "uint256"
			}
		],
		"name": "joinMatch",
		"outputs": [
			{
				"components": [
					{
						"internalType": "uint256",
						"name": "id",
						"type": "uint256"
					},
					{
						"components": [
							{
								"internalType": "address",
								"name": "owner",
								"type": "address"
							},
							{
								"internalType": "enum GameElements.Rank",
								"name": "rank",
								"type": "uint8"
							},
							{
								"internalType": "uint256[3]",
								"name": "unitIds",
								"type": "uint256[3]"
							},
							{
								"internalType": "uint256",
								"name": "matchId",
								"type": "uint256"
							}
						],
						"internalType": "struct GameElements.Player",
						"name": "playerA",
						"type": "tuple"
					},
					{
						"components": [
							{
								"internalType": "address",
								"name": "owner",
								"type": "address"
							},
							{
								"internalType": "enum GameElements.Rank",
								"name": "rank",
								"type": "uint8"
							},
							{
								"internalType": "uint256[3]",
								"name": "unitIds",
								"type": "uint256[3]"
							},
							{
								"internalType": "uint256",
								"name": "matchId",
								"type": "uint256"
							}
						],
						"internalType": "struct GameElements.Player",
						"name": "playerB",
						"type": "tuple"
					},
					{
						"internalType": "enum GameElements.GameStatus",
						"name": "status",
						"type": "uint8"
					},
					{
						"internalType": "uint256",
						"name": "winner",
						"type": "uint256"
					}
				],
				"internalType": "struct GameElements.Match",
				"name": "",
				"type": "tuple"
			}
		],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_matchId",
				"type": "uint256"
			}
		],
		"name": "renderStep",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "matchId",
				"type": "uint256"
			}
		],
		"name": "RenderStep",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "matchId",
				"type": "uint256"
			}
		],
		"name": "SetTarget",
		"type": "event"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_unitId",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "_targetX",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "_targetY",
				"type": "uint256"
			}
		],
		"name": "setUnitTarget",
		"outputs": [],
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
		"name": "addressToPlayer",
		"outputs": [
			{
				"internalType": "address",
				"name": "owner",
				"type": "address"
			},
			{
				"internalType": "enum GameElements.Rank",
				"name": "rank",
				"type": "uint8"
			},
			{
				"internalType": "uint256",
				"name": "matchId",
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
				"name": "_matchId",
				"type": "uint256"
			}
		],
		"name": "getMatchUnits",
		"outputs": [
			{
				"components": [
					{
						"internalType": "uint256",
						"name": "id",
						"type": "uint256"
					},
					{
						"internalType": "address",
						"name": "owner",
						"type": "address"
					},
					{
						"internalType": "enum GameElements.UnitTypes",
						"name": "unitType",
						"type": "uint8"
					},
					{
						"internalType": "enum GameElements.Action",
						"name": "action",
						"type": "uint8"
					},
					{
						"internalType": "uint256",
						"name": "hp",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "attack",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "armor",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "currentX",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "currentY",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "targetX",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "targetY",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "matchId",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "enemyId",
						"type": "uint256"
					}
				],
				"internalType": "struct GameElements.Unit[6]",
				"name": "",
				"type": "tuple[6]"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_playerAddress",
				"type": "address"
			}
		],
		"name": "getPlayerUnits",
		"outputs": [
			{
				"components": [
					{
						"internalType": "uint256",
						"name": "id",
						"type": "uint256"
					},
					{
						"internalType": "address",
						"name": "owner",
						"type": "address"
					},
					{
						"internalType": "enum GameElements.UnitTypes",
						"name": "unitType",
						"type": "uint8"
					},
					{
						"internalType": "enum GameElements.Action",
						"name": "action",
						"type": "uint8"
					},
					{
						"internalType": "uint256",
						"name": "hp",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "attack",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "armor",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "currentX",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "currentY",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "targetX",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "targetY",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "matchId",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "enemyId",
						"type": "uint256"
					}
				],
				"internalType": "struct GameElements.Unit[3]",
				"name": "",
				"type": "tuple[3]"
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
		"name": "matchIdToMatch",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "id",
				"type": "uint256"
			},
			{
				"components": [
					{
						"internalType": "address",
						"name": "owner",
						"type": "address"
					},
					{
						"internalType": "enum GameElements.Rank",
						"name": "rank",
						"type": "uint8"
					},
					{
						"internalType": "uint256[3]",
						"name": "unitIds",
						"type": "uint256[3]"
					},
					{
						"internalType": "uint256",
						"name": "matchId",
						"type": "uint256"
					}
				],
				"internalType": "struct GameElements.Player",
				"name": "playerA",
				"type": "tuple"
			},
			{
				"components": [
					{
						"internalType": "address",
						"name": "owner",
						"type": "address"
					},
					{
						"internalType": "enum GameElements.Rank",
						"name": "rank",
						"type": "uint8"
					},
					{
						"internalType": "uint256[3]",
						"name": "unitIds",
						"type": "uint256[3]"
					},
					{
						"internalType": "uint256",
						"name": "matchId",
						"type": "uint256"
					}
				],
				"internalType": "struct GameElements.Player",
				"name": "playerB",
				"type": "tuple"
			},
			{
				"internalType": "enum GameElements.GameStatus",
				"name": "status",
				"type": "uint8"
			},
			{
				"internalType": "uint256",
				"name": "winner",
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
		"name": "unitIdToUnit",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "id",
				"type": "uint256"
			},
			{
				"internalType": "address",
				"name": "owner",
				"type": "address"
			},
			{
				"internalType": "enum GameElements.UnitTypes",
				"name": "unitType",
				"type": "uint8"
			},
			{
				"internalType": "enum GameElements.Action",
				"name": "action",
				"type": "uint8"
			},
			{
				"internalType": "uint256",
				"name": "hp",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "attack",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "armor",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "currentX",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "currentY",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "targetX",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "targetY",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "matchId",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "enemyId",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	}
]

export type Contract = { address: string; abi: any; chainId: number };

export const GAMEMASTER_DATA = {
  testnetAddress: "0x570538c497b1e35a7B398f87e5f5bfe345E68C13",

  abi: GAMEMASTER_ABI,
};
