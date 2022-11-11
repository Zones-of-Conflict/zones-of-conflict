// SPDX-License-Identifier: GPL-3.0

pragma solidity 0.8.14;
import "./GameElements.sol";

contract GameMaster is GameElements {
    //  zero reserved
    uint256 internal matchCount = 1;
    uint256 internal unitGlobalId = 1;

    uint256[10][10] public gameGrid;

    struct Match {
        uint256 id;
        Player playerA;
        Player playerB;
        GameStatus status;
        uint256[10][10] gameGrid;
    }

    struct Unit {
        uint256 id;
        UnitTypes unitType;
        uint256 hp;
        uint256 attack;
        uint256 armor;
        ActionState currentAction;
        address owner;
        uint256 count;
        // Match Info
        uint x;
        uint y;
        // uint matchId;
        uint regenerationTime;
        uint establishTimeTOReach;
        InterMatchStatus available;
    }

    struct Player {
        address owner;
        Rank rank;
        // uuid for Player army=> unique ID
        // starts with 1, 0 reserved
        uint256 playerSpecficUnitId;
    }

    mapping(address => Player) internal addressToPlayer;
    mapping(uint256 => Match) internal gameIdToMatch;
    mapping(address => mapping(uint256 => Unit)) internal ownerToIdToUnit;
    mapping(uint256 => Unit) internal unitIdToUnit;

    event displayInitPlayer(Player a);

    /// @dev first time player initialisation
    /// with 3 infantary units
    function initPlayer() public {
        Player memory newPlayer = addressToPlayer[msg.sender];
        require(newPlayer.rank != Rank.none);

        newPlayer.owner = msg.sender;
        newPlayer.rank = Rank.Sergeant;
        newPlayer.playerSpecficUnitId = 1;
        initInfantary(newPlayer.playerSpecficUnitId, msg.sender);
        newPlayer.playerSpecficUnitId++;
        addressToPlayer[msg.sender] = newPlayer;
        emit displayInitPlayer(newPlayer);
    }

    /// @dev init first 3 infantary units
    /// mapped to ownerToIdToUnit
    function initInfantary(uint256 _id, address _owner) private {
        Unit memory newUnit;
        newUnit.unitType = UnitTypes.infantry;
        newUnit.hp = 10;
        newUnit.attack = 1;
        newUnit.armor = 0;
        newUnit.currentAction = ActionState.idle;
        newUnit.id = _id;
        newUnit.count = 3;
        newUnit.owner = _owner;
        newUnit.x = 0;
        newUnit.y = 0;
        ownerToIdToUnit[_owner][_id] = newUnit;
    }

    // function matchFactory() public returns (uint256  matchId) {

    // }

    function newGame() public returns (uint256 matchId) {
        //initialize new match
        Match memory newMatch;
        matchId = GameMaster.matchCount;

        newMatch.id = GameMaster.matchCount;
        newMatch.playerA = addressToPlayer[msg.sender];
        newMatch.status = GameStatus.queued;
        gameIdToMatch[matchCount] = newMatch;
        // TODO init army units
        //increment matchCounter
        GameMaster.matchCount++;
        return matchId;
    }

    function joinMatch(uint256 matchId) public {
        if (addressToPlayer[msg.sender].playerSpecficUnitId == 0) {
            initPlayer();
        }
        gameIdToMatch[matchId].playerB = addressToPlayer[msg.sender];
        // TODO init army units
    }

    function listArmy() public view returns (Unit[] memory armyList) {
        Player memory tempPlayer = addressToPlayer[msg.sender];
        uint army_size = tempPlayer.playerSpecficUnitId - 2;
        Unit[] memory army_list = new Unit[](army_size);
        for (uint i = 1; i < tempPlayer.playerSpecficUnitId; i++) {
            armyList[i - 1] = ownerToIdToUnit[msg.sender][i];
        }
        return army_list;
    }

    function selectArmy(uint256 matchId, uint armyUnitId)
        public
        returns (Unit memory army)
    {
        ownerToIdToUnit[msg.sender][armyUnitId].available = InterMatchStatus
            .inWar;
        army = ownerToIdToUnit[msg.sender][armyUnitId];
        return army;
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
}
