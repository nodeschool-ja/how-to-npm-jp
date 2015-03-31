var reg = require('../lib/registry.js')

var shop = require('../')
var fs = require('fs')
var path = require('path')

exports.problem = function () {
  if (!shop.cwd())
    return ''

  return function () { /*
なにかを追加することができる以上、当然、それを取り除く方法が必要
になることもあるでしょう。

その場合、`npm rm` コマンドを入力してください(別名 `npm uninstall`
もし長いコマンドを入力するのが好きならこちらでもかまいません)。

依存パッケージをすべて削除しましょう。ただし、それらのパッケージを
実際に使用していないことは確認しておいてください。

インストール時に、`--save` を使ったように、パッケージを取り除くとき
にも、`--save` を使うことで package.json ファイルからそれに関する
記述を除去できます。

依存パッケージを除去できたなら、`how-to-npm-jp verify` とタイプして
進んでください。
*/}.toString().split('\n').slice(1,-1).join('\n')
}

//exports.solution = 'npm rm once --save'

exports.verify = function (args, cb) {
  var cwd = shop.cwd()
  if (!cwd)
    return cb(false)

  var pkg = require(cwd + '/package.json')
  var deps = Object.keys(pkg.dependencies || {})
  var nm
  try {
    var nm = fs.readdirSync(path.resolve(cwd, 'node_modules'))
    nm = nm.filter(function (n) {
      return !/^\./.test(n)
    })
  } catch (er) {
    nm = []
  }

  if (nm.length) {
    console.log('依存パッケージがまだ残っているようです。')
    return cb(false)
  }

  if (deps.length) {
    console.log('ファイル自体は取り除けましたが, package.json 内のエントリー\n' +
                'が残っています。')
    return cb(false)
  }

  console.log(function () {/*
すばらしい。node_modules フォルダーからパッケージを取り除けました。
また、package.json ファイルを更新して、もはやそれらに依存していない
ということを反映させることができました。

これで完了です。
*/}.toString().split('\n').slice(1,-1).join('\n'))
  return cb(true)
}
