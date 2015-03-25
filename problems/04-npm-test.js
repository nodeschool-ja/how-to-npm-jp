var reg = require('../lib/registry.js')

var shop = require('../')
var fs = require('fs')
var path = require('path')

exports.problem = function () {
  var cwd = process.cwd()
  if (!cwd)
    return ''

  return function () {/*
これまでのところで、パッケージをインストールし、`npm ls` を使うとなにが
起きるかを見ました。

package.json ファイルを見ると、次のような若干奇妙な記述があります:

  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },

npm はタスクランナーとして使うことができます。そして、ほとんどすべての
モジュールとプロジェクトでは、いずれテストスクリプトを追加し、それを
走らせて、問題がないかどうか確認できるようにします。これを忘れないよう
にするために、npm は、デフォルトで、常に失敗するテストを設定します。

まずは、`test.js` というファイルを作成します。`test.js` の中では、実際
にはなにもする必要はありません(これは、ただの npm のクラスで、テスト
用の特別なクラスではありません)。しかし、エラーはスローせずに終了しな
ければなりません。さもなくば、テストは失敗します。

それから、`package.json` ファイルを編集して、scripts セクションを次の
ように変更します:

  "scripts": {
    "test": "node test.js"
  },

これができたら、`how-to-npm verify` を実行してチェックしましょう。
*/}.toString().split('\n').slice(1,-1).join('\n')
}

//exports.solution = function () {/*
//sed -i '' -e 's/echo .*1"$/echo ok ; exit 0"/' package.json
//*/}.toString().split('\n').slice(1,-1).join('\n')

exports.verify = function (args, cb) {
  var cwd = shop.cwd()
  if (!cwd)
    return cb(false)

  var pj = require(cwd + '/package.json')

  if (!pj.scripts || !pj.scripts.test) {
    console.log('おおっと。`scripts.test` セクションが、package.json ファイル\n' +
                'の中にありません。編集して、再度実行してください。')
    return cb(false)
  }

  // try running the test!
  var exec = require('child_process').exec

  console.log('テストスクリプトを実行しています...\n\n')
  exec('npm test --color=always', function (er, stdout, stderr) {
    process.stdout.write(stdout)
    process.stderr.write(stderr)

    console.log('\n\n...完了')

    if (er) {
      console.log('ありゃりゃ、テスト失敗です。\n'+
                  'ちゃんと動作するテストを作成してください。')
      return cb(false)
    }

    console.log('おめでとうございます。通過するテストを書けました。\n'+
                '実際に動作するテストを書くのは、またの機会に取っておくことにしましょう。')
    return cb(true)
  })
}
