// SPDX-License-Identifier: GPL-3.0

// pragma solidity >=0.7.0 <0.9.0;

// contract Test {
// // future ideas
//     struct Unit {
//         uint256 id;
//         UnitTypes unitType;
//         uint256 hp;
//         uint256 attack;
//         uint256 armor;
//         ActionState currentAction;
//         address owner;
//         uint256 count;
//         // Match Info
//         uint x;
//         uint y;
//         // uint matchId;
        // uint regenerationTime;
        // uint establishTimeTOReach;
        // InterMatchStatus available;
    }
    // @dev to avoid Same unit being used in multiple matches
    enum InterMatchStatus {
        none,
        inWar,
        available
    }
        //     Unit[10][10] public grid;
    //  function abc() public  {
    // //   mapping(Unit => uint) memory abc;
    //     Unit memory newUnit;
    //     newUnit.hp = 10;
    //     newUnit.attack = 1;
    //     newUnit.armor = 0;
    //     newUnit.currentAction = ActionState.idle;
    //     newUnit.id = 0;
    //     newUnit.count = 3;
    //     newUnit.owner = msg.sender;
    //     newUnit.x = 0;
    //     newUnit.y = 0;
    //     newUnit.matchId = 0;

    //         grid[0][0] = newUnit;
    // }

    // function read_state(uint256 matchId)
    //     public
    //     view
    //     returns (Match memory matchAB)
    // {
    //     matchAB = gameIdToMatch[matchId];
    //     return matchAB;
    // }

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

    // function listArmy() public view returns (Unit[] memory armyList) {
    //     Player memory tempPlayer = addressToPlayer[msg.sender];
    //     uint army_size = tempPlayer.playerSpecficUnitId - 2;
    //     Unit[] memory army_list = new Unit[](army_size);
    //     for (uint i = 1; i < tempPlayer.playerSpecficUnitId; i++) {
    //         armyList[i - 1] = ownerToIdToUnit[msg.sender][i];
    //     }
    //     return army_list;
    // }

    // function selectArmy(uint256 matchId, uint armyUnitId)
    //     public
    //     returns (Unit memory army)
    // {
    //     ownerToIdToUnit[msg.sender][armyUnitId].available = InterMatchStatus
    //         .inWar;
    //     army = ownerToIdToUnit[msg.sender][armyUnitId];
    //     return army;
    // }
}
//     function random(uint num) public view returns(uint){

//        return uint(keccak256(abi.encodePacked(block.timestamp,block.difficulty,
//  msg.sender))) % num;
//         }


    //  struct  Grid {
    //     uint256[10][10] unitMap;
    // }

    // Grid temp;
    // function getGrid() pure public returns (Grid memory g) {
    //         g.unitMap[0][0] = 1;
    //         g.unitMap[0][1] = 0;
    //         g.unitMap[0][9] = 9;
    //         g.unitMap[9][0] = 90;

    //         return g;
    // }
