'use strict'
import express      	 from 'express'
import path      		 from 'path'
import serve_favicon     from 'serve-favicon'
import morgan   		 from 'morgan'
import cookieParser   	 from 'cookie-parser'
import consign 			 from 'consign'
import bodyParser        from 'body-parser'
import compression		 from 'compression'
import passportLocal     from 'passport-local'
import expressSession    from 'express-session'
import passport			 from 'passport'
import cors				 from 'cors'
import passportHttp      from 'passport-http'
import flash     		 from 'express-flash'
import http 		 	 from 'http'


const app              = express()



// view engine setup
app.set('views', path.join(__dirname, 'app/views'));
app.set('view engine', 'ejs');
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(morgan('dev'));
app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors());
// app.use(helmet());
app.use(flash());
app.disable('x-powered-by');
app.use(express.static(path.join(__dirname, 'public')));
//app.use(compression());
app.use(cookieParser('iY}ONxQ,Y9I^Z}&y6-i}~35cS/vk/sf8+y@8c.2></>P*Z03Xhue?lzY%|dzN>S'));
app.use(expressSession({
	secret: process.env.SESSION_SECRET || '1a5H(qzO&1+!8M35tXvai3A*JF%Os]eOoG63/Oo+:1S(R[%x[js09UKDam0#85',
	saveUninitialized: false,
	resave: false,
	cookie: {
		httpOnly: true
	}
}));
app.use(passport.initialize());
app.use(passport.session());


passport.use(new passportLocal.Strategy({
	usernameField: 'login',
	passwordField: 'senha',
},verificaLogin));

passport.use(new passportHttp.BasicStrategy(verificaLogin));

function verificaLogin(username, password, done){
	var pass = require('./app/middleware/password');
	var User = app.models.user;
	var Sistema = app.models.sistema;
	User.findOne({'login': username },  (err, result)=> {
		if(err) { console.log("ERROR: " + err); }
		else {
			if(result){
				if(result.login == username && pass.validate(result.password, password) && result.status == false) {
					done(null, result);  
				} else {
					done(null, null);
				}
			} else {
				done(null, null);
			}
		}
	});
}


passport.serializeUser((user, done)=> done(null, user));

passport.deserializeUser((user, done)=> done(null, user));

/*
	Importando os modulos..
	*/
	consign({cwd:'app', verbose:false})
	.include('models')
	.include('funcoes')
	.then('controllers')
	.then('routes')
	.then('config')
	.into(app)

	app.set('port', (process.env.PORT || 3000))

	const port = app.get('port')

	var server = http.createServer(app);

//socket io
require('./app/socket/socket.js')(server)

server.listen(port, () => console.log('Servidor rodando na porta: %d', port))



