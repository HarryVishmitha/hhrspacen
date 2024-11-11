<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}" class="light">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <link rel="shortcut icon" href="{{ asset('img/favicon.png' ) }}" type="image/x-icon">
        <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha1/dist/css/bootstrap.min.css" rel="stylesheet">
        <script src="https://cdn.jsdelivr.net/npm/@popperjs/core@2.11.6/dist/umd/popper.min.js"></script>
        <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha1/dist/js/bootstrap.min.js"></script>
        <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.6.0/jquery.min.js"></script>
        <script src="https://kit.fontawesome.com/9d3f75581e.js" crossorigin="anonymous"></script>
        <title inertia>{{ config('app.name', 'HHRSPACE') }}</title>
        <style>
            .back-to-top {
                position: fixed;
                bottom: 30px;
                right: 30px;
                display: none; /* Hidden by default */
                background-color: #007bff;
                color: white;
                border: none;
                border-radius: 5px;
                padding: 10px 15px;
                font-size: 16px;
                z-index: 1000;
                width: 50px;
                height: 50px;
            }
            .back-to-top:hover {
                background-color: #0056b3;
            }
        </style>
        <!-- Scripts -->
        @routes
        @viteReactRefresh
        @vite(['resources/js/app.jsx', "resources/js/Pages/{$page['component']}.jsx"])
        @inertiaHead
    </head>
    <body class="font-sans antialiased">
        @inertia

        <!-- Back to Top Button -->
        <button class="back-to-top" id="backToTop"><i class="fas fa-arrow-up"></i></button>

        <script>
            $(document).ready(function() {
                // Show or hide the button based on scroll position
                $(window).scroll(function() {
                    if ($(this).scrollTop() > 100) {
                        $('#backToTop').fadeIn();
                    } else {
                        $('#backToTop').fadeOut();
                    }
                });

                // Scroll to top when the button is clicked
                $('#backToTop').click(function() {
                    $('html, body').animate({ scrollTop: 0 }, 800);
                    return false;
                });
            });
        </script>
    </body>
</html>
