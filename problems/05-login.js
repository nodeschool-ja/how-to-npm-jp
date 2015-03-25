var reg = require('../lib/registry.js')
var shop = require('../')
var fs = require('fs')
var path = require('path')

exports.problem = function () {
  if (!shop.cwd())
    return ''

  reg.run('login')

  return function () { /*
モジュールのインストールをするだけでもおもしろいのですが、自分
自身が npm に参加するのもまた、同じくらいたのしいことです。npm
への参加は、アカウントの作成からはじまります。

いま取り組んでいるのはただのチュートリアルですので、*実際には*
アカウントを作成しない、ということを思い出してください。しかし
ながら、実際の世界で同じことをすれば、本物のアカウントを作成で
きます。本物のアカウントには、npmjs.com のページがついてきて、
パッケージを公開し、他の人にインストールてたのしんでもらうこと
ができます。

ログインしているアカウントを確認するには、`npm whoami` を実行
します。

アカウントの作成は、`npm adduser` です。

では、実際にやってみてください。そして、これまでよりもさらに
たのしいモジュール作成への一歩を踏み出してください。
*/}.toString().split('\n').slice(1,-1).join('\n')
}

//exports.solution = 'npm adduser'

exports.verify = function (args, cb) {
  if (!shop.cwd())
    return cb(false)

  // test who we are with whoami
  var exec = require('child_process').exec
  var npm = require('which').sync('npm')
  exec(npm + ' whoami', function (er, stdout, stderr) {
    if (er) {
      process.stdout.write(stdout)
      process.stderr.write(stderr)

      console.log('\nあれれ\n' +
                  'なにかがおかしいですね')
      return cb(false)
    }

    stdout = (stdout + '').trim()
    if (stdout.match(/Not authed.  Run 'npm adduser'/)) {
      console.log('うーん... ログインしていませんね。\n'+
                  '`npm adduser` を実行してアカウントの作成はしましたか?')
      return cb(false)
    }

    console.log('おめでとうございます、%s!', stdout)
    console.log('いまやあなたは架空の npm アカウントを手にしました。\n' +
                '注意して使ってください。怒りに身をまかせてはいけません。\n' +
                '良きことのためだけに使うのです。\n' +
                '\n' +
                'この甘美なる力には責任が伴います。スパイダーマンのとはちょっと\n' +
                '変えたからマーベルも文句言ってこないよね...だといいなあ。\n' +
                '\nエクセルシオール!')

    reg.kill()
    return cb(true)
  })
}
