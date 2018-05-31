<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <title>Juliny's Php Study</title>
</head>

<body>
  <h1>Juliny's Free LifeStyle</h1>
  <h2>Order Results</h2>

  <?php
    echo '<p>Order processed at '.date('H:i, jS F Y').'</p>';
    $tireqty = $_POST['tireqty'];
    $oilqty = $_POST['oilqty'];
    $sparkqty = $_POST['sparkqty'];
    echo '<p>Your order is as follows: </p>';
    echo htmlspecialchars($tireqty).' tires<br />';
    echo htmlspecialchars($oilqty).' bottles of oil<br />';
    echo htmlspecialchars($sparkqty).' spark plugs<br />';
    echo "$tireqty tires<br />";


    echo 'isset($tireqty) :'.isset($tireqty).'<br/>';
    echo 'isset($lzx) :'.isset($lzx).'<br/>';
    echo 'empty($tireqty) :'.empty($tireqty).'<br/>';
    echo 'empty($lzx) :'.empty($lzx).'<br/>';
  ?>
</body>

</html>
