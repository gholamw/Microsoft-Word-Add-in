from nltk.tokenize import word_tokenize
import string
punctuations = list(string.punctuation)

def tokenize(s):
	return [i.lower() for i in word_tokenize(s) if i not in punctuations] ## split into words and remove punctuation

def wordFreqs(wordList):
	d = {}
	for word in wordList:
		if word in d:
			d[word] = (d[word] + 1)
		else:
			d[word] = 1
	return d