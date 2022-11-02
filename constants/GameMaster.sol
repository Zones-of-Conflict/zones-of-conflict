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

    struct User {
        address userAddress;

    }

    struct Match {
        address userA;
        address userB;
        GameState state;

    }
    struct Unit {
        UintType ;
        uint256 hp;
        uint256 attack;
        uint256 armor;
        
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


    mapping(uint256 => Match) gameIdToOpen;




    /**
     * @dev Store value in variable
     * @param num value to store
     */
    

  
}