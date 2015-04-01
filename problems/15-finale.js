var reg = require('../lib/registry.js')

var shop = require('../')
var fs = require('fs')
var path = require('path')

exports.problem = function () {
  if (!shop.cwd())
    return ''


  return function () { /*

おわかれを言うときが近付いてきました。けれど心配はいりません。この
ワークショッパーはあくまで入門編なのですから。これまでの課題がすべて
終わったら、`how-to-npm-jp verify` を実行して、この小さなアドベンチャー
を越えたあとに待っている、さらなるステップについて学んでください。

*/}.toString().split('\n').slice(1,-1).join('\n')
}

//exports.solution = 'npm xmas'

exports.verify = function (args, cb) {
  if (!shop.cwd())
    return cb(false)

  var total = shop._adventures.length
  var completed = shop.state.completed.length
  var remain = total - completed

  // the 1 remaining would be this one, of course
  if (remain > 1) {
    console.log('まだやることがあるみたいですよ。')
    return cb(false)
  }

  console.log(function () {/*
npm ができることは、まだまだ他にもあります。時間がなかったため、この小さな
ワークショップでカバーできなかったのは、例えばこんなことです:

1. アプリを複数のモジュールに分割する
2. プライベートなコードをチームメイトと共有するために、スコープ付き
   モジュールを使う
3. 他のおもしろい npm コマンド、たとえば、`edit` や `bugs` や `explore`

まだ他にも、npm でできる興味深いことをたくさん学べます。
「こんなことをするモジュールがあるはずだ」と考えることから、すべては始るの
です。

https://www.npmjs.com/ で冒険がみなさんを待っています。

ではまた、インターネットでお会いしましょう。

*/}.toString().split('\n').slice(1,-1).join('\n'))

  reg.kill()
  return cb(true)
}
