// SPDX-License-Identifier: GPL-2.0-or-later
pragma solidity =0.7.6;

import '@leviathanswap/core/contracts/interfaces/ILeviathanPool.sol';
import './PoolAddress.sol';

/// @notice Provides validation for callbacks from Leviathan Pools
library CallbackValidation {
    /// @notice Returns the address of a valid Leviathan Pool
    /// @param deployer The contract address of the Leviathan deployer
    /// @param tokenA The contract address of either token0 or token1
    /// @param tokenB The contract address of the other token
    /// @param fee The fee collected upon every swap in the pool, denominated in hundredths of a bip
    /// @return pool The V3 pool contract address
    function verifyCallback(
        address deployer,
        address tokenA,
        address tokenB,
        uint24 fee
    ) internal view returns (ILeviathanPool pool) {
        return verifyCallback(deployer, PoolAddress.getPoolKey(tokenA, tokenB, fee));
    }

    /// @notice Returns the address of a valid Leviathan Pool
    /// @param deployer The contract address of the Leviathan deployer
    /// @param poolKey The identifying key of the V3 pool
    /// @return pool The V3 pool contract address
    function verifyCallback(address deployer, PoolAddress.PoolKey memory poolKey)
        internal
        view
        returns (ILeviathanPool pool)
    {
        pool = ILeviathanPool(PoolAddress.computeAddress(deployer, poolKey));
        require(msg.sender == address(pool));
    }
}
