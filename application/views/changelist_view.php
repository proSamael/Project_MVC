<?php include 'application/views/layout/head_view.php'; ?>
<?php include 'application/views/layout/navbar_view.php'; ?>
<?php include 'application/views/layout/sidebar_view.php'; ?>

    <!-- Content Wrapper. Contains page content -->
    <div class="content-wrapper">
        <!-- Content Header (Page header) -->
        <section class="content-header">
            <div class="container-fluid">
                <div class="row mb-2">
                    <div class="col-sm-6">
                        <h1>Timeline</h1>
                    </div>
                    <div class="col-sm-6">
                        <ol class="breadcrumb float-sm-right">
                            <li class="breadcrumb-item"><a href="#">Home</a></li>
                            <li class="breadcrumb-item active">Timeline</li>
                        </ol>
                    </div>
                </div>
            </div><!-- /.container-fluid -->
        </section>

        <!-- Main content -->
        <section class="content">
            <div class="container-fluid">

                <!-- Timelime example  -->
                <div class="row">
                    <div class="col-md-12">
                        <!-- The time line -->
                        <div class="timeline" id="timeline">




                        </div>
                    </div>
                    <!-- /.col -->
                </div>
            </div>
            <!-- /.timeline -->

        </section>
        <!-- /.content -->
    </div>
    <!-- /.content-wrapper -->

<!-- /.control-sidebar -->
</div>
<!-- ./wrapper -->

<!-- jQuery -->
<script src="./application/plugins/jquery/jquery.min.js"></script>
<!-- jQuery UI 1.11.4 -->
<script src="./application/plugins/jquery-ui/jquery-ui.min.js"></script>
<!-- Resolve conflict in jQuery UI tooltip with Bootstrap tooltip -->
<script>
    $.widget.bridge('uibutton', $.ui.button)
</script>
<!-- Bootstrap 4 -->
<script src="./application/plugins/bootstrap/js/bootstrap.bundle.min.js"></script>
<!-- overlayScrollbars -->
<script src="./application/plugins/overlayScrollbars/js/jquery.overlayScrollbars.min.js"></script>
<!-- AdminLTE App -->
<script src="./js/adminlte.js"></script>
<!-- AdminLTE for demo purposes -->
<script src="./js/demo.js"></script>

<!-- DataTables  & Plugins -->
<script src="./application/plugins/datatables/jquery.dataTables.min.js"></script>
<script src="./application/plugins/datatables-bs4/js/dataTables.bootstrap4.min.js"></script>
<script src="./application/plugins/datatables-responsive/js/dataTables.responsive.min.js"></script>
<script src="./application/plugins/datatables-responsive/js/responsive.bootstrap4.min.js"></script>
<script src="./application/plugins/datatables-buttons/js/dataTables.buttons.min.js"></script>
<script src="./application/plugins/datatables-buttons/js/buttons.bootstrap4.min.js"></script>
<script src="./application/plugins/jszip/jszip.min.js"></script>
<script src="./application/plugins/pdfmake/pdfmake.min.js"></script>
<script src="./application/plugins/pdfmake/vfs_fonts.js"></script>
<script src="./application/plugins/datatables-buttons/js/buttons.html5.min.js"></script>
<script src="./application/plugins/datatables-buttons/js/buttons.print.min.js"></script>
<script src="./application/plugins/datatables-buttons/js/buttons.colVis.min.js"></script>
<script src="./application/plugins/moment/moment.min.js"></script>
<script src="./application/plugins/platform/changelist.js"></script>
