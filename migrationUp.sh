export GOOSE_DRIVER=postgres
export GOOSE_DBSTRING="host=localhost user=postgres dbname=book password=secret sslmode=disable"
cd migrations && goose up