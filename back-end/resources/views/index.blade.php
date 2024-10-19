<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body>
    @if ($p->isEmpty())
        <div class="alert alert-info m-3" role="alert">
            <h2>Aucun plat trouvé.</h2>
        </div>
    @else
        <div>
            @foreach($p as $plat)
                <p>{{ $plat->image_plat }}</p>
                <p>{{ $plat->nom_plat }}</p>
                <p>{{ $plat->description_plat }}</p>
                <p>{{ $plat->prix_plat }}</p>
            @endforeach
        </div>
        <div class="row"> {{ $p->links() }} </div>
    @endif
</body>
</html>
