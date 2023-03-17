<?php
include('../dbConnection.php');

?>
<?php

session_start();

if(isset($_SESSION['is_login'])) {
    $rEmail = $_SESSION['rEmail'];
}else{
    echo "<script>  location.href = 'login.php'</script>";
}

if(isset($_REQUEST['requestsubmit'])){
    if(($_REQUEST['rName']=="")){
        $regmsg = '<div class="alert alert-danger mt-2" role="alert">Fill all fields...</div>';

    }else{
        // $sql = "SELECT * FROM report WHERE emp_email= '".$_REQUEST['rEmail']."'";
        // $result = $conn->query($sql);
        // if($result->num_rows==1){
        //     $regmsg = '<div class="alert alert-danger mt-2" role="alert">Email Already Registered...</div>';

       
            $rname = $_REQUEST['rName'];
            $remail = $_REQUEST['rEmail'];
            // $rdisease = $_REQUEST['rdisease'];
            // $rdate = $_REQUEST['rdate'];
            // $reports = $_REQUEST['reports'];,$rdisease,$rdate,$reports,$rprogress
            // $rprogress = $_REQUEST['rprogress'];,`r_disease`, `r_date`, `r_report`, `r_status`

           
            $sql = "INSERT INTO `report` (`r_email`, r_name ) VALUES ('$remail','$rname')";
            $result = $conn->query($sql);
            if($result==TRUE){
                $regmsg = '<div class="alert alert-success mt-2" role="alert">User Registered...</div>';

            }else{
                $regmsg = '<div class="alert alert-danger mt-2" role="alert">Try Again!!!!</div>';
            
               }
        

        }
    }
//}

define('TITLE', 'Insert Employee');
include('includes/header.php');

?>
<!-- 2nd colummn -->
<div class="col-sm-6 mx-3 mt-5 jumbotron">
    <h3 class=" text-center">Add reports</h3>
    <form action="" class="shadow-lg p-4" method="POST">
        <div class="form-group">
            <i class="fas fa-1x fa-user"></i>
            <label for="name" class="font-weight-bold pl-2" style="padding:11px;">Doctor Name </label><br>
            <input type="text" class="form-control" placeholder="Name" name="rName">
        </div>
        <break>
            <div class="form-group">
                <i class="fas fa-1x fa-user"></i>
                <label for="name" class="font-weight-bold pl-2" style="padding:11px;">Email </label><br>
                <input type="email" class="form-control" placeholder="Name" name="rEmail">
            </div>
            <break>
                <!-- <div class="form-group">
                    <i class="fas fa-1x fa-user"></i>
                    <label for="name" class="font-weight-bold pl-2" style="padding:11px;">Disease </label><br>
                    <input type="text" class="form-control" placeholder="Name" name="rdisease">
                </div>
                <break>
                    <div class="form-group">
                        <i class="fas fa-1x fa-user"></i>
                        <label for="name" class="font-weight-bold pl-2" style="padding:11px;">Duration Of Date
                        </label><br>
                        <input type="date" class="form-control" placeholder="Name" name="rdate">
                    </div>
                    <break>
                        <div class="form-group">
                            <i class="fas fa-1x fa-user"></i>
                            <label for="name" class="font-weight-bold pl-2" style="padding:11px;">Report </label><br>
                            <input type="file" class="form-control" placeholder="Name" name="reports">
                        </div>
                        <break>
                            <div class="form-group">
                                <i class="fas fa-1x fa-user"></i>
                                <label for="name" class="font-weight-bold pl-2" style="padding:11px;">Progress
                                </label><br>
                                <input type="text" class="form-control" placeholder="Name" name="rprogress">
                            </div>
                            <break> -->



                                <div class="text-center" style="margin-top: 30px;">
                                    <button type="submit" class="btn btn-danger" name="requestsubmit">Add</button>
                                    <a href="report.php" class="btn btn-secondary">Close</a>
                                </div><br>
                                <?php
                            if(isset($regmsg)){echo $regmsg ;}
                            
                            ?>
    </form>
</div>



<?php
include('includes/footer.php');
echo $rEmail;
?>