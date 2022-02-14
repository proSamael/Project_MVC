</head>
<body class="hold-transition login-page">
<div class="login-box">
    <!-- /.login-logo -->
    <div class="card card-outline card-primary">
        <div class="card-header text-center">
            <a href="" class="h1"><b>Project</b>MVC</a>
        </div>
        <div class="card-body">
            <p class="login-box-msg">Login in Project MVC</p>

            <form action="" method="post">
                <div class="input-group mb-3">
                    <input type="login" class="form-control"  name="login" placeholder="login">
                    <div class="input-group-append">
                        <div class="input-group-text">
                            <span class="fas fa-envelope">

                                <?php extract($data); ?>
                                <?php if($login_status=="access_granted") { ?>
                                    <p style="color:green">Авторизация прошла успешно.</p>
                                <?php } elseif($login_status=="access_denied") { ?>
                                    <p style="color:red">Логин и/или пароль введены неверно.</p>
                                <?php } ?>

                            </span>
                        </div>
                    </div>
                </div>
                <div class="input-group mb-3">
                    <input type="password" class="form-control" name="password" placeholder="password">
                    <div class="input-group-append">
                        <div class="input-group-text">
                            <span class="fas fa-lock"></span>
                        </div>
                    </div>
                </div>
                <div class="row">
                    <div class="col-8">
                        <div class="icheck-primary">
                            <input type="checkbox" id="remember" name="remember">
                            <label for="remember">
                                Запомнить меня?
                            </label>
                        </div>
                    </div>
                    <!-- /.col -->
                    <div class="col-4">
                        <button type="submit" class="btn btn-primary btn-block">Войти</button>
                    </div>
                    <!-- /.col -->
                </div>
            </form>
            <!-- /.social-auth-links -->
            <!--  <p class="mb-1">
                 <a href="">I forgot my password</a>
             </p>
             <p class="mb-0">
                 <a href="" class="text-center">Register a new membership</a>
             </p> -->
        </div>
        <!-- /.card-body -->
    </div>
    <!-- /.card -->
</div>
<!-- /.login-box -->
<!-- jQuery -->
<script src="./application/plugins/jquery/jquery.min.js"></script>
<!-- Bootstrap 4 -->
<script src="./application/plugins/bootstrap/js/bootstrap.bundle.min.js"></script>
<!-- AdminLTE App -->
<script src="./js/adminlte.min.js"></script>