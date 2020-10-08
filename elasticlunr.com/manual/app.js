require([
  './jquery.js',
  './elasticlunr.min.js',
  'text!documents.json',
], function (_, elasticlunr, data) {
  var index = elasticlunr(function () {
    this.addField('text')
    this.addField('date')
    this.addField('url')
    this.setRef('name')
  });

  // create JSON of the documents (the pages metadata)
  var docs = JSON.parse(data).documents;
  // loop through the array of pages and index them in browser    
  docs.forEach(function (doc) {
    index.addDoc(doc)
  }, this);

  /**
   * Quick manual search to test with timing
   */
  var unitTestSearch = function () {
    console.time('search')
    var res = index.search("headsupp")
    console.timeEnd('search')
    console.log(res)
  }

  /**
   * Function to runder the search results to the page
   * @param {object} searchResults the results from search on the input query
   */
  var renderSearchResults = function (searchResults) {
    console.log(searchResults)
    $("#results-container").empty()
    searchResults.forEach(function (entry) {
      console.log(entry)
      $("#results-container").append(entry.ref+': '+entry.doc.url+'</br>')
    })
  }

  /**
   * handle keyup event on seach input box
   */
  $('#searchQuery').bind('keyup', function () {
    // store the contents of the input box in query variable
    var query = $(this).val()
    var results = null;
    results = index.search(query)
    // pass the results to render to page
    if (results.length > 0) {
      renderSearchResults(results)
    }  
  })

  /**
   * handle clear the results
   */
  $('#searchClear').bind('click', function () {
    $("#results-container").empty()
    $('input').val('')
  })
})