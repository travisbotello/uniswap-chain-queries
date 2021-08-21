/**
 * @fileoverview Queries a factory for existing LPs using a token pair for
 *    UniswapV2 clones.
 */

const { ethers } = require('ethers');

const factoryAbi = require('../abi/uniswap-v2-factory.abi.json');
const { NOT_FOUND } = require('../../constants/address.const');

const entity = (module.exports = {});

/**
 * Queries a factory for existing LPs using a token pair for UniswapV2 clones.
 *
 * @param {string} factoryAddress The factory address.
 * @param {Object} provider The provider to use.
 * @param {Array<string>} tokenPair Array tuple with addresses of the token
 *    pair to look for.
 * @return {Promise<string|void>} A promise with liquidity pool address or empty.
 */
entity.queryUniV2FactoryForLP = async (factoryAddress, provider, tokenPair) => {
  const contract = new ethers.Contract(factoryAddress, factoryAbi, provider);

  const [token0, token1] = tokenPair;

  let lpAddress;
  try {
    lpAddress = await contract.getPair(token0.address, token1.address);
  } catch (ex) {
    return;
  }

  if (lpAddress === NOT_FOUND) {
    return;
  }

  return lpAddress;
};
