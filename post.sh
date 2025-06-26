curl -H 'Content-Type: application/json' \
    -d '{"coor": ['$1','$2']}' \
    -X POST \
    localhost:3000/click
