// SPDX-License-Identifier: GPL-2.0-or-later
pragma solidity >=0.5.0;

/// @title Immutable state
/// @notice Functions that return immutable state of the router
interface IPeripheryImmutableState {
    /// @return Returns the address of the Leviathan deployer
    function deployer() external view returns (address);

    /// @return Returns the address of the Leviathan factory
    function factory() external view returns (address);

    /// @return Returns the address of WETH
    function WETH() external view returns (address);
}
