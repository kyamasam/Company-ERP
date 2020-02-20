<!DOCTYPE html>
<html lang="{{ app()->getLocale() }}">
<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">

    <!-- CSRF Token -->
    <meta name="csrf-token" content="{{csrf_token()}}">
    <script>
        window.myToken =  <?php echo json_encode([
            'csrfToken' => csrf_token(),
        ]); ?>
    </script>

    <title>Sefapay Client</title>
    <!--favicon-->
    <link rel="icon" type="image/png" href="{{ asset('/Sefapay_favicon.png') }}">
    <!-- Styles -->
    <link href="{{asset('/css/app.css') }}" rel="stylesheet">
    <link href="{{asset('/assets/css/icons.css')}}" rel="stylesheet" type="text/css" />
    <link href="{{asset('/assets/css/style.css')}}" rel="stylesheet" type="text/css" />
    {{--<link href="{{asset('/plugins/bootstrap-table/css/bootstrap-table.min.css')}}" rel="stylesheet" type="text/css" />--}}
    <script src="{{asset('/assets/js/modernizr.min.js')}}"></script>

</head>
<body class="fixed-left">
{{--{{ csrf_token() }}--}}
    <div id="app">
    </div>
    <script>
        var resizefunc = [];
    </script>
    <script src="{{ asset('/js/app.js') }}"></script>
    <script src="{{ asset('/js/detect.js') }}"></script>
    <script src="{{ asset('/js/pace.js') }}"></script>
    <script src="{{ asset('/assets/js/waves.js') }}"></script>
    <script>

    </script>
</body>
</html>
