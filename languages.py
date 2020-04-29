import json
import glob

LANGUAGES = []

for file in glob.glob("public/translations/*-*.json"):
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


with open('public/translations/translations.json', 'w+') as f:
    dump = json.dumps(LANGUAGES, indent=2)
    f.write(dump)
