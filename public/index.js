var suggestions = document.getElementById('suggestions');
var search = document.getElementById('search');

if (search !== null) {
  document.addEventListener('keydown', inputFocus);
}

function inputFocus(e) {
  if (e.ctrlKey && e.key === '/' ) {
    e.preventDefault();
    search.focus();
  }
  if (e.key === 'Escape' ) {
    search.blur();
    suggestions.classList.add('d-none');
  }
}

document.addEventListener('click', function(event) {

  var isClickInsideElement = suggestions.contains(event.target);

  if (!isClickInsideElement) {
    suggestions.classList.add('d-none');
  }

});

/*
Source:
  - https://dev.to/shubhamprakash/trap-focus-using-javascript-6a3
*/

document.addEventListener('keydown',suggestionFocus);

function suggestionFocus(e) {
  const suggestionsHidden = suggestions.classList.contains('d-none');
  if (suggestionsHidden) return;

  const focusableSuggestions= [...suggestions.querySelectorAll('a')];
  if (focusableSuggestions.length === 0) return;

  const index = focusableSuggestions.indexOf(document.activeElement);

  if (e.key === "ArrowUp") {
    e.preventDefault();
    const nextIndex = index > 0 ? index - 1 : 0;
    focusableSuggestions[nextIndex].focus();
  }
  else if (e.key === "ArrowDown") {
    e.preventDefault();
    const nextIndex= index + 1 < focusableSuggestions.length ? index + 1 : index;
    focusableSuggestions[nextIndex].focus();
  }

}

/*
Source:
  - https://github.com/nextapps-de/flexsearch#index-documents-field-search
  - https://raw.githack.com/nextapps-de/flexsearch/master/demo/autocomplete.html
*/

(function(){

  var index = new FlexSearch.Document({
    tokenize: "forward",
    cache: 100,
    document: {
      id: 'id',
      store: [
        "href", "title", "description"
      ],
      index: ["title", "description", "content"]
    }
  });


  // Not yet supported: https://github.com/nextapps-de/flexsearch#complex-documents

  /*
  var docs = [
    ];
  */

  // https://discourse.gohugo.io/t/range-length-or-last-element/3803/2

  

  index.add(
      {
        id: 0,
        href: "/getting-started/setup-reachy2/connect-wifi/",
        title: "Connect your robot to the WiFi",
        description: "How to connect your robot to the WiFi without using the dashboard.",
        content: "WiFi #\rOn your first connection to a network, the simpliest is to connect your robot with an ethernet cable.\nIf you cannot do this:\nUse the appropriate cable and connect your computer directly to Reachy 2\u0026rsquo;s computer. The cable has to be plugged in port (b) of Reachy 2\u0026rsquo;s hardware interface.\nWe use tiofor the serial connection. If you haven\u0026rsquo;t installed it yet on your computer: apt install tio\n👉 Make sure dialout is in your groups, otherwise add it to your groups. To check it: \u003e\u003e\u003e groups If it doesn't appear in the list, add it with: \u003e\u003e\u003e sudo usermod -aG dialout $USER Then reboot your computer for the new group to be effective. Then, in a terminal on your computer, get access to the robot with:\ntio /dev/ttyUSB0 Note that the connection could be on another USB port. Check all ports with ls /dev/ttyUSB*\n👉 Login: bedrock Password: root Manually connect the robot to a WiFi with:\nnmcli device wifi connect \u0026lt;wifi.name\u0026gt; password \u0026lt;your.password\u0026gt; For example, with the wifi POLLEN-WIFI, with password superstrongpassword:\nnmcli device wifi connect POLLEN-WIFI password superstrongpassword\n\u003c Back to network connection "
      }
    );
  search.addEventListener('input', show_results, true);

  function show_results(){
    const maxResult = 5;
    var searchQuery = this.value;
    var results = index.search(searchQuery, {limit: maxResult, enrich: true});

    // flatten results since index.search() returns results for each indexed field
    const flatResults = new Map(); // keyed by href to dedupe results
    for (const result of results.flatMap(r => r.result)) {
      if (flatResults.has(result.doc.href)) continue;
      flatResults.set(result.doc.href, result.doc);
    }

    suggestions.innerHTML = "";
    suggestions.classList.remove('d-none');

    // inform user that no results were found
    if (flatResults.size === 0 && searchQuery) {
      const noResultsMessage = document.createElement('div')
      noResultsMessage.innerHTML = `No results for "<strong>${searchQuery}</strong>"`
      noResultsMessage.classList.add("suggestion__no-results");
      suggestions.appendChild(noResultsMessage);
      return;
    }

    // construct a list of suggestions
    for(const [href, doc] of flatResults) {
        const entry = document.createElement('div');
        suggestions.appendChild(entry);

        const a = document.createElement('a');
        a.href = href;
        entry.appendChild(a);

        const title = document.createElement('span');
        title.textContent = doc.title;
        title.classList.add("suggestion__title");
        a.appendChild(title);

        const description = document.createElement('span');
        description.textContent = doc.description;
        description.classList.add("suggestion__description");
        a.appendChild(description);

        suggestions.appendChild(entry);

        if(suggestions.childElementCount == maxResult) break;
    }
  }
}());
