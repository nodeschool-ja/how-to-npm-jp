var reg = require('../lib/registry.js')

var shop = require('../')
var fs = require('fs')
var path = require('path')

exports.problem = function () {
  if (!shop.cwd())
    return ''

  reg.run('dist-tag')
  return function () { /*
前回の課題で、一つあるいはそれ以上の配布タグを追加しました。
今度はそれらをお掃除しましょう。

削除することのできない配布タグがひとつだけあって、それは"latest"
です。なぜなら、 各パッケージは、デフォルトで "latest" タグを追加
して、そのタグが特殊な意味を持つようにするからです。

"latest" が異なるバージョンを指したり、あるいは、それ以外のタグでし
たら削除することができます。

消せるタグをすべて消してください、そして、"latest" が最新のリリース
以外を指すようにしてください。

`npm help dist-tag` を実行して、このコマンドをさらに学んでください。
*/}.toString().split('\n').slice(1,-1).join('\n')
}

//exports.solution = function () {/*
//npm dist-tag add test@1.0.0 latest
//npm dist-tag rm test old
//*/}.toString().split('\n').slice(1,-1).join('\n')

exports.verify = function (args, cb) {
  var cwd = shop.cwd()
  if (!cwd)
    return cb(false)

  var pkg = require(cwd + '/package.json')
  var name = pkg.name

  var body = require(shop.datadir + '/registry/' + name + '/body.json')
  var dt = body['dist-tags']
  var tags = Object.keys(dt)
  if (tags.length > 1) {
    console.log('おっ, 余計な配布タグがあるようです。')
    console.log('`npm help dist-tag` を使って、タグを消す方法を学んでください。')
    return cb(false)
  }

  var time = body.time
  var mostRecentTime = ''
  var mostRecentVersion
  for (var v in time) {
    if (!body.versions[v])
      continue
    if (time[v] > mostRecentTime) {
      mostRecentTime = time[v]
      mostRecentVersion = v
    }
  }

  if (dt.latest === mostRecentVersion) {
    console.log('おっと、"latest" がまだ最新のリリースを指したままのようです。\n' +
                '最新以外のものを指すようにしてから `how-to-npm verify` を\n'+
                '再度実行してください。\n' +
                '`npm help dist-tag` を使用して、タグの削除方法を学んでください。',
                mostRecentVersion)
    return cb(false)
  }

  console.log(function () {/*
おめでとうございます。もはや配布タグのプロですね。

`how-to-npm` を実行して次の課題に進んでください。
*/}.toString().split('\n').slice(1,-1).join('\n'))
  reg.kill()
  return cb(true)
}
