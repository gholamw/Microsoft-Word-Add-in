# a standardised algorithm for the transformation of strings to documents.
# should use this algorithm for all training and real world documents to maintain consistency
# standardised algoithm should allow easy adding and testing of new features e.g. stemming, stop word removal, etc.

import tokenizer
from stopwords import removeStopWords

def document(docString):
	tokens = tokenizer.tokenize(docString)
	tokens = removeStopWords(tokens)
	freqs = tokenizer.wordFreqs(tokens)
	return freqs