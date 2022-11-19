// SPDX-License-Identifier: GPL-3.0

pragma solidity 0.8.6;

contract GameElements {
    enum GameStatus {
        none,
        queued,
        active,
        ended
    }

    enum UnitTypes {
        infantry,
        tank,
        drone
    }

    enum Rank {
        none,
        Sergeant,
        Lieutenant,
        Captain
    }

    enum ActionState {
        idle,
        moving,
        combat,
        regenerating
    }

    struct Match {
        uint256 id;
        Player playerA;
        Player playerB;
        GameStatus status;
        uint256[11][11] gameGrid;
        uint256 winner;
        uint256[] participatingUnits;
    }

    struct Unit {
        uint256 id;
        address owner;
        UnitTypes unitType;
        ActionState currentAction;
        uint256 hp;
        uint256 attack;
        uint256 armor;
        uint256 count;
        uint256 targetUnit;
        uint256 x;
        uint256 y;
        uint256 matchId;
    }

    struct Player {
        address owner;
        Rank rank;
        uint256 unitCount;
        uint256[] ownedUnitId;
    }
}

contract GameMaster is GameElements {
    uint256 public matchCount = 1;
    uint256 public unitGlobalId = 1;
    mapping(address => Player) public addressToPlayer;
    mapping(uint256 => Match) public matchIdToMatch;
    mapping(uint256 => Unit) public unitIdToUnit;

    function createNewInitUnit() public returns (uint) {
        Unit memory newUnit;
        newUnit.id = unitGlobalId;
        newUnit.owner = msg.sender;
        newUnit.unitType = UnitTypes.infantry;
        newUnit.currentAction = ActionState.idle;

        unitIdToUnit[unitGlobalId] = newUnit;
        return unitGlobalId;
    }

    function initPlayer() public returns (Player memory) {
        require(
            addressToPlayer[msg.sender].rank == Rank.none,
            "Player already initialized."
        );
        addressToPlayer[msg.sender].owner = msg.sender;
        addressToPlayer[msg.sender].rank = Rank.Sergeant;
        addressToPlayer[msg.sender].unitCount = 3;

        addressToPlayer[msg.sender].ownedUnitId.push(createNewInitUnit());
        unitGlobalId++;

        addressToPlayer[msg.sender].ownedUnitId.push(createNewInitUnit());
        unitGlobalId++;

        addressToPlayer[msg.sender].ownedUnitId.push(createNewInitUnit());
        unitGlobalId++;
        return addressToPlayer[msg.sender];
    }

    function newGame() public returns (uint256 matchId) {
        // check whteher player who is starting the game has a player struct or not
        if (addressToPlayer[msg.sender].rank != Rank.none) {
            // if not initialize the player
            initPlayer();
        }
        // get match id and increase the id
        matchId = GameMaster.matchCount;
        GameMaster.matchCount++;

        matchIdToMatch[matchId].id = matchId;
        matchIdToMatch[matchId].status = GameStatus.queued;
        matchIdToMatch[matchId].playerA = addressToPlayer[msg.sender];
        // init the player army positon at 2 column differnce
        // 1,2 2,4 and 1,6
        matchIdToMatch[matchId].gameGrid[1][2] = addressToPlayer[msg.sender]
            .ownedUnitId[0];
        unitIdToUnit[addressToPlayer[msg.sender].ownedUnitId[0]].x = 1;
        unitIdToUnit[addressToPlayer[msg.sender].ownedUnitId[0]].y = 2;
        matchIdToMatch[matchId].participatingUnits.push(
            addressToPlayer[msg.sender].ownedUnitId[0]
        );

        matchIdToMatch[matchId].gameGrid[2][4] = addressToPlayer[msg.sender]
            .ownedUnitId[1];
        unitIdToUnit[addressToPlayer[msg.sender].ownedUnitId[1]].x = 2;
        unitIdToUnit[addressToPlayer[msg.sender].ownedUnitId[1]].y = 4;
        matchIdToMatch[matchId].participatingUnits.push(
            addressToPlayer[msg.sender].ownedUnitId[1]
        );

        matchIdToMatch[matchId].gameGrid[1][6] = addressToPlayer[msg.sender]
            .ownedUnitId[2];
        unitIdToUnit[addressToPlayer[msg.sender].ownedUnitId[2]].x = 1;
        unitIdToUnit[addressToPlayer[msg.sender].ownedUnitId[2]].y = 6;
        matchIdToMatch[matchId].participatingUnits.push(
            addressToPlayer[msg.sender].ownedUnitId[2]
        );

        return matchId;
    }

    function joinGame(uint256 matchId) public returns (Match memory) {
        if (addressToPlayer[msg.sender].rank == Rank.none) {
            // the player trying to hjoin the game must have a player sttruct mapping
            initPlayer();
        }
        matchIdToMatch[matchId].playerB = addressToPlayer[msg.sender];

        matchIdToMatch[matchId].gameGrid[10][2] = addressToPlayer[msg.sender]
            .ownedUnitId[0];
        unitIdToUnit[addressToPlayer[msg.sender].ownedUnitId[0]].x = 10;
        unitIdToUnit[addressToPlayer[msg.sender].ownedUnitId[0]].y = 2;
        matchIdToMatch[matchId].participatingUnits.push(
            addressToPlayer[msg.sender].ownedUnitId[0]
        );

        matchIdToMatch[matchId].gameGrid[9][4] = addressToPlayer[msg.sender]
            .ownedUnitId[1];
        unitIdToUnit[addressToPlayer[msg.sender].ownedUnitId[1]].x = 9;
        unitIdToUnit[addressToPlayer[msg.sender].ownedUnitId[1]].y = 4;
        matchIdToMatch[matchId].participatingUnits.push(
            addressToPlayer[msg.sender].ownedUnitId[1]
        );

        matchIdToMatch[matchId].gameGrid[10][6] = addressToPlayer[msg.sender]
            .ownedUnitId[1];
        unitIdToUnit[addressToPlayer[msg.sender].ownedUnitId[1]].x = 10;
        unitIdToUnit[addressToPlayer[msg.sender].ownedUnitId[1]].y = 6;
        matchIdToMatch[matchId].participatingUnits.push(
            addressToPlayer[msg.sender].ownedUnitId[2]
        );
        return matchIdToMatch[matchId];
    }

    function moveUnits(
        uint256 matchId,
        uint256 newX,
        uint256 newY,
        uint256 senderUnitsGlobalId,
        uint256 oldX,
        uint256 oldY
    ) public returns (uint256[11][11] memory grid) {
        // unitid at old position
        uint256 unitIdAtOldPos = matchIdToMatch[matchId].gameGrid[oldX][oldY];
        // troop id at new position
        uint256 unitIdAtNewPos = matchIdToMatch[matchId].gameGrid[newX][newY];

        // a x,y Position cant have multiple units for the same position
        // a x,y Position must be 0/ empty for troops to move
        // if not battle will happen between Player A and Player B
        require(
            msg.sender != unitIdToUnit[unitIdAtNewPos].owner ||
                unitIdToUnit[unitIdAtNewPos].owner == address(0)
        );

        // at old position we must get back the unitGlobalId given as params
        require(unitIdAtOldPos == senderUnitsGlobalId);

        // txn generated from owner encrypter with prv and decrepted with pbk
        // sender must participant of the match
        require(
            msg.sender == matchIdToMatch[matchId].playerA.owner ||
                msg.sender == matchIdToMatch[matchId].playerB.owner
        );

        // is troop already at that position?.
        if (unitIdAtNewPos == 0) {
            // make old position empty
            matchIdToMatch[matchId].gameGrid[oldX][oldY] = 0;
            // move unit to new position
            matchIdToMatch[matchId].gameGrid[newX][newY] = unitIdAtOldPos;
        } else if (unitIdAtNewPos != 0) {
            // troops exists on the new position

            resolveBattle(matchId, newX, newY, oldX, oldY);
        }

        return matchIdToMatch[matchId].gameGrid;
    }

    // player B always wins
    function resolveBattle(
        uint256 matchId,
        uint256 playerAPositionX,
        uint256 playerAPositionY,
        uint256 playerBPositionX,
        uint256 playerBPositionY
    ) public {
        // UNit id at player a and player b position
        uint256 playerAUnitId = matchIdToMatch[matchId].gameGrid[
            playerAPositionX
        ][playerAPositionY];
        uint256 playerBUnitId = matchIdToMatch[matchId].gameGrid[
            playerBPositionX
        ][playerBPositionY];

        uint256 unitWeightA = getUnitWeight(playerAUnitId);
        uint256 unitWeightB = getUnitWeight(playerBUnitId);

        if (unitWeightA > unitWeightB) {
            // player A wins
            // it holds its position
            // mark unit of player B at  playerBPositionX and Y as regernerating
            unitIdToUnit[playerBUnitId].currentAction = ActionState
                .regenerating;
            // remove that unit from grid
            matchIdToMatch[matchId].gameGrid[playerBPositionX][
                playerBPositionY
            ] = 0;
        } else {
            // playerB or the owner who call the movement always  wins currently
            // place player B unit at Player A position
            matchIdToMatch[matchId].gameGrid[playerAPositionX][
                playerAPositionY
            ] = playerBUnitId;
            matchIdToMatch[matchId].gameGrid[playerBPositionX][
                playerBPositionY
            ] = 0;
        }
    }

    function getUnitWeight(uint256 unitId) public view returns (uint256) {
        return
            unitIdToUnit[unitId].hp +
            unitIdToUnit[unitId].attack +
            unitIdToUnit[unitId].armor +
            unitIdToUnit[unitId].count;
    }

    //     function render(uint256 matchId)
    //         public
    //         returns (uint256[11][11] memory v)
    //     {}
}
