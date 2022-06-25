::: mermaid
sequenceDiagram
    participant member as Member
    participant app as App
    participant backend as Backend


    alt local_auth
        member ->> app: login(local)

        activate member
        activate app
    else OAuth
        member ->> app: login(oauth)
    end

    app ->> backend: POST /login
    activate backend
    backend -->>app: statusCode
  
    app ->>backend: GET /home
    backend -->>app: statusCode

    deactivate backend

    app ->> member: render()

    deactivate member
    deactivate app
:::