## library of functions for calculating the max naive bayes probability
## for a given document on a set of topics

# categories: countries, animals, history curriculum (inc. famous historial people, ancient societies), geography curriculum, famous scientists

import tokenizer
import documenter
import wikiScraper
import EBScraper

def getWordFreq(word, tClass):
    if word in tClass:
        return tClass[word]
    else:
        return 0

def calcWordProb(word, wordFreq, tClass, tClassSize, vocabSize):
    # (count(word in tClass) + 1)/(count(all words in tClass) + vocabSize)
    # with plus one smoothing
    # for efficiency purposes I pass in the number of times a given word is present in the document
    # and raise the probability to that power, this is the same as computing the n occurances of a word sepeately and multiplying them
    prob = ((float(getWordFreq(word, tClass)) + 1.0)/(tClassSize + vocabSize)) ** wordFreq
    print "Word: " + word + " | " + "Word Freq (Doc): " + str(wordFreq) + " | " + "Word Freq (Class): " + str(float(getWordFreq(word, tClass))) + " | " + "Prob: " + str(prob)
    return prob

def calcClassSize(tClass):
    count = 0
    for word, freq in tClass.iteritems():
        count += freq
    return count

def calcClassProb(doc, tClass, vocabSize):
    prob = 1.0
    tClassSize = calcClassSize(tClass)
    
    print "-" * 50
    print "Class Size: " + str(tClassSize)
    print "Vocab Size: " + str(vocabSize)
    print "-" * 50

    for word, freq in doc.iteritems():
        prob = prob * (calcWordProb(word, freq, tClass, tClassSize, vocabSize))
    return prob

def docSum(*docs):
    ## takes multiple documents in a dictionary format and returns a single dict the sum of the docs
    docSum = {}
    for doc in docs:
        for word, freq in doc.iteritems():
            if word in docSum:
                docSum[word] = docSum[word] + freq
            else:
                docSum[word] = freq
    return docSum

def maxClass(doc, tClasses, vocabSize):
    maxProb = 0.0
    maxClass = None
    for tClassName, tClass in tClasses.iteritems():
        prob = calcClassProb(doc, tClass, vocabSize)
        print str(prob) + " | " + tClassName
        if(prob > maxProb):
            maxProb = prob
            maxClass = tClassName
    return (maxClass, maxProb)

def calcVocabSize(docs):
    vocab = []
    for className, doc in docs.iteritems():
        for word, freq in doc.iteritems():
            vocab.append(word)
    return len(set(vocab))

def combineDocs(classifiedDocs):
    ## assuming a list of ordered tuples of the form (document, tClass)
    ## with both document and tClass represented as strings
    combined = {}
    for doc, tClass in classifiedDocs:
        if tClass in combined:
            combined[tClass] = docSum(doc, combined[tClass])
        else:
            combined[tClass] = doc
    return combined



# useful for testing without access to the server
# d1 = documenter.document(wikiScraper.getText("https://en.wikipedia.org/wiki/Albert_Einstein", False))
# d2 = documenter.document(wikiScraper.getText("https://en.wikipedia.org/wiki/Marie_Curie", False))
# d3 = documenter.document(wikiScraper.getText("https://en.wikipedia.org/wiki/Isaac_Newton", False))
# d4 = documenter.document(wikiScraper.getText("https://en.wikipedia.org/wiki/Charles_Darwin", False))

# d5 = documenter.document(wikiScraper.getText("https://simple.wikipedia.org/wiki/Albert_Einstein", False))
# d6 = documenter.document(wikiScraper.getText("https://simple.wikipedia.org/wiki/Marie_Curie", False))
# d7 = documenter.document(wikiScraper.getText("https://simple.wikipedia.org/wiki/Isaac_Newton", False))
# d8 = documenter.document(wikiScraper.getText("https://simple.wikipedia.org/wiki/Charles_Darwin", False))

# d9 = documenter.document(EBScraper.getText("http://kids.britannica.com/comptons/article-9274135/Albert-Einstein", False))
# d10 = documenter.document(EBScraper.getText("http://kids.britannica.com/comptons/article-9320778/Marie-Curie", False))
# d11 = documenter.document(EBScraper.getText("http://kids.britannica.com/comptons/article-9276067/Isaac-Newton", False))
# d12 = documenter.document(EBScraper.getText("http://kids.britannica.com/comptons/article-9273921/Charles-Darwin", False))


# classifiedDocs = [(d1, "Einstein"), (d2, "Curie"), (d3, "Newton"), (d4, "Darwin"),
# (d5, "Einstein"), (d6, "Curie"), (d7, "Newton"), (d8, "Darwin"),
# (d9, "Einstein"), (d10, "Curie"), (d11, "Newton"), (d12, "Darwin")]
# combinedDocs = combineDocs(classifiedDocs)


# s = "wrote the origin of species" # darwin
# # s = "her work with her husband on radioactivity was groundbreaking" # curie
# # s = "a reclusive mathematician who invented calculus and discovered gravity" # newton
# # s = "a german physicist" # einstein

# maxClass(documenter.document(s),
#     combinedDocs,
#     calcVocabSize(combinedDocs))








