from bs4 import BeautifulSoup
import json
import glob

def getDate(entry):
    dates = entry.find("head").find_all("date")
    
    '''
    if len(dates) > 1:
        print(dates)
    '''

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
    tags = ["persName"]
    
    results = []

    for tag in tags:
        values = entry.find_all(tag)

        for value in values:
            text = value.text
            if text not in results:
                results.append(text)

    return results

def getSort(entry):
    ids = entry.get("xml:id").split("-")
    return ids[0] + "-" + ids[1].zfill(4)

def getTitle(entry):
    title = entry.find("head").text
    return title.replace("\n", "").strip()

def getYearAndMonth(date):
    if not date:
        return None
    es = date.split("-")
    if len(es) < 2:
        return None
    return es[0] + "-" + es[1]

def getYear(date):
    if not date:
        return None
    es = date.split("-")
    return es[0]

def addYears(years, yearAndMonth):
    es = yearAndMonth.split("-")
    year = int(es[0])
    month = int(es[1])

    if year not in years:
        years[year] = {}

    monthes = years[year]
    if month not in monthes:
        monthes[month] = 0
    
    monthes[month] += 1

    return years

files = glob.glob("data/*.xml")

# files = ["data/DKB01_20210113.xml"]

titles = ["01 渋沢栄一伝記資料. 別巻第1 日記 (慶応4年-大正3年)", "02 渋沢栄一伝記資料. 別巻第2 日記 (大正4年-昭和5年), 集会日時通知表"]

years = {}

index = []

for j in range(len(files)):

    file = files[j]

    soup = BeautifulSoup(open(file,'r'), "xml")

    group = soup.find("group")

    texts = group.find_all("text")

    for text in texts:

        text_id = text.get("xml:id").replace("DKB", "").replace("m", "")

        front = text.find("front").find("head").text

        entries = text.find_all(type="diary-entry")

        for i in range(len(entries)):

            entry = entries[i]

            head = entry.find("head")

            if head:

                item = {}

                if len(index) < 10000:
                    index.append(item)

                item["objectID"] = entry.get("xml:id")

                item["label"] = getTitle(entry)
                
                # ソート項目
                item["sort"] = getSort(entry)

                date = getDate(entry)
                item["temporal"] = date

                yearAndMonth = getYearAndMonth(date)
                if yearAndMonth:
                    item["yearAndMonth"] = yearAndMonth

                    years = addYears(years, yearAndMonth)

                    

                year = getYear(date)
                if year:
                    item["year"] = year

                    item["date"] = {
                        "lvl0": year
                    }

                    if yearAndMonth:
                        item["date"]["lvl1"] = year + " > " + yearAndMonth

                        if yearAndMonth != date:
                            item["date"]["lvl2"] = year + " > " + yearAndMonth + " > " + date

                places = getPlaces(entry)
                item["spatial"] = places

                persons = getPersons(entry)
                item["agential"] = persons

                item["description"] = entry.text

                item["xml"] = str(entry)

                title = titles[j]
                title2 = text_id+" "+front

                item["category"] = {
                    "lvl0": title,
                    "lvl1": title + " > " + title2
                }

                

                if i > 0:
                    item["prev"] = entries[i-1].get("xml:id")

                if i != len(entries) - 1:
                    item["next"] = entries[i+1].get("xml:id")

print("index", len(index))

with open("data/index.json", 'w') as outfile:
    json.dump(index,  outfile, ensure_ascii=False,
            indent=4, sort_keys=True, separators=(',', ': '))

with open("../static/data/years.json", 'w') as outfile:
    json.dump(years,  outfile, ensure_ascii=False,
            indent=4, sort_keys=True, separators=(',', ': '))
