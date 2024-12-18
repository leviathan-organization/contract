// SPDX-License-Identifier: GPL-2.0-or-later
import '@leviathanswap/core/contracts/interfaces/ILeviathanPool.sol';

pragma solidity >=0.6.0;

import '../libraries/PoolTicksCounter.sol';

contract PoolTicksCounterTest {
    using PoolTicksCounter for ILeviathanPool;

    function countInitializedTicksCrossed(
        ILeviathanPool pool,
        int24 tickBefore,
        int24 tickAfter
    ) external view returns (uint32 initializedTicksCrossed) {
        return pool.countInitializedTicksCrossed(tickBefore, tickAfter);
    }
}
