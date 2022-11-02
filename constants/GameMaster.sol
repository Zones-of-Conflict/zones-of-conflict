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
        GameGrid grid;

    }

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




    //  empty:0 infantry:11 tank:12 drone:13   //fogofwar //
    //  UserB: infantry:21 tank:22 drone:23
    struct GameGrid {
        uint256[][] map;
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
        Match memory newMatch = Match(
        matchCount,
        msg.sender,
        0x0000000000000000000000000000000000000000,
        GameState.queued,
        );
        gameIdToMatch[matchCount] = newMatch;
        matchCount++;
    }

    function joinMatch(uint256 matchId) public {
        gameIdToMatch[matchId].playerB = msg.sender;
        gameIdToMatch[matchId].state = GameState.active;
    }




    //todo calculate battleLogic
    function resolveBattle(uint256 unitOneId, uint256 unitTwoId) private returns (uint256 winnerId) {

        return unitOneId;
    }


    /**
     * @dev Store value in variable
     * @param num value to store
     */
    

  
}