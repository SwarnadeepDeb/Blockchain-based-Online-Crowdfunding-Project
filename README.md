# Blockchain-Based Online Crowdfunding Platform

![License](https://img.shields.io/github/license/SwarnadeepDeb/Blockchain-based-Online-Crowdfunding-Project)  
![Issues](https://img.shields.io/github/issues/SwarnadeepDeb/Blockchain-based-Online-Crowdfunding-Project)
![Blockchain-Based Crowdfunding Project](images/ProjectImage.png)



## Demo Video

<div align="center">
    <a href="https://youtu.be/vsz08NuZ6fU">
        <img src="images/VideoThumbnail.png" alt="Collaborative Whiteboard Demo" width="80%">
    </a>
</div>

## Overview

The **Blockchain-Based Online Crowdfunding Platform** is a decentralized application (DApp) that allows campaign creators to raise funds through secure, transparent, and tamper-proof smart contracts. Using the Ethereum blockchain, this platform ensures that contributions are handled safely and only distributed based on predefined conditions.

This platform is perfect for creators, startups, or non-profit organizations looking to fund their projects while maintaining transparency and control.

## Key Features

- **Decentralized**: All funds and transactions are handled by smart contracts on the Ethereum blockchain, ensuring transparency and security.
- **Project Creation**: Creators can easily set up crowdfunding campaigns with funding goals and deadlines.
- **Contributor Protection**: Funds are only transferred if the campaign successfully reaches its goal; otherwise, contributors can withdraw their donations.
- **Transparent**: Contributions and fund releases are fully visible and auditable on the blockchain.

## Project Structure

The project is divided into several components:

- **Frontend**: Built with React.js for a responsive and intuitive user interface. Contributors and project creators can interact with the platform seamlessly.
- **Smart Contracts**: Written in Solidity, deployed on the Ethereum blockchain. The contracts manage the entire crowdfunding lifecycle, including fund collection and distribution.
- **Blockchain Integration**: Powered by ether.js for interacting with the Ethereum blockchain.

## Technologies Used

- **Blockchain**: Ethereum (Solidity, ether.js)
- **Frontend**: React.js, CSS, JavaScript
- **Backend**: Node.js, Express.js
- **Development Tools**: Hardhat for contract deployment and testing

## Setup Instructions

### Prerequisites

- Node.js and npm installed
- MetaMask extension for interacting with the Ethereum blockchain

### Installation

1. Clone the repository:
    ```bash
    git clone https://github.com/SwarnadeepDeb/Blockchain-based-Online-Crowdfunding-Project.git
    cd Blockchain-based-Online-Crowdfunding-Project
    ```

2. Install dependencies:
    ```bash
    npm install
    ```

3. Compile and deploy smart contracts:
    ```bash
    npx hardhat compile
    npx hardhat run scripts/deploy.js --network <network-name>
    ```

4. Run the development server:
    ```bash
    npm start
    ```

## Usage

1. **Project Creator**: A user can create a project by defining a funding goal, deadline, and project details. If the goal is met, the creator can withdraw the funds.
2. **Contributors**: Users can contribute to projects. If the project fails to meet its goal, contributors can withdraw their funds.
3. **Transaction Transparency**: All transactions, including contributions and withdrawals, are verifiable on the blockchain.

## Smart Contracts

- **Lock.sol**: Manages campaign creation, contribution handling, and fund distribution.


## Screenshots

![Screenshot 1](images/S1.png)  
*Wallet Connection interface*

![Screenshot 2](images/S2.png)  
*Campaign Creation interface*

![Screenshot 3](images/S3.png)  
*Dashboard interface*

![Screenshot 4](images/S4.png)  
*Campaign Donation interface*

![Screenshot 5](images/S5.png)  
*Withdrawl interface*

## Future Enhancements

- **Mobile Application**: Develop a mobile app for easier access and interaction.

## Contributing

Contributions are welcome! If you want to improve this project, feel free to open an issue or submit a pull request.

## License

This project is licensed under the MIT License - see the [LICENSE](./LICENSE) file for details.
