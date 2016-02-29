## stop word removal

from nltk.corpus import stopwords

stop = stopwords.words('english')

keep = [u'he', u'him', u'his', u'himself', u'she', u'her', 
u'hers', u'herself', u'it', u'its', u'itself', 
u'they', u'them', u'their', u'theirs', u'themselves']

stop = [word for word in stop if word not in keep]

def removeStopWords(wordList):
	return [word for word in wordList if word not in stop]