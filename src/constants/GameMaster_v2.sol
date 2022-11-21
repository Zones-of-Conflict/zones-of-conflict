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
    uint256 internal randomNonce = 1;

    mapping(address => Player) public addressToPlayer;
    mapping(uint256 => Unit) public unitIdToUnit;
    mapping(uint256 => Match) public matchIdToMatch;

    ///////////////////////////////////////////////////////////////////////////////
    //////////////////////////////  Api Functions    //////////////////////////////
    ///////////////////////////////////////////////////////////////////////////////

    event RenderStep(uint256 matchId);
    event SetTarget(uint256 matchId);

    function getPlayerUnits(address _playerAddress)
        public
        view
        returns (Unit[3] memory)
    {
        Unit[3] memory playerUnits;
        //get Units from players unitIds
        for (uint i = 0; i < 3; i++) {
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
        for (uint i = 0; i < 6; i++) {
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
        require(addressToPlayer[msg.sender].matchId == 0, "Already in a match");
        // get match id and increase the id
        Match memory newMatch;
        newMatch.id = matchCount;
        newMatch.status = GameStatus.QUEUED;
        newMatch.playerA = addressToPlayer[msg.sender];
        addressToPlayer[msg.sender].matchId = matchCount;

        matchIdToMatch[matchCount] = newMatch;
        addressToPlayer[msg.sender].matchId = matchCount;

        // set alll of playerA units currentX to 0 and Current Y random number 0-9
        for (uint i = 0; i < 3; i++) {
            unitIdToUnit[addressToPlayer[msg.sender].unitIds[i]].currentX = 0;
            unitIdToUnit[addressToPlayer[msg.sender].unitIds[i]].currentY =
                i *
                3 +
                1;
            //set units to idle, set unit matchid to newMatch.id
            unitIdToUnit[addressToPlayer[msg.sender].unitIds[i]].action = Action
                .IDLE;
            unitIdToUnit[addressToPlayer[msg.sender].unitIds[i]]
                .matchId = matchCount;
        }

        matchCount++;

        return newMatch.id;
    }

    function joinMatch(uint256 _matchId) public returns (Match memory) {
        if (addressToPlayer[msg.sender].rank == Rank.NONE) {
            // the player trying to join the game must have a player sttruct mapping
            initPlayer();
        }
        require(
            matchIdToMatch[_matchId].status == GameStatus.QUEUED,
            "Invalid MatchId"
        );
        require(
            matchIdToMatch[_matchId].playerA.owner != msg.sender,
            "You can't battle yourself."
        );
        require(addressToPlayer[msg.sender].matchId == 0, "Already in a match");

        matchIdToMatch[_matchId].playerB = addressToPlayer[msg.sender];
        matchIdToMatch[_matchId].status = GameStatus.ACTIVE;
        addressToPlayer[msg.sender].matchId = _matchId;

        // set all of playerA units currentX to 9 and Current Y random number 0-9
        for (uint i = 0; i < 3; i++) {
            unitIdToUnit[addressToPlayer[msg.sender].unitIds[i]].currentX = 9;
            unitIdToUnit[addressToPlayer[msg.sender].unitIds[i]].currentY =
                i *
                3 +
                1;
            //set units to idle, set unit matchid to newMatch.id
            unitIdToUnit[addressToPlayer[msg.sender].unitIds[i]].action = Action
                .IDLE;
            unitIdToUnit[addressToPlayer[msg.sender].unitIds[i]]
                .matchId = _matchId;
        }
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

        emit SetTarget(unitIdToUnit[_unitId].matchId);
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
                    //if units are not owned by the same player set to battling
                    if (matchUnits[i].owner != matchUnits[j].owner) {
                        matchUnits[i].action = Action.BATTLING;
                        matchUnits[j].action = Action.BATTLING;
                    }
                }

                //if battling, units attack each other one time
                if (
                    matchUnits[i].action == Action.BATTLING &&
                    matchUnits[j].action == Action.BATTLING
                ) {
                    matchUnits[i].hp -= matchUnits[j].attack * random();
                    if (matchUnits[i].hp > 10)
                        matchUnits[j].hp -= matchUnits[i].attack * random();
                }

                //if unit health is 10 or less (to avoid uint error) set action to dead
                if (matchUnits[i].hp <= 10) {
                    matchUnits[i].action = Action.DEAD;
                    matchUnits[j].action = Action.IDLE;
                }

                if (matchUnits[j].hp <= 10) {
                    matchUnits[j].action = Action.DEAD;
                    matchUnits[j].action = Action.IDLE;
                }
            }
        }

        //check if playerA units are dead, if so set game status ended and winner to playerB
        uint256 playerAUnits = 0;
        for (uint256 i = 0; i < 3; i++) {
            if (matchUnits[i].action != Action.DEAD) {
                playerAUnits++;
            }
        }
        if (playerAUnits == 0) {
            matchIdToMatch[_matchId].status = GameStatus.ENDED;
            matchIdToMatch[_matchId].winner = 2;
        }

        //check if playerB units are dead, if so set game status ended and winner to playerA
        uint256 playerBUnits = 0;
        for (uint256 i = 3; i < 6; i++) {
            if (matchUnits[i].action != Action.DEAD) {
                playerBUnits++;
            }
        }

        if (playerBUnits == 0) {
            matchIdToMatch[_matchId].status = GameStatus.ENDED;
            matchIdToMatch[_matchId].winner = 1;
        }

        //set both player matchids to 0
        if (matchIdToMatch[_matchId].status == GameStatus.ENDED) {
            addressToPlayer[matchIdToMatch[_matchId].playerA.owner].matchId = 0;
            addressToPlayer[matchIdToMatch[_matchId].playerB.owner].matchId = 0;
        }

        //overwrite the units in the match with updated Units
        for (uint256 i = 0; i < 6; i++) {
            unitIdToUnit[matchUnits[i].id] = matchUnits[i];
        }

        emit RenderStep(_matchId);
    }

    //random number returning 0 or 1
    function random() internal returns (uint256) {
        randomNonce++;
        return
            uint256(
                keccak256(
                    abi.encodePacked(
                        block.timestamp,
                        block.difficulty,
                        msg.sender,
                        randomNonce
                    )
                )
            ) % 2;
    }
}
