
# this is deployed in render 
   https://irctcticketingsystem.onrender.com

   to test this backend service check end of this file
  

# assignment

- Implement JWT Authentication for User Authentication
- API key Authentication for the Admin Site (Add header X-IRCTC-API-KEY-SECRET in the All admin API's)
- Handles race conditions while bookingIf more than 1 users simultaneously try to book seats, only either one of the users should be able to book (By adding database lock)
- Focused on code quality and vaidation

# Tech stack

- expressjs,nodejs,prisma,postgresql,zod

## Steps To Setup Project

First clone the github repository

 - npm i or whatever package manager u r using
 - example .env
 
```bash
  DATABASE_URL="postgresql://urpostgresqlstring"
  JWT_SECRET="anysecret"
  ADMIN_API_KEY="password"
```

# API endpoints
 
 ```bash
 post /api/auth/register
 post /api/auth/login
 post /api/addtrain
 get  /api/getalltrains
 post /api/bookticket
 get  /api/booking/:id
 ```

## Demo
![Screenshot 2024-12-07 004224](https://github.com/user-attachments/assets/b38c349a-e6e3-4f9e-90a7-913d91535e05)

![Screenshot 2024-12-07 004153](https://github.com/user-attachments/assets/dd05954a-9b40-4301-b037-d771639efc82)

![Screenshot 2024-12-07 004041](https://github.com/user-attachments/assets/c1c7d0c1-be30-4013-91de-14cf46009cf9)

![Screenshot 2024-12-07 025240](https://github.com/user-attachments/assets/d065ac9f-86f4-4268-b4c5-9a648d03b32e)

![Screenshot 2024-12-07 030223](https://github.com/user-attachments/assets/b023197b-0db5-4815-a2d1-c694b74c7878)

![Screenshot 2024-12-07 030751](https://github.com/user-attachments/assets/832f8e88-e2c2-4c55-acea-27ce8380939a)

## Running Tests

To run tests, run the following command

1. register API - body 
    ```bash
    {
      "name": "anyname",
      "email": "johnoe223@example.com",
      "password":"securePassword123",
    } 
    ```
  API- https://irctcticketingsystem.onrender.com/api/auth/register

2. login API - body

  ```bash
    {
      
      "email": "johnoe223@example.com",
      "password":"securePassword123",
    } 
  ```
  API- https://irctcticketingsystem.onrender.com/api/auth/login

3.  Add a New Train 

 header - x-api-key : onlyaccessedbyadmin 
 body 

  ```bash      
    {
      "name": "Night Owl2",
      "source": "mumbai",
      "destination": "delhi",
      "departureTime": "2024-12-08T20:00:00Z",
      "arrivalTime": "2024-12-09T08:00:00Z",
      "totalSeats": 420
    }
  ```

  API- https://irctcticketingsystem.onrender.com/api/addtrain

4. Get Seat Availability

  header-   
  ```bash 
   authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NywiaWF0IjoxNzMzNTA1NDcyLCJleHAiOjE3MzYwOTc0NzJ9.90PUfWH_IsXqVWcqVCh6MclrN_TaT9Vlln9EydKgEDc
  ``` 
 
  ```bash      
    http://localhost:3000/api/getalltrains?source=Tokyo&destination=Osaka
    
  ```
  API- https://irctcticketingsystem.onrender.com/api/getalltrains

5. Book a Seat

  header-   
  ```bash 
   authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NywiaWF0IjoxNzMzNTA1NDcyLCJleHAiOjE3MzYwOTc0NzJ9.90PUfWH_IsXqVWcqVCh6MclrN_TaT9Vlln9EydKgEDc
  ```
body-
 ```bash      
  {
        "trainId": 3,
    "passengerName": "Alice Johnson",
    "seatsBooked":2
  }
```
API : https://irctcticketingsystem.onrender.com/api/bookticket

6. Get Specific Booking Details

```bash 
   authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NywiaWF0IjoxNzMzNTA1NDcyLCJleHAiOjE3MzYwOTc0NzJ9.90PUfWH_IsXqVWcqVCh6MclrN_TaT9Vlln9EydKgEDc
  ```

API: https://irctcticketingsystem.onrender.com/api/booking/1






 
