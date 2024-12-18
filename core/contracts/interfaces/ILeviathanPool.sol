// SPDX-License-Identifier: GPL-2.0-or-later
pragma solidity >=0.5.0;

import './pool/ILeviathanPoolImmutables.sol';
import './pool/ILeviathanPoolState.sol';
import './pool/ILeviathanPoolDerivedState.sol';
import './pool/ILeviathanPoolActions.sol';
import './pool/ILeviathanPoolOwnerActions.sol';
import './pool/ILeviathanPoolEvents.sol';

/// @title The interface for a Leviathan Pool
/// @notice A Leviathan pool facilitates swapping and automated market making between any two assets that strictly conform
/// to the ERC20 specification
/// @dev The pool interface is broken up into many smaller pieces
interface ILeviathanPool is
    ILeviathanPoolImmutables,
    ILeviathanPoolState,
    ILeviathanPoolDerivedState,
    ILeviathanPoolActions,
    ILeviathanPoolOwnerActions,
    ILeviathanPoolEvents
{

}
