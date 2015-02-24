import requests
import urllib

r = requests.get('http://sidsethupathi.com/imdb.json')

movies = r.json()


for movie in movies:
	urllib.urlretrieve(movie['poster'], movie['imdbID'] + ".jpg")
