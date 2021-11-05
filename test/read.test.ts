// Start - Support direct Mocha run & debug
import 'hardhat'
import '@nomiclabs/hardhat-ethers'
// End - Support direct Mocha run & debug

import chai, {expect} from 'chai'
import {ethers} from 'hardhat'
import {before} from 'mocha'
import {solidity} from 'ethereum-waffle'
import {Box, ValueReader} from '../typechain'

// Wires up Waffle with Chai
chai.use(solidity)

describe('Gas cost reading variables', () => {
    before(async () => {
        value = await signer(1)
        boxContract = await box()
        valueReaderContract = await valueReader()

        await boxContract.setValue(value)
        await valueReaderContract.setValue(value)
        await valueReaderContract.setBox(boxContract.address)
    })

    it('read address variable stored in contract', async () => {
        const receipt = await (
            await valueReaderContract.fromThisContract(1)
        ).wait()

        console.log('read from this contract, gas used %s', receipt.gasUsed)
    })

    it('read address from another contract', async () => {
        const receipt = await (
            await valueReaderContract.fromAnotherContract(1)
        ).wait()

        console.log('read from another contract, gas used %s', receipt.gasUsed)
    })

    let value: string
    let boxContract: Box
    let valueReaderContract: ValueReader
})

async function box(): Promise<Box> {
    const factory = await ethers.getContractFactory('Box')
    const dao = <Box>await factory.deploy()
    return dao.deployed()
}

async function valueReader(): Promise<ValueReader> {
    const factory = await ethers.getContractFactory('ValueReader')
    const dao = <ValueReader>await factory.deploy()
    return dao.deployed()
}

async function signer(index: number): Promise<string> {
    const signers = await ethers.getSigners()
    expect(signers.length).is.greaterThan(index)
    return signers[index].address
}
