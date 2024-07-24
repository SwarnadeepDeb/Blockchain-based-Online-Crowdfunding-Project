const { buildModule } = require("@nomicfoundation/hardhat-ignition/modules");

const BallotModule2 = buildModule("BallotModule2", (m) => {
  const ballot = m.contract("Lock");

  return { ballot };
});

module.exports = BallotModule2;

// 0xD338AC584bb26f24F3aF0683ef12dB90241616fe
// 0xB7A45FDc01A3a56f24e7E50B6788ccbFDF328bcD
//0x2a310cda0830Ff66beDD32728445E4faCD9be7b1

// 0xdD04C2F570bE11B84a07EC1F3a2Fe168bBF9b6AD