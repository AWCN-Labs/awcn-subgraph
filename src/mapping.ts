import { BigInt, Bytes } from "@graphprotocol/graph-ts"
import {
  JobDispatched,
  JobCompleted,
  AgentPayment,
  KnowledgePackSold
} from "../generated/AWCNRegistry/AWCNRegistry"
import { Job, Agent, Payment, KnowledgePack } from "../generated/schema"

export function handleJobDispatched(event: JobDispatched): void {
  let job = new Job(event.params.jobId.toHex())
  job.agentId = event.params.agentId.toHex()
  job.jobType = event.params.jobType
  job.requester = event.params.requester
  job.timestamp = event.block.timestamp
  job.status = "DISPATCHED"
  job.save()

  let agent = Agent.load(event.params.agentId.toHex())
  if (!agent) {
    agent = new Agent(event.params.agentId.toHex())
    agent.address = event.params.agentId
    agent.tier = "C"
    agent.trustScore = BigInt.fromI32(50)
    agent.totalJobs = BigInt.fromI32(0)
    agent.totalEarned = BigInt.fromI32(0)
  }
  agent.totalJobs = agent.totalJobs.plus(BigInt.fromI32(1))
  agent.save()
}

export function handleJobCompleted(event: JobCompleted): void {
  let job = Job.load(event.params.jobId.toHex())
  if (!job) return
  job.status = "COMPLETED"
  job.outputHash = event.params.outputHash
  job.completedAt = event.block.timestamp
  job.save()
}

export function handleAgentPayment(event: AgentPayment): void {
  let payment = new Payment(event.transaction.hash.toHex() + "-" + event.logIndex.toString())
  payment.from = event.params.from
  payment.to = event.params.to
  payment.amount = event.params.amount
  payment.currency = event.params.currency
  payment.jobId = event.params.jobId
  payment.timestamp = event.block.timestamp
  payment.save()

  let agent = Agent.load(event.params.to.toHex())
  if (agent) {
    agent.totalEarned = agent.totalEarned.plus(event.params.amount)
    agent.save()
  }
}

export function handleKnowledgePackSold(event: KnowledgePackSold): void {
  let pack = new KnowledgePack(event.transaction.hash.toHex() + "-" + event.logIndex.toString())
  pack.seller = event.params.seller
  pack.buyer = event.params.buyer
  pack.packId = event.params.packId
  pack.price = event.params.price
  pack.timestamp = event.block.timestamp
  pack.save()
}

