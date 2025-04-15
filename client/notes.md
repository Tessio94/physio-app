## UI

- prepraviti kod hover-a priko suradnje (prvi put nastane flick)
- dodaj cjenik
- klikom na radnika pogledaj više ( i onda tamo njegove usluge )
- add transition to blur i na liste koje iskaču u book-now

## SERVER

Primjer response-a sa ritual.hr
https://api.barbershop-ritual.hr/employees/first-available/availability?minDate=2025-04-14&maxDate=2025-04-27&serviceId=0d78e3e6-890e-453e-af8f-d9dc8bf43e09
{
"status": 200,
"message": "Ok",
"payload": [
{
"availableTimes": {
"2025-04-14": [],
"2025-04-15": [],
"2025-04-16": [],
"2025-04-17": [],
"2025-04-18": [
"08:00",
"12:30"
],
"2025-04-19": []
},
"employeeId": "76b7cdf8-373d-421d-90de-46227cd253c6"
}
],
"errors": {}
}

## DATABASE

1. user can make a booking for a physiotherapy service (when they book an appointment, they can specify the date, the therapist, the service, the service duration and consequently service price )
