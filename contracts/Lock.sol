
// pragma solidity ^0.8.9;

// contract Lock {
//       struct Campaign {
//         address owner;
//         string title;
//         string description;
//         uint256 target;
//         uint256 deadline;
//         uint256 amountCollected;
//         string image;
//         address[] donators;
//         uint256[] donations;
//     }

//     mapping(uint256 => Campaign) public campaigns;

//     uint256 public numberOfCampaigns = 0;

//     function createCampaign(address _owner, string memory _title, string memory _description, uint256 _target, uint256 _deadline, string memory _image) public returns (uint256) {
//         Campaign storage campaign = campaigns[numberOfCampaigns];

//         require(campaign.deadline < block.timestamp, "The deadline should be a date in the future.");

//         campaign.owner = _owner;
//         campaign.title = _title;
//         campaign.description = _description;
//         campaign.target = _target;
//         campaign.deadline = _deadline;
//         campaign.amountCollected = 0;
//         campaign.image = _image;

//         numberOfCampaigns++;

//         return numberOfCampaigns - 1;
//     }

//     function donateToCampaign(uint256 _id) public payable {
//         uint256 amount = msg.value;

//         Campaign storage campaign = campaigns[_id];

//         campaign.donators.push(msg.sender);
//         campaign.donations.push(amount);

//         (bool sent,) = payable(campaign.owner).call{value: amount}("");

//         if(sent) {
//             campaign.amountCollected = campaign.amountCollected + amount;
//         }
//     }

//     function getDonators(uint256 _id) view public returns (address[] memory, uint256[] memory) {
//         return (campaigns[_id].donators, campaigns[_id].donations);
//     }

//     function getCampaigns() public view returns (Campaign[] memory) {
//         Campaign[] memory allCampaigns = new Campaign[](numberOfCampaigns);

//         for(uint i = 0; i < numberOfCampaigns; i++) {
//             Campaign storage item = campaigns[i];

//             allCampaigns[i] = item;
//         }

//         return allCampaigns;
//     }
// }






// pragma solidity ^0.8.9;

// contract Lock {
//     struct Campaign {
//         address owner;
//         string title;
//         string description;
//         uint256 target;
//         uint256 deadline;
//         uint256 amountCollected;
//         string image;
//         address[] donators;
//         uint256[] donations;
//     }

//     mapping(uint256 => Campaign) public campaigns;
//     uint256 public numberOfCampaigns = 0;

//     function createCampaign(
//         address _owner,
//         string memory _title,
//         string memory _description,
//         uint256 _target,
//         uint256 _deadline,
//         string memory _image
//     ) public returns (uint256) {
//         require(_deadline > block.timestamp, "The deadline should be a date in the future.");

//         Campaign storage campaign = campaigns[numberOfCampaigns];

//         campaign.owner = _owner;
//         campaign.title = _title;
//         campaign.description = _description;
//         campaign.target = _target;
//         campaign.deadline = _deadline;
//         campaign.amountCollected = 0;
//         campaign.image = _image;

//         numberOfCampaigns++;

//         return numberOfCampaigns - 1;
//     }

//     function donateToCampaign(uint256 _id) public payable {
//         uint256 amount = msg.value;
//         Campaign storage campaign = campaigns[_id];

//         require(block.timestamp < campaign.deadline, "The deadline has passed.");
//         require(campaign.amountCollected < campaign.target, "The target amount has been reached.");

//         campaign.donators.push(msg.sender);
//         campaign.donations.push(amount);

//         (bool sent,) = payable(campaign.owner).call{value: amount}("");
        
//         if (sent) {
//             campaign.amountCollected = campaign.amountCollected + amount;
//         }
//     }

//     function withdrawFunds(uint256 _id) public {
//         Campaign storage campaign = campaigns[_id];

//         require(block.timestamp >= campaign.deadline || campaign.amountCollected >= campaign.target, "The target amount or deadline has not been reached.");
//         require(msg.sender == campaign.owner, "Only the campaign owner can withdraw the funds.");

//         uint256 balance = campaign.amountCollected;
//         require(balance > 0, "No funds available for withdrawal.");

//         campaign.amountCollected = 0;

//         (bool sent,) = payable(campaign.owner).call{value: balance}("");
//         require(sent, "Failed to send Ether.");
//     }

//     function getDonators(uint256 _id) view public returns (address[] memory, uint256[] memory) {
//         return (campaigns[_id].donators, campaigns[_id].donations);
//     }

//     function getCampaigns() public view returns (Campaign[] memory) {
//         Campaign[] memory allCampaigns = new Campaign[](numberOfCampaigns);

//         for (uint i = 0; i < numberOfCampaigns; i++) {
//             Campaign storage item = campaigns[i];
//             allCampaigns[i] = item;
//         }

//         return allCampaigns;
//     }
// }




// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

contract Lock {
    struct Campaign {
        address owner;
        string title;
        string description;
        uint256 target;
        uint256 deadline;
        uint256 amountCollected;
        string image;
        address[] donators;
        uint256[] donations;
    }

    mapping(uint256 => Campaign) public campaigns;
    address public deployer;

    uint256 public numberOfCampaigns = 0;

    constructor() {
        deployer = msg.sender;
    }

    function createCampaign(
        address _owner,
        string memory _title,
        string memory _description,
        uint256 _target,
        uint256 _deadline,
        string memory _image
    ) public returns (uint256) {
        require(_deadline > block.timestamp, "The deadline should be a date in the future.");

        Campaign storage campaign = campaigns[numberOfCampaigns];

        campaign.owner = _owner;
        campaign.title = _title;
        campaign.description = _description;
        campaign.target = _target;
        campaign.deadline = _deadline;
        campaign.amountCollected = 0;
        campaign.image = _image;

        numberOfCampaigns++;

        return numberOfCampaigns - 1;
    }

    function donateToCampaign(uint256 _id) public payable {
        uint256 amount = msg.value;
        Campaign storage campaign = campaigns[_id];

        require(block.timestamp < campaign.deadline, "The deadline has passed.");
        require(campaign.amountCollected < campaign.target, "The target amount has been reached.");

        campaign.donators.push(msg.sender);
        campaign.donations.push(amount);

        campaign.amountCollected += amount;
    }

    function withdrawFunds(uint256 _id) public {
        Campaign storage campaign = campaigns[_id];

        require(block.timestamp >= campaign.deadline || campaign.amountCollected >= campaign.target, "The target amount or deadline has not been reached.");
        require(msg.sender == campaign.owner, "Only the campaign owner can withdraw the funds.");
        require(campaign.amountCollected > 0, "No funds available for withdrawal.");

        uint256 amount = campaign.amountCollected;
        campaign.amountCollected = 0;

        (bool sent,) = payable(campaign.owner).call{value: amount}("");
        require(sent, "Failed to send Ether.");
    }

    function getDonators(uint256 _id) view public returns (address[] memory, uint256[] memory) {
        return (campaigns[_id].donators, campaigns[_id].donations);
    }

    function getCampaigns() public view returns (Campaign[] memory) {
        Campaign[] memory allCampaigns = new Campaign[](numberOfCampaigns);

        for (uint i = 0; i < numberOfCampaigns; i++) {
            Campaign storage item = campaigns[i];
            allCampaigns[i] = item;
        }

        return allCampaigns;
    }

    // Allow contract to receive Ether
    receive() external payable {}
    fallback() external payable {}
}
