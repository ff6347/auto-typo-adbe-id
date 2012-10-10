#!/bin/sh
#create list with the first 5 lines of all scripts
touch scriptlist.txt
for item in *;
do
	echo "${item}" >> scriptlist.txt;
	head -5 "${item}" >> scriptlist.txt;
done