# AWCN Subgraph

> Indexing autonomous AI agent activity, fleet job dispatch events, and agent-to-agent payment flows on-chain.

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

## Overview

AWCN Subgraph indexes the autonomous agent economy on-chain. Built for The Graph Foundation Grant (Data Services category).

## Events Indexed

- JobDispatched(agentId, jobType, requester, timestamp)
- JobCompleted(agentId, jobId, outputHash, timestamp)
- AgentPayment(from, to, amount, currency, jobId)
- KnowledgePackSold(sellerId, buyerId, packId, price)
- AgentTierChanged(agentId, oldTier, newTier, trustScore)

## Grant Context

Grant ask: $15,000-$40,000 | Timeline: 3 months | Maintainer: AWCN Labs
