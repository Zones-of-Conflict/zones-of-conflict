// SPDX-License-Identifier: GPL-3.0

pragma solidity 0.8.17;
import "./GameElements.sol";

contract GameMaster is GameElements {



    //  zero reserved
    uint256 internal matchCount = 1;
    uint256 internal unitGlobalId = 1;
    uint256 internal unitGlobalId = 1;

    mapping(address => GameElements.Player) public addressToPlayer;
    mapping(uint256 => GameElements.Match) public matchIdToMatch;
    mapping(uint256 => GameElements.Unit) public unitIdToUnit;
    Player internal tempPlayer;
    Unit internal tempUnit;

    ///////////////////////////////////////////////////////////////////////////////
    ///////////////////////////////////////////////////////////////////////////////
    ///  Api Functions
    /////////////////    //////////////////////////////////////////////////////////////
    ///////////////////////////////////////////////////////////////////////////////


    ///////////////////////////////////////////////////////////////////////////////
    ///////////////////////////////////////////////////////////////////////////////
    /// Init Functions
    ///////////////////////////////////////////////////////////////////////////////
    ///////////////////////////////////////////////////////////////////////////////

   function initPlayer() public returns (Player memory newPlayer) {
        require(!addressToPlayer[msg.sender], "Player already initialized.");

        Player memory newPlayer;
        newPlayer.owner = msg.sender;
        newPlayer.rank = Rank.Sergeant;
        newPlayer.unitCount = 3;

        uint256[] newUnitIds;

        Unit memory newUnit1(
            msg.sender,
            UnitTypes.infantry,
            ActionState.idle,
            uint(10),
            uint(1),
            uint(0),
            uint(3)
        );
            address(msg.sender),
            UnitTypes.infantry,
            ActionState.idle,
            uint(10),
            uint(1),
            uint(0),
            uint(3)
        );
        Unit memory newUnit2 = createNewUnit(
            msg.sender,
            UnitTypes.infantry,
            ActionState.idle,
            10,
            1,
            0,
            3
        );
        Unit memory newUnit3 = createNewUnit(
            msg.sender,
            UnitTypes.infantry,
            ActionState.idle,
            10,
            1,
            0,
            3
        );


        addressToPlayer[msg.sender] = newPlayer;

        return addressToPlayer[msg.sender];

        
        
        assignUnitToPlayer(msg.sender, newUnit1.id);
        assignUnitToPlayer(msg.sender, newUnit2.id);
        assignUnitToPlayer(msg.sender, newUnit3.id);

        return newPlayer;
    }

    function createNewPlayer(address _owner, Rank _rank)
        public
        returns (Player memory)
    {
        addressToPlayer[_owner].owner = _owner;
        addressToPlayer[_owner].rank = _rank;
        return addressToPlayer[_owner];
    }

    function assignUnitToPlayer(address playerOwner, uint256 id) public {
        addressToPlayer[playerOwner].ownedUnitId.push(id);
        addressToPlayer[playerOwner].unitCount++;
        // emit displayPlayer( addressToPlayer[playerOwner]);
    }

    function createNewUnit(
        address owner,
        UnitTypes unitType,
        ActionState currentAction,
        uint256 hp,
        uint256 attack,
        uint256 armor,
        uint256 count
    ) public returns (uint256) {
        unitIdToUnit[unitGlobalId].id = GameMaster.unitGlobalId;
        unitIdToUnit[unitGlobalId].owner = owner;
        unitIdToUnit[unitGlobalId].unitType = unitType;
        unitIdToUnit[unitGlobalId].currentAction = currentAction;
        unitIdToUnit[unitGlobalId].hp = hp;
        unitIdToUnit[unitGlobalId].attack = attack;
        unitIdToUnit[unitGlobalId].armor = armor;
        unitIdToUnit[unitGlobalId].count = count;
        unitIdToUnit[unitGlobalId].targetUnit = 0;
        unitIdToUnit[unitGlobalId].x = 0;
        unitIdToUnit[unitGlobalId].y = 0;
        unitIdToUnit[unitGlobalId].matchId = 0;
        unitGlobalId++;
        emit displayNewUnit(unitIdToUnit[unitGlobalId - 1]);
        return unitGlobalId - 1;
    }

    function newGame() public returns (uint256 matchId) {
        // check whteher player who is starting the game has a player or
        if (addressToPlayer[msg.sender].rank == Rank.none) {
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
        emit DisplayMatch(matchIdToMatch[matchId]);
        return matchIdToMatch[matchId];
    }

    ///////////////////////////////////////////////////////////////////////////////
    ///////////////////////////////////////////////////////////////////////////////
    /// GameOPs Functions
    /////////////////////////////////    //////////////////////////////////////////////
    ///////////////////////////////////////////////////////////////////////////////

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

    function infantryFactory() public returns (Unit memory aInfantry) {
        aInfantry.unitType = UnitTypes.infantry;
        aInfantry.hp = 10;
        aInfantry.attack = 1;
        aInfantry.armor = 0;
        aInfantry.currentAction = ActionState.idle;
        aInfantry.id = unitGlobalId;
        unitGlobalId++;
        aInfantry.count = 1;
        aInfantry.owner = msg.sender;
        unitIdToUnit[unitGlobalId] = aInfantry;
        return aInfantry;
    }

    function tankFactory() public returns (Unit memory aTank) {
        aTank.unitType = UnitTypes.tank;
        aTank.hp = 100;
        aTank.attack = 20;
        aTank.armor = 20;
        aTank.currentAction = ActionState.idle;
        aTank.id = unitGlobalId;
        unitGlobalId++;
        aTank.count = 1;
        aTank.owner = msg.sender;
        unitIdToUnit[unitGlobalId] = aTank;
        return aTank;
    }

    function sixValues() public returns (Unit[] memory) {
        Unit[] memory armyList = new Unit[](6);
        for (uint256 i = 0; i < 6; i++) {
            armyList[i] = infantryFactory();
        }
        return armyList;
    }

    /// @dev need to be called every 5 seconds
    /// game will not progess if no called render
    function render(uint256 matchId) public returns (uint256[11][11] memory v) {
        // intialize time if game step is zero
        if (matchIdToMatch[matchId].stepCount == 0) {
            // increase the Game step
            matchIdToMatch[matchId].stepCount++;
            // create a new instance of a timer
            matchIdToMatch[matchId].stepTimer = new StepTimer();
            // start the timer.
            matchIdToMatch[matchId].stepTimer.start();
            return matchIdToMatch[matchId].gameGrid;
        } else {
            if (matchIdToMatch[matchId].stepTimer.timeToRender()) {
                return do_render(matchId);
            }
        }
    }

    function do_render(uint256 matchId)
        public
        returns (uint256[11][11] memory v)
    {
        // render next step
    }
}
