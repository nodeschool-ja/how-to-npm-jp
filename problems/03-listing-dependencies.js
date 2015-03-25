var reg = require('../lib/registry.js')
var shop = require('../')
var fs = require('fs')
var path = require('path')

exports.problem = function () {
  if (!shop.cwd())
    return ''

  reg.run("install-a-module")
  return function () {/*
npm は、ただインストールするためだけにあるわけではありません。
インストール済みのものを見ることもできます。

`npm ls` コマンドでこれができます。

このコマンドを作業ディレクトリで実行して、問題なさそうであれば、
`how-to-npm verify OK` を実行してください。なにか問題があった
場合は、`how-to-npm verify NOT OK` です。
*/}.toString().split('\n').slice(1,-1).join('\n')
}

//exports.solution = function () {/*
//npm ls
//how-to-npm verify NOT OK
//npm install once --save
//npm ls
//how-to-npm verify OK
//*/}.toString().split('\n').slice(1,-1).join('\n')

exports.verify = function (args, cb) {
  // verify we're in the right folder
  var cwd = shop.cwd()
  if (!cwd)
    return false

  // see if there was a problem or not
  var deps = require(cwd + '/package.json').dependencies
  try {
    var once = require(cwd + '/node_modules/once/package.json')
  } catch (er) {}
  var semver = require('semver')
  var ok
  if (!once || !deps || !deps.once || !semver.satisfies(once.version, deps.once))
    ok = false
  else
    ok = true

  var claim = args.join('').toUpperCase().trim()

  if (claim !== 'OK' && claim !== 'NOTOK') {
    console.log('問題がなければ:\n' +
                '`how-to-npm verify OK`\n' +
                'そうでなければ:\n' +
                '`how-to-npm verify NOT OK` を実行してください。')
    return cb(false)
  }



  if (claim === 'OK' && !ok) {
    console.log('残念ながら NO です。うまくいっていない箇所があります。\n' +
                '`npm ls` を実行して、エラーを確認してください。')
    return cb(false)
  } else if (claim === 'NOTOK' && ok) {
    console.log('うーん...\n' +
                'えーと...そりゃ世の中納得いかないこともたくさんあるんでしょうが、\n' +
                'すくなくとも、あなたの package.json と nodo_modules フォルダーは\n' +
                'いい感じですよ。')
    return cb(false)
  } else if (ok) {
    console.log('問題を修正できたようですね。すばらしい。\n'+
                'もう `npm ls` も赤い字で怒ってきたりしませんね。')
    reg.kill()
    return cb(true)
  } else {
    console.log(function () {/*
実際、いまの段階では、依存関係の設定でできていないことがあります。

みなさんの依存関係は、package.json の中の 'dependencies' と呼ばれる
場所にリストすべきです。しかしながら、'once' をインストールしたとき
には、package.json ファイルを更新して依存関係を追加しませんでした。

ですので、npm は、'extraneous' という警告を表示をして、依存関係に
追加していないものがあることを知らせているのです。

この状況を解決する一番簡単な方法は、`--save` フラグを使って、依存
パッケージをインストールすることです。パッケージをお試しで使ってみ
ているだけであれば、この機能を使いたくはないでしょう。しかし、ひと
たび正式に使うと決めたなら、このフラグを使って package.json
ファイルを簡単に更新できます。

`npm install once --save` を実行して、モジュールをインストールすると
同時に、package.json ファイルを更新してみましょう。

(もしくは、単に package.json をテキストエディタで編集してもかまいません)

問題を修正したら、`how-to-npm verify OK` を実行します。
      */}.toString().split('\n').slice(1,-1).join('\n')
    )
    // skip calling the cb, so we can keep working on it.
    return
  }

  throw new Error('should not ever get here')
}
