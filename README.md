# Github jQuery API.

## Overview

This class allows you to retrieve basic information from your GitHub account.

## Example

* HTML Code:

        <!-- Include the jQuery library -->
        <script src="http://ajax.googleapis.com/ajax/libs/jquery/1/jquery.min.js"></script>

        <!-- Include this Sound plugin -->
        <script src="http://your-site.com/static/js/Git.js"></script>  
    
        <section role="main" class="center" id="git" data-gituser="pH-7">
            <section>
                <header>
                    <h2>Repositories</h2>
                </header>
                <p id="bio"></p>
            </section>
        
            <section>
                <header>
                    <h2>Repositories</h2>
                </header>
                <ul id="repos" data-queryurl="?sort=updated"></ul>
            </section>

            <section>
                <header>
                    <h2>Gists</h2>
                </header>
                <ul id="gists" data-queryurl="?sort=updated"></ul>
            </section>
        </section>

* JS Code:

        // Retrieve information from GitHub
        jQuery(document).ready(function($)
        {
            Git.Git().repos().gist().bio();
        });

## Author

Pierre-Henry Soria


## License

[MIT License](http://opensource.org/licenses/mit-license.php)
