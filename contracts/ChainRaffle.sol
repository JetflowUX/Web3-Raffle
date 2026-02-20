// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

/**
 * @title ChainRaffle
 * @dev Decentralized raffle system supporting multiple concurrent raffles
 */
contract ChainRaffle is ReentrancyGuard, Ownable {
    using Counters for Counters.Counter;
    
    Counters.Counter private _raffleIds;
    
    enum RaffleStatus { Active, Drawing, Completed }
    
    struct Raffle {
        uint256 id;
        address creator;
        uint256 prizePool;
        uint256 ticketPrice;
        uint256 participantCount;
        uint256 maxParticipants;
        uint256 endTime;
        RaffleStatus status;
        address winner;
    }
    
    struct UserTicket {
        uint256 raffleId;
        uint256 ticketCount;
        RaffleStatus status;
        bool isWinner;
    }
    
    // Raffle ID => Raffle
    mapping(uint256 => Raffle) public raffles;
    
    // Raffle ID => array of participant addresses
    mapping(uint256 => address[]) public raffleParticipants;
    
    // Raffle ID => participant address => ticket count
    mapping(uint256 => mapping(address => uint256)) public userTickets;
    
    // User address => array of raffle IDs they participated in
    mapping(address => uint256[]) public userRaffles;
    
    uint256 public platformFeePercent = 5; // 5% platform fee
    uint256 public totalFeesCollected;
    
    event RaffleCreated(
        uint256 indexed raffleId,
        address indexed creator,
        uint256 prizePool,
        uint256 ticketPrice,
        uint256 maxParticipants,
        uint256 endTime
    );
    
    event TicketPurchased(
        uint256 indexed raffleId,
        address indexed participant,
        uint256 ticketCount,
        uint256 totalCost
    );
    
    event WinnerSelected(
        uint256 indexed raffleId,
        address indexed winner,
        uint256 prizeAmount
    );
    
    event PrizeWithdrawn(
        uint256 indexed raffleId,
        address indexed winner,
        uint256 amount
    );
    
    constructor() Ownable(msg.sender) {}
    
    /**
     * @dev Create a new raffle
     * @param _ticketPrice Price per ticket in wei
     * @param _maxParticipants Maximum number of participants
     * @param _duration Duration in seconds
     */
    function createRaffle(
        uint256 _ticketPrice,
        uint256 _maxParticipants,
        uint256 _duration
    ) external payable nonReentrant {
        require(_ticketPrice > 0, "Ticket price must be greater than 0");
        require(_maxParticipants > 0, "Max participants must be greater than 0");
        require(_duration >= 3600, "Duration must be at least 1 hour");
        require(msg.value > 0, "Must provide prize pool");
        
        _raffleIds.increment();
        uint256 raffleId = _raffleIds.current();
        
        raffles[raffleId] = Raffle({
            id: raffleId,
            creator: msg.sender,
            prizePool: msg.value,
            ticketPrice: _ticketPrice,
            participantCount: 0,
            maxParticipants: _maxParticipants,
            endTime: block.timestamp + _duration,
            status: RaffleStatus.Active,
            winner: address(0)
        });
        
        emit RaffleCreated(
            raffleId,
            msg.sender,
            msg.value,
            _ticketPrice,
            _maxParticipants,
            block.timestamp + _duration
        );
    }
    
    /**
     * @dev Enter a raffle by purchasing tickets
     * @param _raffleId ID of the raffle
     * @param _ticketCount Number of tickets to purchase
     */
    function enterRaffle(uint256 _raffleId, uint256 _ticketCount) 
        external 
        payable 
        nonReentrant 
    {
        Raffle storage raffle = raffles[_raffleId];
        
        require(raffle.id != 0, "Raffle does not exist");
        require(raffle.status == RaffleStatus.Active, "Raffle is not active");
        require(block.timestamp < raffle.endTime, "Raffle has ended");
        require(_ticketCount > 0, "Must purchase at least 1 ticket");
        require(
            raffle.participantCount + _ticketCount <= raffle.maxParticipants,
            "Exceeds max participants"
        );
        
        uint256 totalCost = raffle.ticketPrice * _ticketCount;
        require(msg.value == totalCost, "Incorrect payment amount");
        
        // Add user as participant if first time
        if (userTickets[_raffleId][msg.sender] == 0) {
            raffleParticipants[_raffleId].push(msg.sender);
            userRaffles[msg.sender].push(_raffleId);
        }
        
        userTickets[_raffleId][msg.sender] += _ticketCount;
        raffle.participantCount += _ticketCount;
        raffle.prizePool += msg.value;
        
        emit TicketPurchased(_raffleId, msg.sender, _ticketCount, totalCost);
        
        // Auto-select winner if max participants reached
        if (raffle.participantCount >= raffle.maxParticipants) {
            _selectWinner(_raffleId);
        }
    }
    
    /**
     * @dev Select winner for a raffle (can be called by anyone after end time)
     * @param _raffleId ID of the raffle
     */
    function selectWinner(uint256 _raffleId) external nonReentrant {
        Raffle storage raffle = raffles[_raffleId];
        
        require(raffle.id != 0, "Raffle does not exist");
        require(raffle.status == RaffleStatus.Active, "Raffle is not active");
        require(block.timestamp >= raffle.endTime, "Raffle has not ended yet");
        require(raffle.participantCount > 0, "No participants");
        
        _selectWinner(_raffleId);
    }
    
    /**
     * @dev Internal function to select winner
     */
    function _selectWinner(uint256 _raffleId) private {
        Raffle storage raffle = raffles[_raffleId];
        raffle.status = RaffleStatus.Drawing;
        
        // Generate pseudo-random number based on block data
        uint256 randomNumber = uint256(
            keccak256(
                abi.encodePacked(
                    block.timestamp,
                    block.prevrandao,
                    block.number,
                    raffleParticipants[_raffleId].length
                )
            )
        );
        
        // Build weighted array based on ticket counts
        address[] memory participants = raffleParticipants[_raffleId];
        uint256 totalTickets = raffle.participantCount;
        uint256 winningTicket = randomNumber % totalTickets;
        
        uint256 cumulativeTickets = 0;
        address winner;
        
        for (uint256 i = 0; i < participants.length; i++) {
            cumulativeTickets += userTickets[_raffleId][participants[i]];
            if (winningTicket < cumulativeTickets) {
                winner = participants[i];
                break;
            }
        }
        
        require(winner != address(0), "Failed to select winner");
        
        raffle.winner = winner;
        raffle.status = RaffleStatus.Completed;
        
        // Calculate platform fee
        uint256 platformFee = (raffle.prizePool * platformFeePercent) / 100;
        uint256 winnerPrize = raffle.prizePool - platformFee;
        
        totalFeesCollected += platformFee;
        
        // Transfer prize to winner
        (bool success, ) = payable(winner).call{value: winnerPrize}("");
        require(success, "Prize transfer failed");
        
        emit WinnerSelected(_raffleId, winner, winnerPrize);
    }
    
    /**
     * @dev Get all raffles
     */
    function getRaffles() external view returns (Raffle[] memory) {
        uint256 totalRaffles = _raffleIds.current();
        Raffle[] memory allRaffles = new Raffle[](totalRaffles);
        
        for (uint256 i = 1; i <= totalRaffles; i++) {
            allRaffles[i - 1] = raffles[i];
        }
        
        return allRaffles;
    }
    
    /**
     * @dev Get a specific raffle
     */
    function getRaffle(uint256 _raffleId) external view returns (Raffle memory) {
        require(raffles[_raffleId].id != 0, "Raffle does not exist");
        return raffles[_raffleId];
    }
    
    /**
     * @dev Get participants for a raffle
     */
    function getParticipants(uint256 _raffleId) external view returns (address[] memory) {
        return raffleParticipants[_raffleId];
    }
    
    /**
     * @dev Get user's tickets across all raffles
     */
    function getUserTickets(address _user) external view returns (UserTicket[] memory) {
        uint256[] memory raffleIds = userRaffles[_user];
        UserTicket[] memory tickets = new UserTicket[](raffleIds.length);
        
        for (uint256 i = 0; i < raffleIds.length; i++) {
            uint256 raffleId = raffleIds[i];
            Raffle memory raffle = raffles[raffleId];
            
            tickets[i] = UserTicket({
                raffleId: raffleId,
                ticketCount: userTickets[raffleId][_user],
                status: raffle.status,
                isWinner: raffle.winner == _user
            });
        }
        
        return tickets;
    }
    
    /**
     * @dev Withdraw collected platform fees (owner only)
     */
    function withdrawFees() external onlyOwner nonReentrant {
        uint256 amount = totalFeesCollected;
        require(amount > 0, "No fees to withdraw");
        
        totalFeesCollected = 0;
        
        (bool success, ) = payable(owner()).call{value: amount}("");
        require(success, "Withdrawal failed");
    }
    
    /**
     * @dev Update platform fee percentage (owner only)
     */
    function setPlatformFee(uint256 _feePercent) external onlyOwner {
        require(_feePercent <= 10, "Fee cannot exceed 10%");
        platformFeePercent = _feePercent;
    }
    
    /**
     * @dev Get total number of raffles created
     */
    function getTotalRaffles() external view returns (uint256) {
        return _raffleIds.current();
    }
    
    receive() external payable {}
}
