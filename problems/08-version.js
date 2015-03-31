var reg = require('../lib/registry.js')

var shop = require('../')
var fs = require('fs')
var path = require('path')
var semver = require('semver')

exports.problem = function () {
  if (!shop.cwd())
    return ''

  // capture the current version in the datadir
  var pkg = require(shop.cwd() + '/package.json')
  var ver = semver.clean(pkg.version)
  if (!ver) {
    return 'package.json のバージョンフォーマットが不正なようです。\n' +
      '`npm help semver` でバージョン番号についてさらに学べます。\n' +
      '現在のバージョン: ' + pkg.version
  }

  var oldVer
  var verfile = shop.datadir + '/version'
  try {
    oldVer = fs.readFileSync(verfile, 'utf8')
  } catch (er) {
    oldVer = ver
    fs.writeFileSync(verfile, oldVer, 'utf8')
  }

  return function () { /*
npm のどのパッケージにも、それに関連付けられたバージョン番号がありま
す。みなさんがパッケージの更新版をリリースするときには、バージョン
番号もいっしょに更新します。

npm におけるバージョン番号は、"SemVer" と呼ばれる標準に従います。
"SemVer" は、"Semantic Version" の略です。この標準の仕様は、
http://semver.org に記載されています。

この仕様をかいつまんで言うと、次のようなバージョン番号のことです:

  1.2.3
  ^ ^ ^
  | | `-- パッチバージョン。変更毎に更新する。
  | `---- マイナーバージョン。APIを追加したときに更新する。
  `------ メジャーバージョン。APIの互換性がなくなったときに更新する。

npm には、`npm version` と呼ばれるバージョン番号用のコマンドがあって、
それを使うと、package.json ファイルを更新してくれます。さらに、もし
プロジェクトのディレクトリが git リポジトリなら、その変更をコミット
してくれます。`npm help version` でコマンドの使い方を詳しく学べます。

あるいは、機械による更新が不安なら、手動で package.json ファイルを
開いて、新しい番号を "version" フィールドに入れることもできます。

npm レジストリは、新しいパッケージを、パージョン番号の更新をせずには公開
させてくれません。決してです。ですので、公開するときには、常にバージョン
番号を上げるという考え方に慣れてください、たとえどんなに些細な変更だった
としても。

心配は無用です。整数は腐るほどありますから、たぶん使い切ることはできな
いでしょう。

それでは、バージョン番号を更新してください。そして、`how-to-npm verify`
でチェックしましょう。

*/}.toString().split('\n').slice(1,-1).join('\n')
}

//exports.solution = 'npm version patch'

exports.verify = function (args, cb) {
  if (!shop.cwd())
    return cb(false)

  var verfile = shop.datadir + '/version'
  var oldVer = fs.readFileSync(verfile, 'utf8')
  var pkg = require(shop.cwd() + '/package.json')
  var ver = semver.clean(pkg.version)
  if (!ver) {
    console.log('package.json のバージョンフォーマットが不正なようです。\n' +
      '`npm help semver` でバージョン番号についてさらに学べます。\n' +
      '現在のバージョン: ' + pkg.version)
    return cb(false)
  }

  if (ver === oldVer) {
    console.log('おっと。\n' +
                'バージョンが ' + oldVer + ' のままです。\n' +
                '`npm help version` で簡単なバージョン更新の方法を確認しましょう。')
    return cb(false)
  }

  console.log('よくできました。\n' +
              '`how-to-npm` を実行して、次のエキサイティングな課題に進んでください。')

  return cb(true)
}
