// Old-sk00l multi-line strings
exports.problem = function () { /*
こんにちは。ようこそ adventure ワークショップへ。これから、みなさん
には npm でさまざまな課題をやってもらいます。課題は、みなさんが npm
を使って自分でパッケージを作りはじめられるように考えられています。

よく使うコマンド：

npm help ............ npm のヘルプを見る
how-to-npm print .... 課題を再表示する
how-to-npm verify ... 自分の回答を提出して、答え合わせをする
how-to-npm solution . 正解を見る

最初にすることは、みなさんの npm のバージョンが最新であることの確認
です。

確認できたら、 `how-to-npm verify` を実行してください。

(ワークショップでネットワークアクセスを必要とするのはここだけです。
もしネットワークが繋がらず、この課題をスキップしたいときは、
`how-to-npm verify skip` を実行してください。)
*/}.toString().split('\n').slice(1,-1).join('\n')

// exports.solution = '[sudo] npm install npm -g'


var exec = require('child_process').exec
var node = process.execPath
var which = require('which')
var semver = require('semver')
exports.verify = function (args, cb) {
  if (args.join('').toLowerCase() === 'skip') {
    console.log('飛ばすのですね。わかりました...\n'+
                '次のコマンドで、いつでも最新の一番優れた npm をインストールできます。\n'+
                '`npm install npm -g`  もしかすると `sudo` を付けるか、管理者として\n'+
                '実行する必要があるかもしれません。\n')
    return cb(true)
  }

  console.log('npm がインストールされているか確認しています。')
  var npm

  try {
    npm = which.sync('npm')
  } catch (er) {
    console.error('npm がインストールされていないようです。')
    return cb(false)
  }

  // figure out what version we have
  exec(npm +' --version', function (code, stdout, stderr) {
    var v = ('' + stdout).trim()
    if (code) {
      console.log('おっと。npm コマンドを実行したらエラーが発生してしまいました。 %j', code)
      process.stderr.write(stderr)
      return cb(false)
    }

    console.log('バージョン %s がインストールされています。すばらしい。', v)
    console.log('それでは、最新バージョンがいくつなのか確認しましょう... 少々お待ちください...')

    exec(npm + ' view npm version --registry=https://registry.npmjs.org', function (code, stdout, stderr) {
      var latest = ('' + stdout).trim()
      if (code) {
        console.log('おっと。npm コマンドを実行したらエラーが発生してしまいました。 %j', code)
        process.stderr.write(stderr)
        return cb(false)
      }

      console.log('最新版は %s です。', latest)
      if (semver.gt(latest, v)) {
        console.log('あなたのバージョンは %s ですが, 最新版は %s です。',
                    v, latest)
        console.log('`npm install npm -g` を実行してアップグレードしてください。')
        console.log('(この課題が不要であればスキップしてもかまいません)')
        return cb(false)
      }

      console.log('おめでとうございます。\n' +
                  'npm の最新版がインストールされています。')
      return cb(true)
    })
  })
}
