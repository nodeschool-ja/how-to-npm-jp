var reg = require('../lib/registry.js')

var shop = require('../')
var fs = require('fs')
var path = require('path')

exports.problem = function () {
  var cwd = shop.cwd()
  if (!cwd)
    return ''

  var pkg = require(cwd + '/package.json')
  var id = pkg.name + '@' + pkg.version

  return function () { /*
ここまでで、 package.json ファイルを作成しました。しかし、そのファイル
には、ユーザーがふつうあって欲しいと思うものがすこし欠けています。
`npm install` とタイプすると、以下のように表示されるでしょう:

    npm WARN package.json %ID% No description
    npm WARN package.json %ID% No repository field.
    npm WARN package.json %ID% No README data

このすばらしい仕事を世界に向けて共有する前に、もうすこしプロジェクト
を洗練させて、ユーザーが使用方法を理解できるようにする必要があります。

まずは、README.md ファイルを作成し、説明を書いておきます。

それから、"repository" フィールドを package.json ファイルに追加し、
ユーザーがコードにアクセスできるように URL を記述します。

自分の手で package.json を編集してもいいですし、`npm init` を再度実行
してもかまいません。

終わったら、`how-to-npm-jp verify` を実行します。
*/}.toString().split('\n').slice(1,-1).join('\n').replace(/%ID%/g, id)
}

//exports.solution = function () {/*
//echo 'some docs' > README.md
//sed -i '' -e 's#^}#,"repository":"git://git.git","description":"foo"}#' package.json
//*/}.toString().split('\n').slice(1,-1).join('\n')


exports.verify = function (args, cb) {
  //TODO: DRY this up.  It's getting rather tedious.
  var datadir = shop.datadir
  // verify we're in the right folder
  var cwd = shop.cwd()
  if (!cwd)
    return cb(false)

  // make sure we get no warnings 
  var exec = require('child_process').exec
  var npm = require('which').sync('npm')
  exec(npm + ' i', function (er, stdout, stderr) {
    if (er) {
      process.stdout.write(stdout)
      process.stderr.write(stderr)

      console.log('\nあれれ\n' +
                  'なにかがおかしいですね')
      return cb(false)
    }

    stderr = (stderr + '').trim()
    if (stderr.match(/npm WARN package\.json/)) {
      console.log('\nおしい。\n' +
                  'まだ直すところがあります。\n\n'+
                  stderr + '\n')
      return cb(false)
    }

    console.log('よくなりましたね。\n' +
                'README やメタデータの欠けたパッケージは、大量の JavaScript\n' +
                'だけあって、使い方の説明も git リポジトリへのリンクもない\n' +
                'ようなものです。')
    return cb(true)
  })
}
