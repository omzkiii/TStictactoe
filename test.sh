# SESSION=$(curl -i -s http://localhost:3000 | grep -Fi set-cookie | sed -E 's/Set-Cookie: ([^;]+);.*/\1/')
# curl -i -b $SESSION localhost:3000 && echo hello
curl -c cookie.txt -b cookie.txt localhost:3000
# curl -b cookie.txt localhost:3000
curl -c cookie.txt -b cookie.txt -d '{"coor": [2, 2], "player": 1}' -H 'Content-Type: application/json' localhost:3000/move
