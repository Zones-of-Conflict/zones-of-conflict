// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.7.0 <0.9.0;

contract GameMaster {
    enum GameState {
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
        // Major,
        // Colonel,
        // General
    }

    // enum Terrain {
    //     flat,
    //     mountain,
    //     building
    // }

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
        uint256 id;
        address playerA;
        address playerB;
        GameState state;
        uint256[][] grid;
    }
    //  gamegrid
    //  empty:0 infantry:11 tank:12 drone:13   //fogofwar //
    //  UserB: infantry:21 tank:22 drone:23

    struct Unit {
        uint256 unitId;
        UnitType unitType;
        uint256 hp;
        uint256 attack;
        uint256 armor;
        ActionState currentAction;

        //uint256 attackRange;
        //uint256 ammunition;
        //uint256 range;
        //uint256 visibilityRange;
    }

    struct Account {
        address owner;
        Rank rank;
        uint256 experience;
        Unit[] Army;
        //banner
    }

    mapping(address => Account) addressToAccount;
    mapping(uint256 => Match) gameIdToMatch;

    function matchFactory() public {
        //initialize new match and empty grid
        Match memory newMatch;
        uint256[][] memory newGrid;

        //add defualt values to newMatch
        newMatch.id = matchCount;
        newMatch.playerA = msg.sender;
        newMatch.state = GameState.queued;
        newMatch.grid = newGrid;
        gameIdToMatch[matchCount] = newMatch;

        //increment matchCounter
        matchCount++;
    }

    function joinMatch(uint256 matchId) public {
        gameIdToMatch[matchId].playerB = msg.sender;
        gameIdToMatch[matchId].state = GameState.active;
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

    /**
     * @dev Store value in variable
     * @param num value to store
     */
}
