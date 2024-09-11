<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=}, initial-scale=1.0">
    <title>pantalla de carga </title>
    <link rel="stylesheet" href="css/animacion.css">
</head>
<body>
    <div id ="loader">

    </div>



    <script>

    function  pantallaCArga(){
        var barra = document.getElementById('loader');
        setTimeout(function(){
            barra.style.width ='100%';

            setTimeout(function(){
                window.location.href ='animalesFacil.php';
            },1000);
            
        }, 1500);
    }

    pantallaCArga();

    </script>
</body>
</html>