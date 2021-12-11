# Backend deployed URL : https://siva-hall-booking.herokuapp.com/

Examples:

1. Create a room (POST)
    API endpoint :https://siva-hall-booking.herokuapp.com/rooms
  Body : {
    "name":"Room2 Non AC",
    "seats":2,
     "amenities":"['TV','Heater','Bed','Chair','Cupboard']",
     "price":150
  }
  Output: _ Id:61b3a0479fbb092524d8d5cb

2. Book a room (POST)
    API endpoint :https://siva-hall-booking.herokuapp.com/rooms/booking/:roomId
    RoomId: 
  Data : {
    "customerName": "customer 1",
    "date": "2021-12-11",
    "startTime": "2021-12-11 01:00 PM",
    "endTime": "2021-12-11 12:00 PM"
  }
  
  3. Get booked rooms (GET)
    API endpoint :https://siva-hall-booking.herokuapp.com/rooms
    Output: [
    {
        "customerName": "customer 1",
        "date": "2021-12-11T00:00:00.000Z",
        "startTime": "2021-12-11T07:30:00.000Z",
        "endTime": "2021-12-11T06:30:00.000Z",
        "roomName": "Room2 Non AC",
        "bookedStatus": "Booked"
    }
  ]
  
  4. Get customer data (GET)
    API endpoint :https://siva-hall-booking.herokuapp.com/rooms/customers
    Output:[
    {
        "customerName": "customer 1",
        "date": "2021-12-11T00:00:00.000Z",
        "startTime": "2021-12-11T07:30:00.000Z",
        "endTime": "2021-12-11T06:30:00.000Z",
        "roomName": "Room2 Non AC"
    }
]
  
    
  


