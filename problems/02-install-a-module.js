var reg = require('../lib/registry.js')
var shop = require('../')
var fs = require('fs')
var path = require('path')

exports.problem = function () {
  if (!shop.cwd())
    return ''

  reg.run("install-a-module")

  return function () { /*
ほとんどの人が npm で一番最初にやることは、依存パッケージのインストールです。

依存パッケージは、レジストリから取得して、`node_modules` フォルダに展開
されます。

モジュールをインストールするためには、`npm install <モジュール名>`
コマンドを使います。

このチュートリアルで使用するレジストリは、https://registry.npmjs.org
のミニチュア版です。ですので、レジストリにすこししかパッケージがない
ことに気付くかもしれません。

まずは、"once" モジュールのインストールからはじめましょう。

インストールができたら、`$ADVENTURE_COMMAND verify` を実行します。
*/}.toString().split('\n').slice(1,-1).join('\n')
}

//exports.solution = 'npm install once'

exports.verify = function (args, cb) {
  var cwd = shop.cwd()
  if (!cwd)
    return cb(false)

  try {
    var once = require(cwd + '/node_modules/once')
  } catch (er) {
    console.log('おっと、パッケージが正しくインストールされていないようです。\n'+
                '発生したエラー: \n' +
                (er.stack || er.message) + '\n' +
                '`npm install once` コマンドを実行して `once` モジュールを\n' +
                'インストールをしましたでしょうか。確認してください。')
    return cb(false)
  }

  console.log('おめでとうございます。パッケージのインストールができました。')
  reg.kill()

  return cb(true)
}
