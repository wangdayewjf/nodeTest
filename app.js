var through2  = require('through2');
var concat = require('concat-stream');
var duplex = require('./testModules/duplex');//这是自定义双向流demo
var stream = through2(write,end)
process.stdin
    .pipe(stream)
    .pipe(duplex)
    .pipe(process.stdout);

function write(line,_,next){

    this.push(line.toString().toUpperCase())
    next();
}
function end(done){
    done();
}


var reverseStream=concat(function(text){
	console.log('reverseStream');
    
})
