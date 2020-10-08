require([
    './elasticlunr.min.js',
    'text!documents.json',
  ], function (elasticlunr, data) {
    var index = elasticlunr(function () {
        this.addField('name');
        this.addField('date');
        this.setRef('text');
    });
    // create JSON of the documents (the pages metadata)
    var docs = JSON.parse(data).documents;
    // loop through the array of pages and index them in browser    
    docs.forEach(function (doc) {
        index.addDoc(doc)
    }, this);
    // a quick manual search to test
    var res = index.search("headsupp");
    console.log(res);
  })