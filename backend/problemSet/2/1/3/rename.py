import sys
from os import rename, listdir

files = listdir('.')

for name in files:
	if sys.argv[0].split("\\")[-1] == name:
		continue;


	print(name.split(')')[0])