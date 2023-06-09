```mermaid
sequenceDiagram
    participant member as Member
    participant phone as Phone
    participant backend as Backend
    participant sensor as QR Sensor

    opt if not logged in
        member ->> phone: login(auth)

        activate member
        deactivate member
        activate phone

        phone ->> backend: POST /login

        activate backend

        backend -->> phone: statusCode
    end

    phone ->> backend: GET /qr-code
    backend -->> phone: statusCode
    backend -->> phone: qrCode

    phone ->> member: showQR()
    
    activate member
    deactivate phone

    member ->> sensor: show QR code

    activate sensor
    activate sensor

    sensor ->> sensor: read QR code
    
    deactivate sensor

    sensor ->> backend: POST /attendance
    backend -->> sensor: statusCode

    deactivate backend

    sensor ->> member: notify(message)

    deactivate sensor
    deactivate member
```