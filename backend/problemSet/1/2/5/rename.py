import sys
from os import rename, listdir

files = listdir('.')

for name in files:
	if sys.argv[0].split("\\")[-1] == name:
		continue;

	print(name)
	if ')' not in name:
		continue
	re = name.split(')')[0]
	rename(name, re + '.json')
	#new_name = name.replace('json', '.json')
	#rename(name, new_name)