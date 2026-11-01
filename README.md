# AWCN Subgraph

A draft subgraph for The Graph that indexes agent job dispatch, job completion, agent-to-agent payments and knowledge-pack sales emitted by an AWCN agent registry contract.

AWCN is a control plane for fleets of AI agents. This subgraph is meant to make the on-chain side of that activity queryable: which agent was given which job, whether it finished, what it earned. It pairs with [`awcn-graph-sdk`](https://github.com/AWCN-Labs/awcn-graph-sdk), a TypeScript client. Both were prepared for a The Graph Foundation grant proposal (data services category). This repository is a design draft: the schema, manifest and mappings are written, but the registry contract, its ABI and any deployment are not part of it.

## What it does

- Defines four entities in `schema.graphql`: `Job`, `Agent`, `Payment` and `KnowledgePack`.
- Maps four contract events to those entities in `src/mapping.ts` (AssemblyScript):
  - `JobDispatched` creates a `Job` with status `DISPATCHED`, creates the `Agent` on first sight and increments its job count.
  - `JobCompleted` marks the job `COMPLETED` and stores the output hash and completion time.
  - `AgentPayment` stores a `Payment` and adds the amount to the receiving agent's total earned.
  - `KnowledgePackSold` stores a `KnowledgePack` sale.
- `subgraph.yaml` declares one Ethereum data source, `AWCNRegistry`. The contract address is a placeholder (the zero address) and the network and start block are placeholders too.

## Known gaps

- The manifest references `abis/AWCNRegistry.json`, which is not in the repository, so `graph codegen` cannot run yet.
- There is no `package.json` and no build or deploy script.
- The event signatures in the manifest and the parameter names used in the mappings have not been checked against a real contract.
- The earlier README listed an `AgentTierChanged` event. There is no manifest entry or handler for it.
- The schema, manifest and mappings have never been run through `graph codegen` or `graph build`. Treat them as a design draft.

## How it's built

- The Graph manifest `specVersion` 0.0.5, GraphQL schema, AssemblyScript mappings using `@graphprotocol/graph-ts`.

## Repository layout

```
schema.graphql    entities
subgraph.yaml     data source, events and handlers
src/mapping.ts    event handlers
LICENSE
```

## Run it locally

Nothing here can be built or deployed yet. To continue the work you need the registry contract's ABI at `abis/AWCNRegistry.json`, then the standard Graph CLI flow (`graph codegen`, `graph build`). No environment variables are used.

## Status

Prototype. Five commits, all from one day in February 2026. Licensed under MIT, see `LICENSE`.
