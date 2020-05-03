<?php 
    $db = mysqli_connect("localhost", "root", "entiu", "finplay");  
    if (mysqli_connect_errno()) 
    { 
        echo "Database connection failed."; 
    } 
    $query = "SELECT * FROM stories WHERE id = 1"; 
    $result = mysqli_query($db, $query); 
    if ($result) 
    { 
        $rows = mysqli_num_rows($result); 
        $r = array();
        if ($rows) {
            while($row = $result -> fetch_assoc()) {
                $r[] = $row;
            }
            if($rows == 1) {
                $r = $r[0];
            }
        } 
    } 
?>

<html>
    <head>
        <meta charset="utf-8">
        <meta http-equiv="content-type" content="text/html; charset=UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
        <link rel="stylesheet" href="style.css">
        <title><?= $r['title'] ?></title>
        <script src="script.js"></script>
    </head>
    <body>
        <div class="page-container">
            <div class="toggle-top-bar" onclick="showTopBar()"></div>
            <div class="top-bar" id="top-bar">
                <button class="top-btn"><img src="img/ico-format.svg" alt="ico-format"></button>
                <button class="top-btn"><img src="img/ico-comment.svg" alt="ico-comment"></button>
                <button class="top-btn"><a href="javascript:history.back()"><img src="img/ico-back.svg" alt="ico-comment"></a></button>
            </div>
            <div class="page" id="page" onclick="hideTopBar()"></div>
            <button class="prev" onclick="story.prev()"></button>
            <button class="next" onclick="story.next()"></button>
            <div class="page-counter" id="page-counter"></div>
            <div class="bar" id="bar"></div>
            <div class="bar-read" id="bar-read"></div>
            <div class="percentage" id="percentage"></div>
        </div>

        <script>
            var story = new Story("<?= $r['title'] ?>", "<?= $r['content'] ?>");
        </script>
    </body>
</html>