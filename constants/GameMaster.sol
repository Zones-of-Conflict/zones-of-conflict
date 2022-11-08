// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.7.0 <0.9.0;

contract GameMaster {
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

    struct User {
        address userAddress;
    }

    uint256 private matchCount = 0;

    struct Match {
        uint32 id;
        address playerA;
        address playerB;
        GameStatus status;
        uint16[][] grid;
        //  gamegrid
        //  empty:0 infantry:11 tank:12 drone:13   //fogofwar //
        //  UserB: infantry:21 tank:22 drone:23
    }

    struct Unit {
        uint16 unitId;
        UnitType unitType;
        uint16 hp;
        uint16 attack;
        uint16 armor;
        ActionState currentAction;
        //uint256 attackRange;
        //uint256 ammunition;
        //uint256 range;
        //uint256 visibilityRange;
    }

    struct Account {
        //banner
        address owner;
        Rank rank;
        uint16 experience;
        Unit[] Army;
    }

    mapping(address => Account) public addressToAccount;
    mapping(uint256 => Match) public gameIdToMatch;

    function matchFactory() public returns (uint256) {
        //initialize new match and empty grid
        Match memory newMatch;
        uint16[][] memory newGrid;
        uint256 matchId = matchCount;

        //add defualt values to newMatch
        newMatch.id = uint32(matchId);
        newMatch.playerA = msg.sender;
        newMatch.status = GameStatus.queued;
        newMatch.grid = newGrid;
        gameIdToMatch[matchCount] = newMatch;

        //increment matchCounter
        matchCount++;
        return matchId;
    }

    function joinMatch(uint256 matchId) public {
        gameIdToMatch[matchId].playerB = msg.sender;
        gameIdToMatch[matchId].status = GameStatus.active;
    }

    //todo calculate battleLogic
    function resolveBattle(uint256 unitOneId, uint256 unitTwoId)
        public
        returns (uint256 winnerId)
    {
        //battle logic needed here
        //destroy losing force, reward exp to wiinning unit
        //returns winner
        return unitOneId;
    }
}
