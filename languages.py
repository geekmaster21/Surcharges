from operator import itemgetter

import json
import glob

LANGUAGES = []
dir_translations = "src/public/translations"

langs = glob.glob("{dir_translations}/*-*.json")
langs.append("{dir_translations}/en.json")

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

with open('{dir_translations}/list.json', 'w+') as f:
    dump = json.dumps(LANGUAGES, indent=1)
    f.write(dump)
