// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.7.0 <0.9.0;

contract GameMaster {
    enum GameState {
        inactive,
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

    enum ActionState {
        idle,
        moving,
        combat
    }

    struct User {
        address userAddress;
    }

    struct Match {
        address userA;
        address userB;
        GameState state;
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

    enum Terrain {
        flat,
        mountain,
        building
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
    mapping(uint256 => Match) gameIdToOpen;

    //todo calculate battleLogic
    function resolveBattle(uint256 unitOneId, uint256 unitTwoId)
        private
        returns (uint256 winnerId)
    {
        return unitOneId;
    }

    /**
     * @dev Store value in variable
     * @param num value to store
     */
}
