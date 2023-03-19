<?php
include('../dbConnection.php');

session_start();
if($_SESSION['is_login']){
    $rEmail = $_SESSION['rEmail'];
}else{
    echo "<script>location.href='RequesterLogin.php'</script>";
}
//displayed data's query match
$sql = "SELECT * FROM requesterlogin_tb WHERE r_email= '$rEmail'";
$result = $conn->query($sql);
if($result->num_rows==1){
    $row = $result->fetch_assoc();
    $rName = $row['r_name'];
    $rAge = $row['r_age'];
    $rGender = $row['r_gender'];
    $rAddress = $row['r_address'];
    $rPhone = $row['r_phone'];
}
//writing update query 

if(isset($_REQUEST['nameupdate'])){
    if($_REQUEST['rName']==""){
        $regmsg = '<div class="alert alert-danger mt-2" role="alert">Fill the field...</div>';

    }else{
       $rName = $_REQUEST['rName'];
       $rAge = $_REQUEST['rAge'];
       $rGender = $_REQUEST['rGender'];
       $rAddress = $_REQUEST['rAddress'];
       $rPhone = $_REQUEST['rPhone'];

       $sql = "UPDATE requesterlogin_tb SET r_name = '$rName',r_age = '$rAge',r_gender= '$rGender',r_address = '$rAddress',r_phone = '$rPhone' WHERE r_email='$rEmail'";
       if($conn->query($sql)==True){
        $regmsg = '<div class="alert alert-success mt-2" role="alert">Updation Successful...</div>';
  
       }else{
        $regmsg = '<div class="alert alert-danger mt-2" role="alert">Unable to Update...</div>';

       }
    }
}

?>

<?php
define('TITLE','Your Profile');
define('PAGE','RequesterProfile');

include("includes/header.php");
?>



            <!-- profile area start -->
           
            <div class="col-sm-6" style="margin-top:6rem;">
                <form action="" method="post" class="mx-5">
                    <div class="form-group">
                        <label for="rEmail">Email</label><input type="email" class="form-control" name="rEmail" id="rEmail" readonly value = "<?php echo $rEmail; ?>">
                    </div>
                    <div class="form-group">
                        <label for="rName" class="mt-2">Name</label><input type="text" class="form-control" name="rName" id="rName" value = "<?php echo $rName; ?>">
                        <label for="rName" class="mt-2">Age</label><input type="text" class="form-control" name="rAge" id="rAge" value = "<?php echo $rAge; ?>">
                        <label for="rName" class="mt-2">Gender</label><input type="text" class="form-control" name="rGender" id="rGender" value = "<?php echo $rGender; ?>">
                        <label for="rName" class="mt-2">Address</label><input type="text" class="form-control" name="rAddress" id="rAddress" value = "<?php echo $rAddress; ?>">
                        <label for="rName" class="mt-2">Phone Number</label><input type="text" class="form-control" name="rPhone" id="rPhone" value = "<?php echo $rPhone; ?>">


                          <?php
                            if(isset($regmsg)){echo $regmsg ;}
                            
                            ?>
                    </div>
                    <button type="submit" class="btn btn-danger mt-3" name="nameupdate">Add & Update</button>
                </form>

            </div>
             <!-- profile area end -->
     
<?php
include("includes/footer.php");
?>