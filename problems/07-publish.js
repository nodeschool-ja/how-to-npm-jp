var reg = require('../lib/registry.js')

var shop = require('../')
var fs = require('fs')
var path = require('path')

exports.problem = function () {
  if (!shop.cwd())
    return ''

  reg.run('publish')

  return function () { /*
みなさんはパッケージのないパッケージマネージャを良いと思うでしょうか。

あまり良いとは言えないですね。

幸運なことに、npm ではこういうことは問題になりません。なぜなら、npm
ならだれでも簡単にモジュールを公開して、世界中の人々と共有できるから
です。

パッケージは、`npm publish` コマンドを使ってレジストリに入れることが
できます。

ではやってみてください。なにもたいへんなことはありません。

(正しいプロジェクトのディレクトリ内にいるでしょうか。もし間違って公開して
しまったとしても、取り止めることができます。取り止めるまでの間にだれも
それを見ていないという保証はありませんが...)

それができたら、`how-to-npm-jp verify` を実行します。
*/}.toString().split('\n').slice(1,-1).join('\n')
}

//exports.solution = 'npm publish'

exports.verify = function (args, cb) {
  if (!shop.cwd())
    return cb(false)

  var pkg = require(process.cwd() + '/package.json')
  var name = pkg.name
  var exec = require('child_process').exec
  var npm = require('which').sync('npm')
  exec(npm + ' --color=always view ' + name, function (er, stdout, stderr) {
    if (er) {
      process.stderr.write(stderr)
      console.log('うーん。\n'+
                  name + '\n' +
                  'パッケージの公開に成功しなかったようです。もう一度やってみてください。\n')
    }

    console.log(function () {/*
パッケージの内容を見るために、このコマンドを内部で実行しました:

  npm view %NAME%

自分自身で実行して、なにが表示されるか確認しましょう。


`npm view` コマンドは、既に同じパッケージの名前が使われていないかを確認
したり、今さっき公開したパッケージの情報を見ることができます。

これで、みなさんの最初のパッケージを公開したと npm のワークショッププロ
グラムに信じ込ませることができました。このディレクトリの外に出れば、本物
のコードを書き、実際に人々と共有することができます。

npm の用途は、他人とコードを共有するだけにとどまりません。コードを小さく
て、管理し易い大きさに分割するという利点もあります。たとえ、自分自身のた
めにしかそれを使わないとしてもです。

未来の自分と過去の自分が、それぞれ別の開発者としてチームにいる状態を考
えてみてください(二人をつれてきて会議をするのは、極めて難しいですね)。

`how-to-npm-jp` を実行して、次のアドベンチャーに進みましょう。
*/}.toString().split('\n').slice(1,-1).join('\n').replace(/%NAME%/g, name))
    reg.kill()

    return cb(true)
  })
}
