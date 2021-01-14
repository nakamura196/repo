from bs4 import BeautifulSoup
import json

def getDate(entry):
    dates = entry.find("head").find_all("date")

    for date in dates:
        return date["when"]

def getPlaces(entry):
    places = entry.find_all("placeName")

    results = []

    for place in places:
        place_text = place.text
        if place_text not in results:
            results.append(place_text)

    return results

def getPersons(entry):
    tags = ["forename", "surname"]
    
    results = []

    for tag in tags:
        values = entry.find_all(tag)

        

        for value in values:
            text = value.text
            if text not in results:
                results.append(text)

    return results

soup = BeautifulSoup(open('data/DKB01_20210113.xml','r'), "xml")


entries = soup.find_all(type="diary-entry")

print(len(entries))

index = []

for entry in entries:

    head = entry.find("head")

    if head:

        item = {}

        title = entry.find("head").text

        title = title.replace("\n", "").strip()

        item["objectID"] = entry.get("xml:id")

        item["label"] = title

        item["sort"] = item["objectID"]

        index.append(item)

        date = getDate(entry)
        item["temporal"] = date

        places = getPlaces(entry)
        item["spatial"] = places

        persons = getPersons(entry)
        item["agential"] = persons

        item["description"] = entry.text

with open("data/index.json", 'w') as outfile:
    json.dump(index,  outfile, ensure_ascii=False,
            indent=4, sort_keys=True, separators=(',', ': '))
