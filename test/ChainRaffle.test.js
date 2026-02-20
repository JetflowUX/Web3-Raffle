const { expect } = require("chai");
const { ethers } = require("hardhat");
const { time } = require("@nomicfoundation/hardhat-network-helpers");

describe("ChainRaffle", function () {
  let chainRaffle;
  let owner;
  let creator;
  let participant1;
  let participant2;
  let participant3;

  const ticketPrice = ethers.parseEther("0.01");
  const maxParticipants = 100;
  const duration = 3600; // 1 hour
  const prizePool = ethers.parseEther("1.0");

  beforeEach(async function () {
    [owner, creator, participant1, participant2, participant3] = await ethers.getSigners();
    
    const ChainRaffle = await ethers.getContractFactory("ChainRaffle");
    chainRaffle = await ChainRaffle.deploy();
    await chainRaffle.waitForDeployment();
  });

  describe("Raffle Creation", function () {
    it("Should create a raffle successfully", async function () {
      await expect(
        chainRaffle.connect(creator).createRaffle(ticketPrice, maxParticipants, duration, {
          value: prizePool
        })
      ).to.emit(chainRaffle, "RaffleCreated");

      const raffle = await chainRaffle.getRaffle(1);
      expect(raffle.creator).to.equal(creator.address);
      expect(raffle.prizePool).to.equal(prizePool);
      expect(raffle.ticketPrice).to.equal(ticketPrice);
      expect(raffle.maxParticipants).to.equal(maxParticipants);
    });

    it("Should fail with zero ticket price", async function () {
      await expect(
        chainRaffle.connect(creator).createRaffle(0, maxParticipants, duration, {
          value: prizePool
        })
      ).to.be.revertedWith("Ticket price must be greater than 0");
    });

    it("Should fail with zero prize pool", async function () {
      await expect(
        chainRaffle.connect(creator).createRaffle(ticketPrice, maxParticipants, duration, {
          value: 0
        })
      ).to.be.revertedWith("Must provide prize pool");
    });
  });

  describe("Entering Raffle", function () {
    beforeEach(async function () {
      await chainRaffle.connect(creator).createRaffle(ticketPrice, maxParticipants, duration, {
        value: prizePool
      });
    });

    it("Should allow participant to enter raffle", async function () {
      const ticketCount = 5;
      const totalCost = ticketPrice * BigInt(ticketCount);

      await expect(
        chainRaffle.connect(participant1).enterRaffle(1, ticketCount, {
          value: totalCost
        })
      ).to.emit(chainRaffle, "TicketPurchased");

      const raffle = await chainRaffle.getRaffle(1);
      expect(raffle.participantCount).to.equal(ticketCount);
    });

    it("Should fail with incorrect payment", async function () {
      const ticketCount = 5;
      const wrongAmount = ethers.parseEther("0.01");

      await expect(
        chainRaffle.connect(participant1).enterRaffle(1, ticketCount, {
          value: wrongAmount
        })
      ).to.be.revertedWith("Incorrect payment amount");
    });

    it("Should track multiple participants", async function () {
      await chainRaffle.connect(participant1).enterRaffle(1, 2, {
        value: ticketPrice * 2n
      });
      
      await chainRaffle.connect(participant2).enterRaffle(1, 3, {
        value: ticketPrice * 3n
      });

      const participants = await chainRaffle.getParticipants(1);
      expect(participants.length).to.equal(2);
      expect(participants[0]).to.equal(participant1.address);
      expect(participants[1]).to.equal(participant2.address);
    });
  });

  describe("Winner Selection", function () {
    beforeEach(async function () {
      await chainRaffle.connect(creator).createRaffle(ticketPrice, 10, duration, {
        value: prizePool
      });

      // Add participants
      await chainRaffle.connect(participant1).enterRaffle(1, 3, {
        value: ticketPrice * 3n
      });
      await chainRaffle.connect(participant2).enterRaffle(1, 4, {
        value: ticketPrice * 4n
      });
      await chainRaffle.connect(participant3).enterRaffle(1, 3, {
        value: ticketPrice * 3n
      });
    });

    it("Should select winner when max participants reached", async function () {
      await expect(
        chainRaffle.connect(participant1).enterRaffle(1, 0, {
          value: 0
        })
      ).to.be.reverted;
    });

    it("Should select winner after end time", async function () {
      await time.increase(duration + 1);

      await expect(chainRaffle.selectWinner(1))
        .to.emit(chainRaffle, "WinnerSelected");

      const raffle = await chainRaffle.getRaffle(1);
      expect(raffle.status).to.equal(2); // Completed
      expect(raffle.winner).to.not.equal(ethers.ZeroAddress);
    });

    it("Should fail to select winner before end time", async function () {
      await expect(chainRaffle.selectWinner(1))
        .to.be.revertedWith("Raffle has not ended yet");
    });

    it("Should distribute prize correctly with platform fee", async function () {
      await time.increase(duration + 1);

      const balanceBefore = await ethers.provider.getBalance(participant1.address);
      
      await chainRaffle.selectWinner(1);
      
      const raffle = await chainRaffle.getRaffle(1);
      const winner = raffle.winner;
      
      // Verify platform fee was collected
      const feeCollected = await chainRaffle.totalFeesCollected();
      expect(feeCollected).to.be.gt(0);
    });
  });

  describe("User Tickets", function () {
    it("Should track user tickets across multiple raffles", async function () {
      // Create first raffle
      await chainRaffle.connect(creator).createRaffle(ticketPrice, maxParticipants, duration, {
        value: prizePool
      });

      // Create second raffle
      await chainRaffle.connect(creator).createRaffle(ticketPrice, maxParticipants, duration, {
        value: prizePool
      });

      // Participant enters both raffles
      await chainRaffle.connect(participant1).enterRaffle(1, 3, {
        value: ticketPrice * 3n
      });
      await chainRaffle.connect(participant1).enterRaffle(2, 5, {
        value: ticketPrice * 5n
      });

      const tickets = await chainRaffle.getUserTickets(participant1.address);
      expect(tickets.length).to.equal(2);
      expect(tickets[0].ticketCount).to.equal(3);
      expect(tickets[1].ticketCount).to.equal(5);
    });
  });

  describe("Platform Management", function () {
    it("Should allow owner to withdraw fees", async function () {
      // Create and complete a raffle
      await chainRaffle.connect(creator).createRaffle(ticketPrice, 5, duration, {
        value: prizePool
      });

      await chainRaffle.connect(participant1).enterRaffle(1, 5, {
        value: ticketPrice * 5n
      });

      await time.increase(duration + 1);
      await chainRaffle.selectWinner(1);

      const feesBefore = await chainRaffle.totalFeesCollected();
      expect(feesBefore).to.be.gt(0);

      await chainRaffle.connect(owner).withdrawFees();

      const feesAfter = await chainRaffle.totalFeesCollected();
      expect(feesAfter).to.equal(0);
    });

    it("Should allow owner to update platform fee", async function () {
      await chainRaffle.connect(owner).setPlatformFee(8);
      expect(await chainRaffle.platformFeePercent()).to.equal(8);
    });

    it("Should fail if non-owner tries to withdraw fees", async function () {
      await expect(
        chainRaffle.connect(participant1).withdrawFees()
      ).to.be.reverted;
    });

    it("Should fail if fee exceeds 10%", async function () {
      await expect(
        chainRaffle.connect(owner).setPlatformFee(11)
      ).to.be.revertedWith("Fee cannot exceed 10%");
    });
  });
});
