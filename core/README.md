# Leviathan Core

This repository contains the core smart contracts for the Leviathan Protocol.
For higher level contracts, see the [periphery](../periphery/)
repository.

## Local deployment

In order to deploy this code to a local testnet, you should install the npm package
`@leviathanswap/core`
and import the factory bytecode located at
`@leviathanswap/core/artifacts/contracts/LeviathanFactory.sol/LeviathanFactory.json`.
For example:

```typescript
import {
  abi as FACTORY_ABI,
  bytecode as FACTORY_BYTECODE,
} from "@leviathanswap/core/artifacts/contracts/LeviathanFactory.sol/LeviathanFactory.json";

// deploy the bytecode
```

This will ensure that you are testing against the same bytecode that is deployed to
mainnet and public testnets, and all Leviathanswap code will correctly interoperate with
your local deployment.

## Using solidity interfaces

The Leviathanswap v3 interfaces are available for import into solidity smart contracts
via the npm artifact `@leviathanswap/core`, e.g.:

```solidity
import '@leviathanswap/core/contracts/interfaces/ILeviathanPool.sol';

contract MyContract {
  ILeviathanPool pool;

  function doSomethingWithPool() {
    // pool.swap(...);
  }
}

```
