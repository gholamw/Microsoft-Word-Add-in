## library of functions that can scrape parts of a Wikipedia web page
## useful for testing, should use authorised methods of Wiki scraping in full productions

from scraper import *

def getText(url, https):
	## delete this!
	## just a function to test some functionality
	soup = getSoup(url, https)
	soup = soup.find("div", {"id":"mw-content-text"})
	
	text = ""
	paragraphs = soup.findAll("p")
	for p in paragraphs:
		text += " " + p.get_text()
	return text