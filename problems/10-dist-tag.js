var reg = require('../lib/registry.js')

var shop = require('../')
var fs = require('fs')
var path = require('path')

exports.problem = function () {
  if (!shop.cwd())
    return ''

  reg.run('dist-tag')
  return function () { /*
npm に公開されたパッケージは、いずれも `dist-tags` (配布タグ)
エントリーを持っていて、それらは、 "latest" のような文字列を "1.2.48"
のようなバージョン番号にマッピングします。

デフォルトでは、"latest" タグの付いたバージョンがインストールされます。
パッケージを公開すると、公開したバージョンに "latest" というタグが付け
られます。これは概ね良好に機能します、なぜなら、ほとんどの場合、みなさ
んがなにかを公開するときには、ユーザーがそれを使える用意は整っているは
ずだからです。

しかしながら、もしなにかを公開する必要があって、しかも、それを
デフォルトバージョンのパッケージにしたくないなら(例えば、レガシーな
バージョンに対するセキュリティーリリースなど)、`dist-tag` 機能を
使うことで、手動でそれらの配布物のタグを管理できます。

`npm help dist-tag` を実行すれば、もっと詳しく学べます。

パッケージに配布タグを付与してみてください。
*/}.toString().split('\n').slice(1,-1).join('\n')
}

//exports.solution = 'npm dist-tag add test@1.0.0 old'

exports.verify = function (args, cb) {
  var cwd = shop.cwd()
  if (!cwd)
    return cb(false)

  var pkg = require(cwd + '/package.json')
  var name = pkg.name

  var body = require(shop.datadir + '/registry/' + name + '/body.json')
  var dt = body['dist-tags']
  var tags = Object.keys(dt)
  if (tags.length === 1) {
    console.log('おっと、配布用のタグがまだ一つしかないようです。')
    console.log('`npm help dist-tag` を使用して、どうやってタグを追加する')
    console.log('のか学んでください')
    return cb(false)
  }

  console.log(function () {/*
おめでとうございます。配布タグを追加できました。

この機能は、リリースを管理するのに便利です。たとえば、npm 自体の
プロジェクトでは、それぞれ新しいバージョンを ('latest' の替わりに) 'next'
として公開して、ベータユーザーが、デフォルトになる前のものをテストできる
ようにしています。

`how-to-npm` を実行して、次の課題に進んでください。
*/}.toString().split('\n').slice(1,-1).join('\n'))
  reg.kill()
  return cb(true)
}
