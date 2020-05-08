---
templateKey: blog-post
title: Generic Sensor API
date: 2020-05-08T03:27:32.519Z
description: Webでデバイスのセンサをいじってみる記事です．
featuredimage: /img/animalcrossing-arduino.jpeg
tags:
  - Generic Sensor API
  - Android
  - WebAPI
  - Chrome
---
![top](/img/animalcrossing-arduino.jpeg "top")

ブラウザからデバイス上のセンサの値を取得するAPIであるGeneric Sensor APIで遊んでみたくなったので使えるかどうか確認がてらブログ記事にしました．

## 作るもの

以前に，TwitterでArduinoかラズパイ+近接センサを使用して腕立て伏せの回数を測っている人を見ました，面白いアイデアだったのでとりあえずそれを同じようにスマホでブラウザからやってみることを目標にします．

#### 最終的な完成物

スマホに手を近づけると画面のカウンターが増えるデモです．

腕立てしている様子を自分で取るのは難しくてできませんでした笑

`youtube:https://www.youtube.com/embed/PH6q30R4lOg`

## 環境について

前提として，このAPIはSafariで対応されていないため，2020/5現在，iPhoneで使用することはできません．ただ，PCではなくセンサの内蔵されているスマートフォンから行いたいため，今回はAndroidデバイスを用意しました． 

### 最終的な環境

* デバイス：Huawei P30 lite
* ブラウザ：Mac版のChrome

## PCのChromeからAndroidのChromeをデバッグする

まず，Androidの Chromeのデバッグ機能が使えないと不便なのでその設定をします． できる人は読み飛ばしてください．

### 方法

Android側で開発者モードをOnにして，USBデバックを許可し，Chromeを開いておきます．その後，PCとUSBケーブルで繋ぎます． その状態で，PCのChromeで<chrome://inspect/#devices>にアクセスすると以下のような画面が出てくると思います．

![chrome-debug](/img/chrome-debug.png "chromeDebug")

その後inspectを押すとそのページのデバッグをPC上のChromeで行うことができます．

## flagの設定

2020/5現在のChromeでは，Generic Sensor APIを使用するのに必要なenable-generic-sensor-extra-classesというflagがデフォルトでdisabledになっているためこれをまずenabledにします．

### 方法

センサを使用したい端末で<chrome://flags>にアクセスして，generic-sensor-extra-classesを検索しそのflagをenabledに変更します．

![chrome-flag](/img/chrome-flag.png "chromeFlag")

## https

http経由ではこのGeneric Sensor APIを使えないようなので,自分でローカル環境へのSSL証明書設定を行うか，[ngrok](https://ngrok.com/)を使うか，デプロイするなどしてhttps経由で行ってください．

## 実装

以上で準備は終わったので実装に入っていきます． 近接センサがまだ実装されていないので今回は，環境光センサを使用します． 環境光が少なくなったらデバイスに頭が近いているとみなしてと腕立て伏せの回数をカウントしたいと思います．

### センサから値の取得

MDNで推奨されている方法通りに，PermissionAPIを用いて，使用するセンサータイプにあらかじめ許可を与えます．今回は'ambient-light-sensor'です．

その後，使用したいセンサを扱うオブジェクトを初期化します． この時に引数でセンサのサンプリング周波数を設定することができます． サンプリング周波数は，1秒間に取得するサンプル数のことでHzで表します． 今回は，腕立て伏せの回数を測るだけなので1秒間に5回（5Hz）もあれば十分だと思います．

センサの値を読み込んだ際のイベントリスナを登録します． この例では，1秒間に5回センサの出力がコンソールに表示されるように設定しました．

最後にstart()でセンサの読み取りを開始します．

#### main.js

```js{numberLines: true}
navigator.permissions.query({ name: 'ambient-light-sensor' })
.then(result => {
  if (result.state === 'denied') {
    console.log('Permission to use this sensor is denied.');
    return;
  }else if(result.state === 'granted') {
    console.log('Permission to use this sensor is granted.');
  } 

  //Sensorを扱う（サンプリング周波数:5Hz）
  const sensor = new AmbientLightSensor({frequency: 5});

  //センサの値を読み取った際のイベントリスナ
  sensor.addEventListener('reading', e => {
    const value = sensor.illuminance;
    console.log(value);
  })

  sensor.addEventListener('error', event => {
    console.log(event.error.name, event.error.message);
  })

  sensor.start()
});
```

### 腕立てカウントの実装

センサの絶対的な値が毎回変わる可能性があるので最初にキャリブレーションしておきます．

単純に暗いかどうかで腕立て伏せをカウントしています．

#### sample.js

```js{numberLines: true}
let sensor;

const params = {
  start: true,        //腕立てカウント中か
  counter: 0,         //腕立てカウンタ
  before: 0           //前の状態
}
const calibration = { //センサの値のキャリブレーション
  flag: true,
  value: 0
}

navigator.permissions.query({ name: 'ambient-light-sensor' })
.then(result => {
  if (result.state === 'denied') {
    console.log('Permission to use this sensor is denied.');
    return;
  }else if(result.state === 'granted') {
    console.log('Permission to use this sensor is granted.');
  } 

  sensor = new AmbientLightSensor({frequency: 5});

  //値を読み取った際
  sensor.addEventListener('reading', e => {
    const value = sensor.illuminance;
    //キャリブレーション（最初だけ）
    if(calibration.flag){
      calibration.value=value;
      calibration.flag=false;
    }else{//通常時
      if((calibration.value/2>=value)&&(params.before>value)){
        //カウンタの更新
        params.counter++;
        document.getElementsByTagName("h1")[0].innerText = params.counter;
      }
    }
    //前の状態を保存
    params.before=value;
  })

  sensor.addEventListener('error', event => {
    console.log(event.error.name, event.error.message);
  })
});

//ボタン押下時
function pressed() {
  params.start=!params.start;
  //センサの読み取りの開始/終了
  document.getElementsByTagName("button")[0].innerText = (params.start)?"開始":"終了";
  (params.start)?sensor.stop():sensor.start();

  //カウンタの更新
  params.counter=0;
  document.getElementsByTagName("h1")[0].innerText = params.counter;
}
```

#### index.html

```html{numberLines: true}
<!DOCTYPE html>
  <head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <title>Sensor</title>
    <meta name="description" content="Sensor">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link rel="stylesheet" href="./main.css">
  </head>
  <body>
    <div class="parent">
      <h1>0</h1>
      <button class="button-sensor" onclick="pressed()">開始</button>
    </div>
    <script src="./main.js" async defer></script>
  </body>
</html>
```

## 終わりに

以上の手順で作成できました．

腕立て伏せしている様子を自分で取るのは難しくてできませんでした笑 `youtube:https://www.youtube.com/embed/PH6q30R4lOg`

他にも加速度センサなどがあるので信号処理の勉強がてら遊び倒してみたいと思います． また時間があったらブログに書こうと思います．

## 参考文献

[MDN：Generic Sensor API](https://developer.mozilla.org/en-US/docs/Web/API/Sensor_APIs)

[Google developers：Sensors-for-the-web](https://developers.google.com/web/updates/2017/09/sensors-for-the-web)
