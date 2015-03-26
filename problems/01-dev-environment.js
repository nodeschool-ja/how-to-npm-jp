// Old-sk00l multi-line strings
exports.problem = function () { /*
なんと言ってもnpmの一番重要な役割は、パッケージをインストールすることです。

しかしながら、お行儀のいいワークショッププログラムであるためにも、みなさ
んのコンピューターのそこかしこにファイルを散らばらせたりは、したくありま
せん。ですので、先に進む前に、ワークショップ用の開発環境を準備しましょう。

まず、新しいディレクトリを作成して、その中に `cd` してください。

それから、`npm init` を実行し、package.json ファイルを作成します (追加の
課題のために、そのディレクトリを git リポジトリとしてもセットアップしてお
きましょう)。

準備ができたら、`$ADVENTURE_COMMAND verify` を実行します。以降このチュート
リアルで実行する作業は、すべてこのフォルダの中で行います。
*/}.toString().split('\n').slice(1,-1).join('\n')

//exports.solution = function () {/*
//mkdir test
//cd test
//npm init
//# fill in all the prompts
//
//# Extra Credit:
//git init
//*/}.toString().split('\n').slice(1,-1).join('\n')

var shop = require('../')
var fs = require('fs')
var path = require('path')

exports.verify = function (args, cb) {
  var datadir = shop.datadir
  var cwd = process.cwd()
  if (path.resolve(cwd, 'problems', path.basename(__filename)) === path.resolve(__filename)) {
    console.log('ワークショッパーのルートにいるようです。\n' +
                'そこで作業するのはあまりよくありません。新しいディレクトリを作成して\n' +
                'それを使いましょう。')
    return cb(false)
  }

  if (cwd === process.env.HOME || cwd === process.env.USERPROFILE) {
    console.log('ホームディレクトリにいるようです。\n' +
                'そこで作業するのはあまりよくありません。新しいディレクトリを作成して\n' +
                'それを使いましょう。')
    return cb(false)
  }

  var pkg
  try {
    pkg = require(cwd + '/package.json')
  } catch (er) {
    console.log('package.json が見付かりません。\n' +
                '`npm init` を作業ディレクトリで実行してください。')
    return cb(false)
  }

  if (/^extracredit$/i.test(args[0] + args[1])) {
    try {
      fs.readFileSync(path.resolve(cwd, '.git', 'config'))
      console.log('追加課題もできましたね。お見事。\n')
    } catch (er) {
      console.log('おっ、git に関する部分以外はできましたね。\n' +
                  'npm の規約では、モジュールひとつにつき、git リポジトリ\n' +
                  'ひとつ、となっています。ですので、通常、プロジェクト\n' +
                  'のルートで、`git init` を実行するはずです。\n' +
                  '.git フォルダを他の場所に作ってしまった場合、それを削除\n' +
                  'して、`git init` を ' + cwd + ' で実行します。')
      return cb(false)
    }
  } else {
    console.log('追加課題として、 このディレクトリを git リポジトリとして\n' +
                'セットアップしてみましょう。\n\n' +
                'npm の規約では、各モジュールやプロジェクトが、git リポジトリ\n' +
                'をひとつ持つことになっています。`git init` コマンドを使用すれば、\n' +
                '作業ディレクトリを git プロジェクトとしてセットアップできます。\n\n' +
                'それから、`how-to-npm verify extra credit` を実行します。\n\n')
  }

  console.log(
    'おめでとうございます。\n' +
    'npm パッケージを作成できました。パッケージの内容を知りたければ、\n' +
    'package.json ファイルを見てみましょう\n' +
    '\n' +
    'これ以降、ワークショップの作業はこのディレクトリ内で行うように\n' +
    'してください。' +
    '\n' +
    '`.npmrc` というファイルがあることに気付きましたか。\n' +
    'このファイルは、ふつうは要りませんが、このワークショップでは、\n' +
    '`.npmrc` を使って、インターネットと繋っているように見せかけます\n' +
    '(実際にはインターネットにアクセスしません)。'
  )

  // Save the cwd so that we can ensure we're in the right place from now on
  fs.writeFileSync(path.resolve(datadir, 'cwd'), cwd)

  // Write the .npmrc file telling it to always use our local registry.
  var conf = fs.readFileSync(path.resolve(__dirname, '..', 'workshop-npmrc'), 'utf8')
  conf = conf.replace(/%USERCONFIG%/g, path.resolve(datadir, 'npmrc'))

  fs.writeFileSync(path.resolve(cwd, '.npmrc'), conf)

  return cb(true)
}
