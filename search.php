<?php
// Include the states data
include 'states.php';

// Set content type to JSON
header('Content-Type: application/json');

// Get the search query
$query = isset($_GET['q']) ? trim($_GET['q']) : '';

// Initialize results array
$results = array();

// Only search if query is not empty
if (!empty($query)) {
    // Convert query to lowercase for case-insensitive search
    $query_lower = strtolower($query);
    
    // Search through states array
    foreach ($states as $state => $capital) {
        // Check if state name contains the search query
        if (strpos(strtolower($state), $query_lower) !== false) {
            $results[] = array(
                'state' => $state,
                'capital' => $capital
            );
        }
    }
}

// Return JSON response
echo json_encode($results);
?>
