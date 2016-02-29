## library of functions useful for web scraping
# -*- coding: utf-8 -*-

from bs4 import BeautifulSoup
import requests
import html2text

def soupToText(soupedTag):
    ## BeautifulSoup has a problem with the .text method that gets rid of
    ## crucial whitespace in a string, this function can be called with the
    ## tag in question and will output the correct text
    h = html2text.HTML2Text()
    h.ignore_links = False
    return h.handle(soupedTag)

def getHTML(url, https):
    # returns the raw HTML of the requested URL
    r = requests.get(url, verify=https)
    if(r.status_code != 200):
        return -1
    else:
        return r.content

def HTMLToSoup(html):
    # returns the BeautifulSoup soup of some raw HTML
    return BeautifulSoup(html, "lxml")

def getSoup(url, https):
    # returns the BeautifulSoup soup of a URL to be fetched
    html = getHTML(url, https)
    if(html == -1):
        return -1 # error
    else:
        return HTMLToSoup(html)