// SPDX-License-Identifier: Apache-2.0
pragma solidity ^0.8.4;

contract Box {
    address private _stored;

    function setValue(address value_) external {
        _stored = value_;
    }

    function value() external view returns (address) {
        return _stored;
    }
}
