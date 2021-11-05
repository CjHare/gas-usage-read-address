// SPDX-License-Identifier: Apache-2.0
pragma solidity ^0.8.4;

import "./Box.sol";

contract ValueReader {
    uint256 _store = 5;
    address private _value;
    Box private _box;

    function setBox(Box box_) external {
        _box = box_;
    }

    function setValue(address value_) external {
        _value = value_;
    }

    function fromThisContract(uint256 store_) external {
        require(_value != msg.sender, "ValueReader::readField: caller matches");

        _store = store_;
    }

    function fromAnotherContract(uint256 store_) external {
        require(
            _box.value() != msg.sender,
            "ValueReader::readExternalAddress: caller matches"
        );

        _store = store_;
    }
}
