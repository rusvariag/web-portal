<!DOCTYPE html>
<html lang="en" dir="rtl">
    <head>
        <meta charset="utf-8">
        <title>Investment Portal</title>
        <link rel="icon" sizes="152x152" href="./favicon.ico">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">

        <!-- Main styles -->
        <link rel="stylesheet" href="../lib/css/1.3.0/css/line-awesome.min.css">
        <link rel="stylesheet" href="src/css/style.css">

        <!-- JS Libraries -->
        <script src="https://cdnjs.cloudflare.com/ajax/libs/animejs/3.2.1/anime.min.js" charset="utf-8"></script>
    </head>
    <body>

        <input type="checkbox" id="menu-toggle" />
        <input type="checkbox" id="land-page-toggle" />

        <div class="body-container">
            <header class="header container-centralize">
                <label for="menu-toggle" class="menu-toggler container-centralize">
                    <span class="las la-bars"></span>
                </label>
                <div class="news-feed">
                    <div class="news-feed-header container-centralize container-wrapper"></div>
                    <div class="news-feed-update">
                        <div class="news-feed-text">
                            <p></p>
                        </div>
                    </div>
                </div>
            </header>

            <nav class="navigation container-wrapper">
                <div class="brand text-l rubik">
                    <span class="brand__title"></span>
                </div>
                <div class="portfolio">
                    <a href="www.google.com"></a>
                    <h4 class="portfolio__title text-xl"></h4>
                </div>
            </nav>

            <div class="land-page container-wrapper">
                <h2 class="land-page__title">Welcome to Mad House</h2>
                <div class="container-animation">
                  <div class="wrapper">
                    <div class="el"></div>
                    <div class="el"></div>
                    <div class="el"></div>
                    <div class="el"></div>
                    <div class="el"></div>
                    <div class="el"></div>
                    <div class="el"></div>
                    <div class="el"></div>
                    <div class="el"></div>
                    <div class="el"></div>
                    <div class="el"></div>
                    <div class="el"></div>
                    <div class="el"></div>
                    <div class="el"></div>
                    <div class="el"></div>
                    <div class="el"></div>
                   </div>
                </div>
                <h3 class="land-page__subtitle"></h3>
            </div>

            <aside class="container container-wrapper">
                <div class="chart-container">
                    <div class="chart__header container-headers">
                        <h4 class="chart__title"></h4>
                    </div>
                    <div id="returnChart"></div>
                </div>
                <div class="table-container">
                    <h4 class="table__title text-l"></h4>
                </div>
            </aside>

            <div class="panels"></div>

            <main class="main container-wrapper"></main>

        </div>

        <!-- Run javascript after loaded data -->
        <script src="../lib/js/jquery.min.js"></script>
        <script src="../lib/js/raphael-min.js"></script>
        <script src="../lib/js/morris.min.js"></script>
        <script type="module" src="src/js/scripts.js"></script>

        <div class="animation-area">
            <ul class="box-area">
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
            </ul>
        </div>
    </body>
</html>
