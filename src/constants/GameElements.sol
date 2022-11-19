// SPDX-License-Identifier: GPL-3.0

pragma solidity 0.8.17;
import "./StepTimer.sol";

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

    enum EventType {
        none,
        moveUnit,
        haltUnit,
        attack,
        startBattle,
        processBattle
    }

    struct Event {
        EventType EventType;
        uint256 eventId;
        uint256 involvedUnitId;
        address generatedByPlayer;
    }

    struct Match {
        // 1 minute = 1step
        // 5 sec =1 step
        uint256 stepCount;
        uint256 id;
        Player playerA;
        Player playerB;
        GameStatus status;
        // we dont use 00 as it is deafult value
        uint256[11][11] gameGrid;
        // 0 none 1 A ,2B
        uint256 winner;
        StepTimer stepTimer;
        uint256[] participatingUnits;
        uint256[] eventQueue;
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
        // 1 block per Step for infantry
        // uint256 speed= 0.2;
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
