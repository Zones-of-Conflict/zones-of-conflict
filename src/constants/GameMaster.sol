// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.7.0 <0.9.0;

contract GameElements {
    enum GameStatus {
        inactive,
        queued,
        active,
        ended
    }
    enum UnitType {
        infantry,
        tank,
        drone
    }

    enum Rank {
        Sergeant,
        Lieutenant,
        Captain
    }

    enum ActionState {
        idle,
        moving,
        combat
    }
}

contract GameMaster is GameElements {
    uint256 private matchCount = 0;

    struct Match {
        uint32 id;
        Player playerA;
        Player playerB;
        GameStatus status;
        uint16[][][] grid;
        //  gamegrid
        //  empty:0 infantry:11 tank:12 drone:13   //fogofwar //
        //  UserB: infantry:21 tank:22 drone:23
    }

    struct Unit {
        uint256 unitId;
        UnitType unitType;
        uint16 hp;
        uint16 attack;
        uint16 armor;
        ActionState currentAction;
    }

    struct Player {
        address owner;
        Rank rank;
        Unit[] Army;
        uint256 unit_id_counter;
    }

    mapping(address => Player) public addressToPlayer;
    mapping(uint256 => Match) public gameIdToMatch;

    // user a first time visits website we must init a player for him
    // and allocate 3 infantries
    function initPlayer() public {
        Player memory newPlayer;
        newPlayer.owner = msg.sender;
        newPlayer.rank = Rank.Sergeant;
        newPlayer.unit_id_counter = 0;
        Unit memory newUnit = initInfantary(newPlayer.unit_id_counter);
        newPlayer.Army[newPlayer.unit_id_counter] = newUnit;
        newPlayer.unit_id_counter++;
        addressToPlayer[msg.sender] = newPlayer;
    }

    function initInfantary(uint256 _unitId)
        private
        pure
        returns (Unit memory newUnit)
    {
        newUnit.unitType = UnitType.infantry;
        newUnit.hp = 10;
        newUnit.attack = 1;
        newUnit.armor = 0;
        newUnit.currentAction = ActionState.idle;
        newUnit.unitId = _unitId;
        return newUnit;
    }

    function matchFactory() public returns (uint256) {
        //initialize new match and empty grid
        Match memory newMatch;
        uint16[][][] memory newGrid;
        uint256 matchId = matchCount;

        //add defualt values to newMatch
        newMatch.id = uint32(matchId);
        newMatch.playerA = addressToPlayer[msg.sender];
        newMatch.status = GameStatus.queued;
        newMatch.grid = newGrid;
        gameIdToMatch[matchCount] = newMatch;

        //increment matchCounter
        matchCount++;
        return matchId;
    }

    function joinMatch(uint256 matchId) public {
        gameIdToMatch[matchId].playerB = addressToPlayer[msg.sender];
        initGame(matchId);
    }

    function initGame(uint256 matchId) private {
        // assign player a unit pos 00  and b positon 100 ,100
        // player 1 and player b is 2
        gameIdToMatch[matchId].grid[1][0][0] = uint16(
            gameIdToMatch[matchId].playerA.Army[0].unitId
        );

        gameIdToMatch[matchId].grid[2][100][100] = uint16(
            gameIdToMatch[matchId].playerB.Army[0].unitId
        );
        gameIdToMatch[matchId].status = GameStatus.active;
    }

    function read_state(uint256 matchId)
        public
        view
        returns (Match memory matchAB)
    {
        matchAB = gameIdToMatch[matchId];
        return matchAB;
    }

    // todo calculate battleLogic
    // function resolveBattle(uint256 unitOneId, uint256 unitTwoId)
    //     public
    //     returns (uint256 winnerId)
    // {
    //     //battle logic needed here
    //     //destroy losing force, reward exp to wiinning unit
    //     //returns winner
    //     return unitOneId;
    // }
}