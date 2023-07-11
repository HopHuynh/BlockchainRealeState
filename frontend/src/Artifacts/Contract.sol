// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;

contract Main {
    address public government;
    address public immutable owner;

    enum ActionType {
        BUY,
        ADD_RENT_LIST,
        REMOVE_RENT_LIST,
        RENT
    }

    enum ActionResult {
        PENDING,
        APPROVED,
        FAILED
    }

    // Arranged the variables
    struct Property {
        uint256 maxHolderQuantity;
        uint256 rent_price;
        uint256 id;
        uint256 price;
        uint256 leftAmount;
        uint256 _actCount;
        string uri;
        bool madeAddAction;
        address maxHolder;
        address[] owners;
        mapping(address => uint256) ownerQuantity;
    }

    struct RentInfo {
        address renter;
        uint256 rent_started;
        uint256 rent_ended;
    }

    struct Activity {
        uint256 amount;
        uint256 propertyIndex;
        uint256 duration;
        address from;
        ActionType _type;
        ActionResult result;
    }

    struct ActualAndIntended {
        uint actualPrice;
        uint intendedprice;
        address payable Caller;
        bool madeRequest;
        bool approved;
        bool added;
    }
    // The request can be only called once by a address
    //If  madeRequest is true and approved is  false  and finished is true then it was rejected
    // If three of them are true  true only it is accepted

    mapping(uint => mapping(address => ActualAndIntended))
        private actualIntendeContainer;
    uint256 public counts = 0;
    uint256 public actCounts = 0;
    mapping(uint256 => Property) public properties;
    mapping(uint256 => RentInfo) public rentinfos;
    mapping(uint256 => bool) public inRentList;
    mapping(uint256 => Activity) public activities;
    mapping(uint256 => address[]) public actualIntendeAddressContainer;

    // You can change modifier for a private function Also.

    modifier onlyOwner() {
        require(
            owner == msg.sender,
            "The caller should be the same as owner address"
        );
        _;
    }

    modifier onlyGoverment() {
        require(
            government == msg.sender,
            "The caller should be the same as goverment address"
        );
        _;
    }

    event PurchaseProperty(
        uint256 id,
        address buyer,
        uint256 payAmount,
        uint256 timeline
    );

    constructor(address _addr) {
        owner = msg.sender;
        government = _addr;
    }

    function postProperty(
        //CHnage memory to calldata
        string calldata _uri,
        uint256 _price
    ) public onlyOwner returns (uint256 id) {
        counts++;
        properties[counts].id = counts;
        properties[counts].uri = _uri;
        properties[counts].price = _price;
        properties[counts].leftAmount = _price;
        properties[counts].maxHolder = address(0);
        properties[counts].maxHolderQuantity = 0;

        return counts;
    }

    function buyProperty(
        uint256 propertyId,
        address from,
        uint256 amount
    ) internal {
        require(propertyId > 0, "The id must be greater than 0");
        require(propertyId <= counts, "Invalid Id");
        CheckForLeftAmount(propertyId, amount);
        properties[propertyId].owners.push(from);
        properties[propertyId].ownerQuantity[from] += amount;
        properties[propertyId].leftAmount -= amount;
        if (
            properties[propertyId].maxHolderQuantity <
            properties[propertyId].ownerQuantity[from]
        ) {
            properties[propertyId].maxHolder = from;
            properties[propertyId].maxHolderQuantity = properties[propertyId]
                .ownerQuantity[from];
        }
    }

    // Chnaged the function to private

    function postRentList(uint256 _id, address from, uint256 _price) private {
        require(
            properties[_id].maxHolder == from,
            "The rent manager should be max holder of this property"
        );
        require(
            properties[_id].leftAmount == 0,
            "The property is not fully sold out"
        );
        inRentList[_id] = true;
        properties[_id].rent_price = _price;
    }

    // Chnaged the function to private
    function removeRent(uint256 _id, address from) private {
        require(
            properties[_id].maxHolder == from,
            "The rent manager should be max holder of this property"
        );
        require(
            inRentList[_id] == true,
            "This property is not listed on Rent List"
        );
        inRentList[_id] = false;
        rentinfos[_id].renter = address(0);
        rentinfos[_id].rent_started = 0;
        rentinfos[_id].rent_ended = 0;
    }

    function rentProperty(
        uint256 _id,
        address from,
        uint256 amount,
        uint256 duration
    ) external payable {
        require(
            inRentList[_id] == true,
            "The property is not listed on RentList"
        );
        require(
            rentinfos[_id].renter == address(0),
            "The property already rented!"
        );
        uint256 value = (properties[_id].rent_price * duration) / 30 days;
        require(amount >= value, "Insufficient Value");
        if (amount - value > 0) {
            payable(from).transfer(amount - value);
        }
        rentinfos[_id].renter = from;
        rentinfos[_id].rent_started = block.timestamp;
        rentinfos[_id].rent_ended = block.timestamp + duration * 1 days;
    }

    function ownerWithdraw() public payable onlyOwner {
        payable(msg.sender).transfer(address(this).balance);
    }

    // Removed _sender argument
    function addAction(
        ActionType _type,
        uint256 _amount,
        uint256 _index,
        uint256 _duration
    ) public payable {
        require(
            !properties[_index].madeAddAction,
            "Already RunAction by someone"
        );
        if (_type != ActionType.ADD_RENT_LIST) {
            require(_amount == msg.value, "Invalid Amount Input");
        }
        require(_index <= counts && _index > 0, "Invalid Property Id");
        if (_type == ActionType.BUY) {
            CheckForLeftAmount(_index, _amount);
        }
        if (_type == ActionType.ADD_RENT_LIST) {
            require(
                properties[_index].leftAmount == 0,
                "The property is not fully sold out"
            );
            require(
                properties[_index].maxHolder == msg.sender,
                "The rent manager should be max holder of this property"
            );
        }
        updateActivity(_type, _index, _amount, _duration, msg.sender);
        actCounts++;
    }

    function updateActivity(
        ActionType _type,
        uint _index,
        uint _amount,
        uint _duration,
        address _addr
    ) private {
        activities[actCounts]._type = _type;
        activities[actCounts].from = _addr;
        activities[actCounts].amount = _amount;
        activities[actCounts].propertyIndex = _index;
        activities[actCounts].duration = _duration;
        activities[actCounts].result = ActionResult.PENDING;
        properties[_index]._actCount = actCounts;
        properties[_index].madeAddAction = true;
    }

    function NotifyTheowner(uint index, uint _actualPrice) external payable {
        require(_actualPrice > msg.value);
        require(index <= counts, "Invalid Action Number");
        ActualAndIntended storage indv = actualIntendeContainer[index][
            msg.sender
        ];
        require(!indv.madeRequest, "Already madeRequest");
        indv.Caller = payable(msg.sender);
        indv.actualPrice = _actualPrice;
        indv.intendedprice = msg.value;
        indv.madeRequest = true;
        if (!indv.added) {
            actualIntendeAddressContainer[index].push(msg.sender);
        }
        indv.added = true;
    }

    function SettleTheContract(
        uint index,
        address _addr,
        bool approve
    ) external onlyOwner {
        require(index <= counts, "Invalid Action Number");

        ActualAndIntended memory indv = actualIntendeContainer[index][_addr];
        require(indv.madeRequest, "Request havenot been made");
        if (approve) {
            require(
                !properties[index].madeAddAction,
                "Already RunAction by someone"
            );
            CheckForLeftAmount(index, indv.actualPrice);
            updateActivity(ActionType.BUY, index, indv.actualPrice, 0, _addr);
            actualIntendeContainer[index][_addr].approved = true;
        } else {
            indv.Caller.transfer(indv.intendedprice);
        }
        actualIntendeContainer[index][_addr].madeRequest = false;
    }

    //Changed public to external
    function runAction(uint256 _index) external onlyGoverment {
        require(_index <= counts, "Invalid Action Number");
        require(properties[_index].madeAddAction, "No made Any Action");
        uint _actCounts = properties[_index]._actCount;
        // Chnaged memory for storage
        Activity memory action = activities[_actCounts];
        if (action._type == ActionType.BUY) {
            buyProperty(action.propertyIndex, action.from, action.amount);
        } else if (action._type == ActionType.ADD_RENT_LIST) {
            postRentList(action.propertyIndex, action.from, action.amount);
        } else if (action._type == ActionType.REMOVE_RENT_LIST) {
            removeRent(action.propertyIndex, action.from);
        }
        activities[_index].result = ActionResult.APPROVED;
        properties[_index].madeAddAction = false;
    }

    ////Changed public to external
    function deleteAction(uint256 _index) external onlyGoverment {
        require(_index <= counts, "Invalid Action Number");
        // Chnaged memory for storage
        uint256 _actCount = properties[_index]._actCount;
        Activity memory action = activities[_actCount];
        if (action._type == ActionType.BUY) {
            payable(action.from).transfer(action.amount);
        } else if (action._type == ActionType.RENT) {
            payable(action.from).transfer(action.amount);
        }
        activities[_actCount].result = ActionResult.FAILED;
        properties[_index].madeAddAction = false;
    }

    function setGovernment(address _addr) external onlyGoverment {
        government = _addr;
    }

    //Private functiionas modifier

    function CheckForLeftAmount(uint index, uint amount) private view {
        uint256 left = properties[index].leftAmount;
        require(
            left >= amount && amount > 0,
            "The left amount is insufficient"
        );
    }

    //  mapping(uint256 => address[]) public actualIntendeAddressContainer;
    function GetAddress(uint index) external view returns (address[] memory) {
        address[] memory data = actualIntendeAddressContainer[index];
        return data;
    }

    function ActualAndIntendedData(
        uint index,
        address _addr
    )
        external
        view
        returns (
            uint actualPrice,
            uint intendedPrice,
            address Caller,
            bool madeRequest,
            bool approved
        )
    {
        ActualAndIntended memory indv = actualIntendeContainer[index][_addr];
        return (
            indv.actualPrice,
            indv.intendedprice,
            indv.Caller,
            indv.madeRequest,
            indv.approved
        );
    }

    function getBalance(
        uint index,
        address _addr
    ) external view returns (uint) {
        return properties[index].ownerQuantity[_addr];
    }
}
