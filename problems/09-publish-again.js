var reg = require('../lib/registry.js')

var shop = require('../')
var fs = require('fs')
var path = require('path')
var semver = require('semver')

exports.problem = function () {
  if (!shop.cwd())
    return ''

  reg.run('publish')
  return function () { /*
何かしらのものを公開することはできました。しかし、健全なパッケージ
は、新しくて刺激的なバグフィックスと共に、何度も何度も更新されるもの
です。

同じバージョン番号を使い回すことはできません。なぜなら、そんなことを
すれば、npm レジストリを動かす動力源として、ベルトコンベヤの上をせっせ
と走っているロボットたちをとんでもなく混乱させることになってしまうから
です。しかし、みなさんは、前の課題でバージョン番号を変更したので、パッ
ケージを再度公開することができます。

では、やってみましょう。そして、`how-to-npm-jp verify` でご褒美をもらっ
てください。
*/}.toString().split('\n').slice(1,-1).join('\n')
}

//exports.solution = 'npm publish'

exports.verify = function (args, cb) {
  if (!shop.cwd())
    return cb(false)

  var pkg = require(shop.cwd() + '/package.json')
  var data = require(shop.datadir + '/registry/' + pkg.name + '/body.json')
  var ver = semver.clean(pkg.version)

  // should be more than one entry in the time obj, and the current
  // version should be in there.
  var releases = Object.keys(data.time).filter(function (v) {
    return v !== 'created' && v !== 'modified'
  })

  if (releases.length <= 1) {
    console.log('ありゃりゃ。\n' +
                'パッケージを公開していないようですね。\n' +
                '`npm publish` を実行してから、再度検証してみてください。')
    return cb(false)
  }

  if (releases.indexOf(ver) === -1) {
    console.log('うーむ... 2回以上公開したようではありますが、\n' +
                '現在のバージョン (%s) はその中にはありませんね。\n' +
                'こちらで確認した内容はこうなってます:\n' +
                '%s\n' +
                'もう１度公開してみてください。',
                ver, JSON.stringify(releases, null, 2))
    return cb(false)
  }

  console.log('わーお。これであなたも未来のTJames "Substack" Halidaychuk\n' +
              'ですね。もうだれも止められない。\n' +
              '`how-to-npm-jp` を実行して、次へ進んでください。\n\n' +
              '(訳注: Node.js 界には TJ Holowaychuk と substack こと James Halliday\n' +
              'という二人の有名人がいて、異常な数と質のモジュールをnpmに公開してい\n' +
              'ます)')
  reg.kill()
  return cb(true)
}
