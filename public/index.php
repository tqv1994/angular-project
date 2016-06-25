<?php



require '../vendor/autoload.php';

use Illuminate\Database\Capsule\Manager as Capsule;

$capsule = new Capsule;

$capsule->addConnection([
    'driver'    => 'mysql',
    'host'      => 'localhost',
    'database'  => 'khoaluan',
    'username'  => 'root',
    'password'  => '',
    'charset'   => 'utf8',
    'collation' => 'utf8_unicode_ci',
    'prefix'    => '',
]);

// Set the event dispatcher used by Eloquent models... (optional)
use Illuminate\Events\Dispatcher;
use Illuminate\Container\Container;
$capsule->setEventDispatcher(new Dispatcher(new Container));

// Make this Capsule instance available globally via static methods... (optional)
$capsule->setAsGlobal();

// Setup the Eloquent ORM... (optional; unless you've used setEventDispatcher())
$capsule->bootEloquent();

$app = new \Slim\Slim();


if (isset($_SERVER['HTTP_ORIGIN'])) {
    header("Access-Control-Allow-Origin: *");
    header('Access-Control-Allow-Credentials: true');
    header('Access-Control-Max-Age: 86400');    // cache for 1 day
}

// Access-Control headers are received during OPTIONS requests
if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {

    if (isset($_SERVER['HTTP_ACCESS_CONTROL_REQUEST_METHOD']))
        header("Access-Control-Allow-Methods: GET, POST, OPTIONS,PUT,DELETE");        

    if (isset($_SERVER['HTTP_ACCESS_CONTROL_REQUEST_HEADERS']))
        header("Access-Control-Allow-Headers: {$_SERVER['HTTP_ACCESS_CONTROL_REQUEST_HEADERS']}");

    exit(0);
}

$app->get('/', function() use ($app) {
    readfile('index.html');
    $app->stop();
});

$app->get('/users',function() {
    echo 'test';
});

$app->get('/project/users', function() {
    $users = User::all();
    echo $users->toJson();
});

$app->get('/project/users/:id', function($id) use($app) {
    $user = User::find($id);
    if (is_null($user)) {
        $app->response->status(404);
        $app->stop();
    }
    echo $user->toJson();    
});

$app->post('/project/users', function() use($app) {
    $body = $app->request->getBody();
    $obj = json_decode($body);
    $user = new User;
    

    $user->name = $obj->{'name'};
    $user->username = $obj->{'username'};
    $user->password = md5($obj->{'password'});
    $user->email = $obj->{'email'};
    $user->time = time();
    $user->status = $obj->{'status'};
    $user->save();
    $app->response->status(201);
    echo $user->toJson();    
});

$app->put('/project/users/:id', function($id) use($app) {
    $body = $app->request->getBody();
    $obj = json_decode($body);
    $user = User::find($id);
    if (is_null($user)) {
        $app->response->status(404);
        $app->stop();
    }
    
     $user->name = $obj->{'name'};
    $user->username = $obj->{'username'};
    $user->password = md5($obj->{'password'});
    $user->email = $obj->{'email'};
    $user->status = $obj->{'status'};
    $user->save();
    echo $user->toJson();    
});

$app->delete('/project/users/:id', function($id) use($app) {
    $user = User::find($id);
    if (is_null($user)) {
        $app->response->status(404);
        $app->stop();
    }
    $user->delete();
    $app->response->status(204);
});

$app->post('/auth/login',function() use($app){
    $body = $app->request->getBody();
    $obj = json_decode($body);
    $user = User::where('username',$obj->{'username'})->first();
    if($user)
    {
        if($user->password == md5($obj->{'password'})){
            echo $user->toJson();
            $app->stop();
        }
    }
    $app->response->status(404);
    $app->stop();
});
$app->get('/auth/login',function() use($app){
    echo 'test';
   // $app->stop();
});
$app->run();
