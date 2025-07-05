// JavaScript for live search functionality
document.addEventListener('DOMContentLoaded', function() {
    const searchInput = document.getElementById('searchInput');
    const resultsDiv = document.getElementById('results');
    let searchTimeout;

    // Add event listener for input
    searchInput.addEventListener('input', function() {
        const query = this.value.trim();
        
        // Clear previous timeout
        clearTimeout(searchTimeout);
        
        // If query is empty, clear results
        if (query === '') {
            resultsDiv.innerHTML = '';
            return;
        }
        
        // Show loading
        resultsDiv.innerHTML = '<div class="loading">Searching...</div>';
        
        // Set timeout for search (incremental search)
        searchTimeout = setTimeout(function() {
            performSearch(query);
        }, 300);
    });

    // Function to perform AJAX search
    function performSearch(query) {
        // Create XMLHttpRequest
        const xhr = new XMLHttpRequest();
        
        // Set up the request
        xhr.open('GET', 'search.php?q=' + encodeURIComponent(query), true);
        
        // Set up response handler
        xhr.onreadystatechange = function() {
            if (xhr.readyState === 4) {
                if (xhr.status === 200) {
                    try {
                        const results = JSON.parse(xhr.responseText);
                        displayResults(results);
                    } catch (e) {
                        resultsDiv.innerHTML = '<div class="no-results">Error processing search results</div>';
                    }
                } else {
                    resultsDiv.innerHTML = '<div class="no-results">Error performing search</div>';
                }
            }
        };
        
        // Send the request
        xhr.send();
    }

    // Function to display search results
    function displayResults(results) {
        if (results.length === 0) {
            resultsDiv.innerHTML = '<div class="no-results">No states found matching your search</div>';
            return;
        }

        let html = '';
        results.forEach(function(result) {
            html += '<div class="result-item">';
            html += '<div class="state-name">' + result.state + '</div>';
            html += '<div class="capital-name">Capital: ' + result.capital + '</div>';
            html += '</div>';
        });

        resultsDiv.innerHTML = html;
    }
});
