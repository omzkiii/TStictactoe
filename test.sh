curl -c cookie.txt -b cookie.txt localhost:3000
curl -c cookie.txt -b cookie.txt -d '{"coor": [2, 2], "player": 1}' -H 'Content-Type: application/json' localhost:3000/move
