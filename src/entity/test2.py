import shutil
import os
import json
import glob
import yaml
import sys
import urllib
import ssl
import csv
import time
import requests
import json
import csv

with open('data/test.csv', 'r') as f:
    reader = csv.reader(f)
    header = next(reader)  # ヘッダーを読み飛ばしたい時

    for row in reader:
        uri = row[0]

        print(uri)

        tmp = uri.split(":")
        prefix = tmp[0]
        suffix = tmp[1]

        ln = suffix

        opath = "data/test/"+ln+".json"
        
        if os.path.exists(opath) and prefix == "chname":
            continue

        url = """http://dbpedia.org/sparql?default-graph-uri=http://dbpedia.org&query=select distinct * where {?s owl:sameAs <http://ja.dbpedia.org/resource/"""+ln+"""> . 
optional { ?s rdfs:label ?label . filter(lang(?label) = "ja" )} 
optional { ?s rdfs:comment ?description  . filter(lang(?description) = "ja" )}
optional { ?s dbo:thumbnail ?thumbnail }
optional { ?s georss:point ?point }
 } LIMIT 10&format=json&timeout=30000&signal_void=on&signal_unconnected=on"""

        try:

            result = requests.get(url).json()

            with open(opath, 'w') as outfile:
                json.dump(result, outfile, ensure_ascii=False,
                    indent=4, sort_keys=True, separators=(',', ': '))

        except Exception as e:
            print(e)