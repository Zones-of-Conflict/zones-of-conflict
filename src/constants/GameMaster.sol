// SPDX-License-Identifier: GPL-3.0

pragma solidity 0.8.17;

contract GameElements {
    enum GameStatus {
        INACTIVE,
        QUEUED,
        ACTIVE,
        ENDED
    }

    enum UnitTypes {
        INFANTRY,
        TANK,
        DRONE
    }

    enum Rank {
        NONE,
        SERGEANT,
        LIEUTENANT,
        CAPTAIN
    }

    enum Action {
        IDLE,
        MOVING,
        BATTLING,
        DEAD
    }

    struct Match {
        uint256 id;
        Player playerA;
        Player playerB;
        GameStatus status;
        uint256 winner;
    }

    struct Unit {
        uint256 id;
        address owner;
        UnitTypes unitType;
        Action action;
        uint256 hp;
        uint256 attack;
        uint256 armor;
        uint256 currentX;
        uint256 currentY;
        uint256 targetX;
        uint256 targetY;
        uint256 matchId;
        uint256 enemyId;
    }

    struct Player {
        address owner;
        Rank rank;
        uint256[3] unitIds;
        uint256 matchId;
    }
}

contract GameMaster is GameElements {
    //  zero reserved
    uint256 internal matchCount = 1;
    uint256 internal unitGlobalId = 1;

    mapping(address => Player) public addressToPlayer;
    mapping(uint256 => Unit) public unitIdToUnit;
    mapping(uint256 => Match) public matchIdToMatch;

    ///////////////////////////////////////////////////////////////////////////////
    //////////////////////////////  Api Functions    //////////////////////////////
    ///////////////////////////////////////////////////////////////////////////////
    function getPlayerUnits(address _playerAddress)
        public
        view
        returns (Unit[3] memory)
    {
        Unit[3] memory playerUnits;
        //get Units from players unitIds
        for (uint256 i = 0; i < 3; i++) {
            playerUnits[i] = unitIdToUnit[
                addressToPlayer[_playerAddress].unitIds[i]
            ];
        }

        return playerUnits;
    }

    function getMatchUnits(uint256 _matchId)
        public
        view
        returns (Unit[6] memory)
    {
        require(
            matchIdToMatch[_matchId].status != GameStatus.INACTIVE,
            "Invalid MatchId"
        );

        Match memory matchPointer = matchIdToMatch[_matchId];
        address addressA = matchPointer.playerA.owner;
        address addressB = matchPointer.playerB.owner;

        Unit[6] memory matchUnits;
        for (uint256 i = 0; i < 6; i++) {
            if (i < 3) {
                matchUnits[i] = unitIdToUnit[
                    addressToPlayer[addressA].unitIds[i]
                ];
            } else {
                matchUnits[i] = unitIdToUnit[
                    addressToPlayer[addressB].unitIds[i - 3]
                ];
            }
        }

        return matchUnits;
    }

    ///////////////////////////////////////////////////////////////////////////////
    ///////////////////////////      Init Functions   /////////////////////////////
    ///////////////////////////////////////////////////////////////////////////////
    function initPlayer() private returns (Player memory) {
        require(
            addressToPlayer[msg.sender].owner != msg.sender,
            "Player already initialized."
        );

        uint256[3] memory newUnitIds;

        Unit memory newUnitInfantry = Unit(
            unitGlobalId,
            msg.sender,
            UnitTypes.INFANTRY,
            Action.IDLE,
            20,
            1,
            0,
            0,
            2,
            0,
            2,
            0,
            0
        );
        unitIdToUnit[unitGlobalId] = newUnitInfantry;
        newUnitIds[0] = unitGlobalId;
        unitGlobalId++;

        Unit memory newUnitTank = Unit(
            unitGlobalId,
            msg.sender,
            UnitTypes.TANK,
            Action.IDLE,
            25,
            2,
            0,
            0,
            5,
            0,
            5,
            0,
            0
        );
        unitIdToUnit[unitGlobalId] = newUnitTank;
        newUnitIds[1] = unitGlobalId;
        unitGlobalId++;

        Unit memory newUnitDrone = Unit(
            unitGlobalId,
            msg.sender,
            UnitTypes.DRONE,
            Action.IDLE,
            15,
            3,
            0,
            0,
            8,
            0,
            8,
            0,
            0
        );
        unitIdToUnit[unitGlobalId] = newUnitDrone;
        newUnitIds[2] = unitGlobalId;
        unitGlobalId++;

        Player memory newPlayer = Player(
            msg.sender,
            Rank.SERGEANT,
            newUnitIds,
            0
        );

        addressToPlayer[msg.sender] = newPlayer;

        return addressToPlayer[msg.sender];
    }

    function createMatch() public returns (uint256) {
        // check whteher player who is starting the game has a player or
        if (addressToPlayer[msg.sender].rank == Rank.NONE) {
            // if not initialize the player
            initPlayer();
        }
        // get match id and increase the id
        Match memory newMatch;
        newMatch.id = matchCount;
        newMatch.status = GameStatus.QUEUED;
        newMatch.playerA = addressToPlayer[msg.sender];
        addressToPlayer[msg.sender].matchId = matchCount;

        matchIdToMatch[matchCount] = newMatch;

        matchCount++;
        return newMatch.id;
    }

    function joinMatch(uint256 _matchId) public returns (Match memory) {
        require(
            matchIdToMatch[_matchId].status == GameStatus.QUEUED,
            "Invalid MatchId"
        );
        require(
            matchIdToMatch[_matchId].playerA.owner != msg.sender,
            "You can't battle yourself."
        );

        if (addressToPlayer[msg.sender].rank == Rank.NONE) {
            // the player trying to join the game must have a player sttruct mapping
            initPlayer();
        }
        matchIdToMatch[_matchId].playerB = addressToPlayer[msg.sender];
        matchIdToMatch[_matchId].status = GameStatus.ACTIVE;

        return matchIdToMatch[_matchId];
    }

    ///////////////////////////////////////////////////////////////////////////////
    ///////////////////////////////////////////////////////////////////////////////
    /// GameOPs Functions
    /////////////////////////////////    //////////////////////////////////////////////
    ///////////////////////////////////////////////////////////////////////////////

    function setUnitTarget(
        uint256 _unitId,
        uint256 _targetX,
        uint256 _targetY
    ) public {
        require(
            unitIdToUnit[_unitId].owner == msg.sender,
            "You don't own this unit"
        );
        require(_targetX < 10 && _targetY < 10, "Grid is 10 x 10");
        require(
            !(_targetX == unitIdToUnit[_unitId].currentX &&
                _targetY == unitIdToUnit[_unitId].currentY),
            "Unit already in that position."
        );
        unitIdToUnit[_unitId].targetX = _targetX;
        unitIdToUnit[_unitId].targetY = _targetY;

        unitIdToUnit[_unitId].action = Action.MOVING;
    }

    function renderStep(uint256 _matchId) public {
        require(
            matchIdToMatch[_matchId].status == GameStatus.ACTIVE,
            "Game not Active"
        );
        Unit[6] memory matchUnits = getMatchUnits(_matchId);

        //loop through each unit for movement if moving, advance 1 grid space
        for (uint256 i = 0; i < 6; i++) {
            if (matchUnits[i].action == Action.DEAD) continue;

            if (matchUnits[i].action == Action.MOVING) {
                //if x target is not reached advance one grid space closer to it
                if (matchUnits[i].currentX != matchUnits[i].targetX) {
                    if (matchUnits[i].currentX < matchUnits[i].targetX) {
                        matchUnits[i].currentX++;
                    } else {
                        matchUnits[i].currentX--;
                    }
                    //if x target is reached check for y
                } else if (matchUnits[i].currentY < matchUnits[i].targetY) {
                    matchUnits[i].currentY++;
                } else {
                    matchUnits[i].currentY--;
                }

                //if unit has reached target set action to idle
                if (
                    matchUnits[i].currentX == matchUnits[i].targetX &&
                    matchUnits[i].currentY == matchUnits[i].targetY
                ) {
                    matchUnits[i].action = Action.IDLE;
                }
            }
            //check if there are any intersections, if so set to battling
            for (uint256 j = 0; j < 6; j++) {
                if (j == i) continue;
                if (matchUnits[j].action == Action.DEAD) continue;

                if (
                    matchUnits[i].currentX == matchUnits[j].currentX &&
                    matchUnits[i].currentY == matchUnits[j].currentY
                ) {
                    matchUnits[i].action = Action.BATTLING;
                    matchUnits[j].action = Action.BATTLING;
                }

                //if battling, random chance to hit Unit.enemy
                if (matchUnits[i].action == Action.BATTLING) {
                    if (matchUnits[i].unitType == UnitTypes.INFANTRY) {
                        if (matchUnits[j].unitType == UnitTypes.INFANTRY) {
                            if (random(1) % 2 == 0) {
                                matchUnits[j].hp -= matchUnits[i].attack;
                            }
                        } else if (matchUnits[j].unitType == UnitTypes.TANK) {
                            if (random(5) % 2 == 0) {
                                matchUnits[j].hp -= matchUnits[i].attack;
                            }
                        } else if (matchUnits[j].unitType == UnitTypes.DRONE) {
                            if (random(3) % 2 == 0) {
                                matchUnits[j].hp -= matchUnits[i].attack;
                            }
                        }
                    } else if (matchUnits[i].unitType == UnitTypes.TANK) {
                        if (matchUnits[j].unitType == UnitTypes.INFANTRY) {
                            if (random(2) % 2 == 0) {
                                matchUnits[j].hp -= matchUnits[i].attack;
                            }
                        } else if (matchUnits[j].unitType == UnitTypes.TANK) {
                            if (random(6) % 2 == 0) {
                                matchUnits[j].hp -= matchUnits[i].attack;
                            }
                        } else if (matchUnits[j].unitType == UnitTypes.DRONE) {
                            if (random(7) % 2 == 0) {
                                matchUnits[j].hp -= matchUnits[i].attack;
                            }
                        }
                    } else if (matchUnits[i].unitType == UnitTypes.DRONE) {
                        if (matchUnits[j].unitType == UnitTypes.INFANTRY) {
                            if (random(3) % 2 == 0) {
                                matchUnits[j].hp -= matchUnits[i].attack;
                            }
                        } else if (matchUnits[j].unitType == UnitTypes.TANK) {
                            if (random(1) % 2 == 0) {
                                matchUnits[j].hp -= matchUnits[i].attack;
                            }
                        } else if (matchUnits[j].unitType == UnitTypes.DRONE) {
                            if (random(4) % 2 == 0) {
                                matchUnits[j].hp -= matchUnits[i].attack;
                            }
                        }
                    }
                }

                //if unit health is 10 or less (to avoid uint error) set action to dead
                if (matchUnits[i].hp <= 10) {
                    matchUnits[i].action = Action.DEAD;
                }

                if (matchUnits[j].hp <= 10) {
                    matchUnits[j].action = Action.DEAD;
                }
            }
        }

        //check if all units are dead, if so set match status to ended
        bool allDead = true;
        for (uint256 i = 0; i < 6; i++) {
            if (matchUnits[i].action != Action.DEAD) {
                allDead = false;
            }
        }

        if (allDead) {
            matchIdToMatch[_matchId].status = GameStatus.ENDED;
        }

        //overwrite the units in the match with updated Units
        for (uint256 i = 0; i < 6; i++) {
            unitIdToUnit[matchUnits[i].id] = matchUnits[i];
        }
    }

    function random(uint256 _randomInt) private view returns (uint256) {
        return
            uint256(
                keccak256(
                    abi.encodePacked(
                        block.difficulty,
                        block.timestamp,
                        _randomInt
                    )
                )
            );
    }
}
