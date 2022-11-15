const GAMEMASTER_ABI = [
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_owner",
				"type": "address"
			},
			{
				"internalType": "enum GameElements.Rank",
				"name": "_rank",
				"type": "uint8"
			},
			{
				"internalType": "uint256",
				"name": "_unitGlobalId",
				"type": "uint256"
			}
		],
		"name": "createNewPlayer",
		"outputs": [
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
						"internalType": "uint256",
						"name": "unitCount",
						"type": "uint256"
					},
					{
						"internalType": "uint256[]",
						"name": "ownedUnitId",
						"type": "uint256[]"
					}
				],
				"internalType": "struct GameMaster.Player",
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
				"name": "_uniqueGlobalId",
				"type": "uint256"
			},
			{
				"internalType": "address",
				"name": "_owner",
				"type": "address"
			},
			{
				"internalType": "enum GameElements.UnitTypes",
				"name": "_unitType",
				"type": "uint8"
			},
			{
				"internalType": "enum GameElements.ActionState",
				"name": "_currentAction",
				"type": "uint8"
			},
			{
				"internalType": "uint256",
				"name": "_hp",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "_attack",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "_armor",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "_count",
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
		"name": "createNewUnit",
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
						"internalType": "enum GameElements.ActionState",
						"name": "currentAction",
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
						"name": "count",
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
					}
				],
				"internalType": "struct GameMaster.Unit",
				"name": "newUnit",
				"type": "tuple"
			}
		],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "infantryFactory",
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
						"internalType": "enum GameElements.ActionState",
						"name": "currentAction",
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
						"name": "count",
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
					}
				],
				"internalType": "struct GameMaster.Unit",
				"name": "aInfantry",
				"type": "tuple"
			}
		],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "initPlayer",
		"outputs": [
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
						"internalType": "uint256",
						"name": "unitCount",
						"type": "uint256"
					},
					{
						"internalType": "uint256[]",
						"name": "ownedUnitId",
						"type": "uint256[]"
					}
				],
				"internalType": "struct GameMaster.Player",
				"name": "newPlayer",
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
				"name": "matchId",
				"type": "uint256"
			}
		],
		"name": "joinGame",
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
								"internalType": "uint256",
								"name": "unitCount",
								"type": "uint256"
							},
							{
								"internalType": "uint256[]",
								"name": "ownedUnitId",
								"type": "uint256[]"
							}
						],
						"internalType": "struct GameMaster.Player",
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
								"internalType": "uint256",
								"name": "unitCount",
								"type": "uint256"
							},
							{
								"internalType": "uint256[]",
								"name": "ownedUnitId",
								"type": "uint256[]"
							}
						],
						"internalType": "struct GameMaster.Player",
						"name": "playerB",
						"type": "tuple"
					},
					{
						"internalType": "enum GameElements.GameStatus",
						"name": "status",
						"type": "uint8"
					},
					{
						"internalType": "uint256[11][11]",
						"name": "gameGrid",
						"type": "uint256[11][11]"
					},
					{
						"internalType": "uint256",
						"name": "winner",
						"type": "uint256"
					},
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
								"internalType": "enum GameElements.ActionState",
								"name": "currentAction",
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
								"name": "count",
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
							}
						],
						"internalType": "struct GameMaster.Unit[]",
						"name": "units",
						"type": "tuple[]"
					}
				],
				"internalType": "struct GameMaster.Match",
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
				"internalType": "enum GameElements.UnitTypes",
				"name": "_unitType",
				"type": "uint8"
			},
			{
				"internalType": "uint256",
				"name": "_hp",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "_attack",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "_armor",
				"type": "uint256"
			}
		],
		"name": "mintNewUnit",
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
						"internalType": "enum GameElements.ActionState",
						"name": "currentAction",
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
						"name": "count",
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
					}
				],
				"internalType": "struct GameMaster.Unit",
				"name": "newUnit",
				"type": "tuple"
			}
		],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "newGame",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "matchId",
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
				"name": "matchId",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "new_x",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "new_y",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "senderUnitsGlobalId",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "old_x",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "old_y",
				"type": "uint256"
			}
		],
		"name": "placeUnits",
		"outputs": [
			{
				"internalType": "uint256[11][11]",
				"name": "grid",
				"type": "uint256[11][11]"
			}
		],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "uint256[]",
				"name": "a",
				"type": "uint256[]"
			}
		],
		"name": "print_array",
		"type": "event"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "matchId",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "playerAPositionX",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "playerAPositionY",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "playerBPositionX",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "playerBPositionY",
				"type": "uint256"
			}
		],
		"name": "resolveBattle",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "sixValues",
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
						"internalType": "enum GameElements.ActionState",
						"name": "currentAction",
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
						"name": "count",
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
					}
				],
				"internalType": "struct GameMaster.Unit[]",
				"name": "",
				"type": "tuple[]"
			}
		],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "tankFactory",
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
						"internalType": "enum GameElements.ActionState",
						"name": "currentAction",
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
						"name": "count",
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
					}
				],
				"internalType": "struct GameMaster.Unit",
				"name": "aTank",
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
						"internalType": "uint256",
						"name": "unitCount",
						"type": "uint256"
					},
					{
						"internalType": "uint256[]",
						"name": "ownedUnitId",
						"type": "uint256[]"
					}
				],
				"internalType": "struct GameMaster.Player",
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
						"internalType": "uint256",
						"name": "unitCount",
						"type": "uint256"
					},
					{
						"internalType": "uint256[]",
						"name": "ownedUnitId",
						"type": "uint256[]"
					}
				],
				"internalType": "struct GameMaster.Player",
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
				"name": "unitId",
				"type": "uint256"
			}
		],
		"name": "getUnitWeight",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "testUnit",
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
				"internalType": "enum GameElements.ActionState",
				"name": "currentAction",
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
				"name": "count",
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
			}
		],
		"stateMutability": "view",
		"type": "function"
	}
]

export type Contract = { address: string; abi: any; chainId: number };

export const GAMEMASTER_DATA = {
  testnetAddress: "0x7ecf20A28b2DFf9CaE85c060e9632ae5aF877209",

  abi: GAMEMASTER_ABI,
};
