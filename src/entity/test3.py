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
from rdflib import URIRef, BNode, Literal, Graph
from rdflib.namespace import RDF, RDFS, FOAF, XSD
from rdflib import Namespace
import geohash2

all = Graph()

def addGeo(obj):
    lat = obj["lat"]
    ln = obj["long"]

    uri = "http://geohash.org/" + (geohash2.encode(lat, ln))

    subject = URIRef(uri)

    stmt = (subject, URIRef("http://schema.org/latitude"), Literal(lat))

    all.add(stmt)

    stmt = (subject, URIRef("http://schema.org/longitude"), Literal(ln))

    all.add(stmt)

    return subject

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

        subject = URIRef("https://nakamura196.github.io/repo/api/"+prefix+"/"+suffix)

        if prefix == "chname":
            stmt = (subject, RDF.type, URIRef("https://jpsearch.go.jp/term/type/Agent"))
            all.add(stmt)
        elif prefix == "time":
            stmt = (subject, RDF.type, URIRef("https://jpsearch.go.jp/term/type/Time"))
            all.add(stmt)
        elif prefix == "place":
            stmt = (subject, RDF.type, URIRef("https://jpsearch.go.jp/term/type/Place"))
            all.add(stmt)
        elif prefix == "event":
            stmt = (subject, RDF.type, URIRef("https://jpsearch.go.jp/term/type/Event"))
            all.add(stmt)
        elif prefix == "org":
            stmt = (subject, RDF.type, URIRef("https://jpsearch.go.jp/term/type/Organization"))
            all.add(stmt)
        elif prefix == "keyword":
            stmt = (subject, RDF.type, URIRef("https://jpsearch.go.jp/term/type/Keyword"))
            all.add(stmt)
        elif prefix == "type":
            stmt = (subject, RDF.type, URIRef("https://jpsearch.go.jp/term/type/Type"))
            all.add(stmt)

        ln = suffix

        opath = "data/test/"+ln+".json"

        if not os.path.exists(opath):
            continue

        with open(opath) as f:
            result = json.load(f)

            result = result["results"]["bindings"]

            print(result)

            if len(result) > 0:

                obj = result[0]

                label = obj["label"]["value"]

                stmt = (subject, RDFS.label, Literal(label))
                all.add(stmt)

                if "description" in obj:
                    stmt = (subject, URIRef("http://schema.org/description"), Literal(obj["description"]["value"]))
                    all.add(stmt)

                if "thumbnail" in obj:
                    stmt = (subject, URIRef("http://schema.org/image"), URIRef(obj["thumbnail"]["value"]))
                    all.add(stmt)

                stmt = (subject, URIRef("http://www.w3.org/2002/07/owl#sameAs"), URIRef(obj["s"]["value"]))
                all.add(stmt)

                if "point" in obj:
                    value = obj["point"]["value"].split(" ")
                    geoUri = addGeo({
                        "lat" : float(value[0]),
                        "long": float(value[1])
                    })
                    stmt = (subject, URIRef("http://schema.org/geo"), geoUri)

                    all.add(stmt)

            else:
                stmt = (subject, RDFS.label, Literal(ln))
                all.add(stmt)


path = "data/test2.json"

# all.parse(path, format='json-ld')
all.serialize(destination=path.replace(".json", ".rdf"), format='pretty-xml')