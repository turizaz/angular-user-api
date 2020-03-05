#!/bin/bash
set -e

POSTGRES="psql --username postgres"

$POSTGRES <<EOSQL
CREATE DATABASE postgres OWNER postgres;
EOSQL
