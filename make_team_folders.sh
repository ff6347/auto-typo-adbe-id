#!/bin/sh
# create a folders for auto typo id
mkdir gh_team
names=( PDXIII skaim FerdinandP ce0311 natael OliverMatelowski marche AnitaMei praktischend monkian adinaradke Flave coerv schlompf )
# loop names
for (( i = 0 ; i < ${#names[@]} ; i++ )) do
#echo ${names[$i]}
mkdir gh_team/${names[$i]}
echo "#Hello" > gh_team/${names[$i]}/README.md

done