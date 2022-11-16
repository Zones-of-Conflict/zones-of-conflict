// SPDX-License-Identifier: GPL-3.0

pragma solidity 0.8.3;

contract StepTimer {
    // StepTimer ensures that next game state is render after certain amount of time
      uint startTime;
      uint stepTime = 5 seconds;


    function start() public{
        startTime = block.timestamp;
    }

    function timeToRender() public view returns(bool){
        bool res =startTime + stepTime <= block.timestamp ;
        require(res== true);
        return  res;
    }
}