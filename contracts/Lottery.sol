pragma solidity 0.7.0;

contract Lottery {
  uint internal nTickets = 0;     // number of tickets
  uint internal ticket_price = 0; // ticket pice
  uint internal prize = 0;        // winner prize
  uint internal counter = 0;      // current ticket
  uint internal aTickets = 0;     // number of available tickets
  bool internal finished = true;
  address public owner;
  uint endDate;
  

  mapping (uint => address) internal players;     // players map
  mapping (address => bool) internal addresses;   // player address

  // Event that is called when the winner is found.
  event winner(uint indexed counter, address winner, string message);
  
  event drawException(string message);
  constructor() {
    owner = msg.sender;
  }

  modifier onlyOwner() {
    require(msg.sender == owner);
    _;
  }
  
 
  function startLottery(uint tickets, uint price, uint uptoDate) public payable onlyOwner{
      require(aTickets == 0 && nTickets == 0, "Previous Lottery should close before start new Lottery");
    require (price > 0 && tickets > 1,
    "Ticket Number should greater than 1 OR Price should greater than zero.");
    nTickets = tickets;
    ticket_price = price;
    aTickets = nTickets;
    prize = prize;
    finished = false;
    endDate = uptoDate;
  }
  
  
  // Function to buy a ticket
  function buyTicket() public payable {
      require (aTickets != 0 && msg.value == ticket_price && endDate > block.timestamp && !addresses[msg.sender], "Ticket Price should equal to the Sender value or Available Ticket should not equal to zero.");
    aTickets = aTickets - 1;
    players[++counter] = msg.sender;
    prize = prize + msg.value;
    addresses[msg.sender] = true;
  }
  
  
  function drawWinner() public onlyOwner{
       if (aTickets == 0 && !finished && endDate > block.timestamp) {
      endLottery();
    }else {
        emit drawException("Lottery is not completed yet or End Date is completed.");
        revert();
    }
  }
  
  
  // Return the current status
  function status() public view returns(uint, uint, uint, uint, uint) {
    return (nTickets, aTickets, ticket_price, prize, endDate);
  }

 
  // End the contract and to find a winner
  function endLottery() internal {
      if (!finished) {
        getWinner();
      }
      finished = true;
      prize = 0;
      nTickets = 0;
      aTickets = 0;
      ticket_price = 0;
      counter = 0;
      endDate = 0;
  }
  
  function random() private view returns (uint){
      return uint(keccak256(abi.encodePacked(block.difficulty, block.timestamp)));
  }

  // Generate the winner and transfer the prize to his address
  function getWinner() internal {
    uint index = random() % nTickets;
    address payable winnerAddr = address(uint160(players[index]));
    emit winner(index, winnerAddr, "The Lottery Winner found!!");
    msg.sender.transfer(prize * 10/100);
    winnerAddr.transfer(prize * 90/100);
  }
}