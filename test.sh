# curl -c cookie.txt -b cookie.txt -d '{"coor": [2, 2], "player": 1}' -H 'Content-Type: application/json' localhost:3000/move

curl -c cookie.txt -b cookie.txt localhost:3000
post() {
    curl -c cookie.txt -b cookie.txt \
        -d '{"coor": ['$1', '$2']}' \
        -X POST \
        -H 'Content-Type: application/json' \
        localhost:3000/move
}

post 0 0
post 0 2
post 1 1
post 2 0
post 2 2
