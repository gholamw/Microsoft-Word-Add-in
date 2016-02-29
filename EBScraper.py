## scrapes Encyclopedia Britannica pages and returns their content as a string

from scraper import *

def getText(url, https):
	## delete this!
	## just a function to test some functionality
	soup = getSoup(url, https)
	soup = soup.find("div", {"class":"articleBody"})
	
	text = ""
	paragraphs = soup.findAll("span", {"class":"artcopy"})
	for p in paragraphs:
		text += " " + p.get_text()
	return text