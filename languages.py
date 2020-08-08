from operator import itemgetter

import json
import glob

LANGUAGES = []

langs = glob.glob("src/public/translations/*-*.json")
langs.append("src/public/translations/en.json")

for file in langs:
    language = json.load(open(file))
    if 'languageInfo' not in language:
        continue

    code = file.split('/')[2].split('.')[0]
    data = {
        'code': code,
        'name': language['languageInfo']['name'],
        'emoji': language['languageInfo']['emoji']
    }
    LANGUAGES.append(data)

LANGUAGES = sorted(LANGUAGES, key=itemgetter('name'))

with open('src/public/translations/list.json', 'w+') as f:
    dump = json.dumps(LANGUAGES, indent=2)
    f.write(dump)
