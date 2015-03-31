var reg = require('../lib/registry.js')

var shop = require('../')
var fs = require('fs')
var path = require('path')

exports.problem = function () {
  if (!shop.cwd())
    return ''

  reg.run('update')

  return function () { /*
もちろん、古くなったパッケージを明示的にチェックしてから、
`npm install` を実行して更新するやりかたでもうまくいきます。

しかし、もうすこし楽をしたいのであれば、そのために用意された npm
コマンドがあります。そのコマンドを実行すれば、すべての依存パッケージを
package.json に記述されている許容可能な最大のバージョンまで引き上げら
れます。

どのコマンドだか当てられるでしょうか(`npm help` でコマンド一覧が見られ
ます)。

すべての依存パッケージを可能な限り新しいバージョンに更新してから、
`how-to-npm verify` を実行して、緑色の素敵なバナーを表示させましょう。
*/}.toString().split('\n').slice(1,-1).join('\n')
}

//exports.solution = 'npm install once'

exports.verify = function (args, cb) {
  if (!shop.cwd())
    return cb(false)

  var once = require(shop.cwd() + '/node_modules/once/package.json')
  if (once.version !== '1.3.1') {
    console.log('おっと、まだ古いバージョンを使っていますね。')
    return cb(false)
  }

  reg.kill()
  console.log('すばらしい。最新版にできました。\n' +
              '`how-to-npm` を実行して次の課題に進んでください。')
  return cb(true)
}
