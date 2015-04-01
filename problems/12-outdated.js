var reg = require('../lib/registry.js')

var shop = require('../')
var fs = require('fs')
var path = require('path')

exports.problem = function () {
  if (!shop.cwd())
    return ''

  // If it hasn't already been done, add a new version of once.
  var once = require(shop.datadir + '/registry/once/body.json')
  if (once['dist-tags'].latest === '1.3.0') {
    // publish an update
    shop.cpr(path.resolve(__dirname, '..', 'lib', 'registry-assets-update'),
             path.resolve(shop.datadir, 'registry'))
  }

  reg.run('outdated')

  return function () { /*
前回までに、依存パッケージがでてきて、それから、自分のパッケージを繰
り返し更新する方法について学びました。ここでひとつの疑問が浮かびます。
もし他の誰かが、依存パッケージを更新したときには、どうすればいいで
しょう。

最初のステップは、更新を検知することです。幅を持ったバージョンでもって
依存性を定義しており、各々のリリースは、名前とバージョンの一意な組み
合わせで識別できることから、`npm outdated` コマンドで機械的に互換性
のあるリリースを検出することができます。

この課題をパスするために、`how-to-npm-jp verify PKG` を実行してください。
ただし、`PKG` は古くなってしまったパッケージの名前とします。
*/}.toString().split('\n').slice(1,-1).join('\n')
}

//exports.solution = 'npm outdated; how-to-npm-jp verify once'

exports.verify = function (args, cb) {
  if (!shop.cwd())
    return cb(false)

  var arg = args.join('').toLowerCase()
  if (arg === 'once') {
    console.log(function () {/*
正解です。`once` パッケージは、しばらく見ないうちに更新されていました。

次の講義では、古くなってしまったパッケージを更新する方法について学びます。
*/}.toString().split('\n').slice(1,-1).join('\n'))
    reg.kill()
    return cb(true)
  }

  if (!arg || arg === 'pkg') {
    console.log('`how-to-npm-jp verify PKG` を実行してください。ただし、`PKG` を\n' +
                '古くなってしまったパッケージ名と置き換えて。')
  } else if (arg !== 'once') {
    console.log('違います。%s ではありません。もう１度。', arg)
  }

  return cb(false)

}
