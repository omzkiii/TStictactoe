post() {
    curl -H 'Content-Type: application/json' \
        -d '{"coor": ['$1','$2']}' \
        -X POST \
        localhost:3000/click
}

post 0 0
post 0 2
post 1 1
post 2 0
post 2 2
