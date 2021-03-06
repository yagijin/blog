---
templateKey: blog-post
title: Lily58にThinkPadのトラックポイントをつける
date: 2020-10-17T13:18:29.112Z
description: 自作キーボードのLily58にThinkPadのトラックポイントをつけました．
featuredimage: /img/trackpoint0.jpg
tags:
  - デバイス
  - 自作キーボード
  - トラックポイント
  - Lily58
---
## デバイス

まずジャンク品のThinkPadを購入して，トラックポイントの基盤部分を取り出しました．

![trackpoint1](/img/trackpoint1.jpg "trackpoint1")

ThinkPadのトラックポイントにもいくつか型があるみたいで，
[このサイト](https://deskthority.net/wiki/TrackPoint_Hardware)に一覧が載っているので，自分の基盤のピン情報を確認しました．

僕のトラックポイントはT400という型でした．

今回の方針として，クリックボタン機能をキーに割り当てて，トラックポイントはカーソル機能だけ使おうと思うので，使用するのはクロック，データ，電源（VCCとGND），リセットの5つのピンだけになります．
今回は，ProMicroもトラックポイントも5V動作であったため，変圧する必要がありませんでした．

先ほどのサイトに，ProMicroで使用する際の回路図をのせてくれているので，それの通りに回路を実装します．

最初はこのくらい大きくなってしまったのですが，

![trackpoint2](/img/trackpoint2.jpg "trackpoint2")

ここまで小型化できました．

![trackpoint4](/img/trackpoint0.jpg "trackpoint4")

## ソフトウェア

[QMK Firmware](https://github.com/qmk/qmk_firmware)を直接編集します．
すでに[ps2形式のマウスがサポートされている](https://docs.qmk.fm/#/feature_ps2_mouse?id=ps2-mouse-support)のでドキュメント通りに実装すれば終わりです．

今回は,Lily58でOLEDに使用しているピンを割り当てたいので，公式では非推奨のBusywaitバージョンの方法で実装します．

また，トラックポイントは左手につけるので左手のrules.mkとconfig.hを編集します．

まず，PS2Mouseを有効化して，OLEDを無効化します．

#### rules.mk

```{numberLines:true}
PS2_MOUSE_ENABLE = yes
PS2_USE_BUSYWAIT = yes
OLED_DRIVER_ENABLE= no
```

たまたま使用しているピンがD1とD2だったので公式の例通りの実装になります．
ここら辺はProMicroの回路図とキーボードの配線パターンを見ればどのピンが使用されているかわかります．

#### config.h

```c{numberLines:true}
#ifdef PS2_USE_BUSYWAIT
#   define PS2_CLOCK_PORT  PORTD
#   define PS2_CLOCK_PIN   PIND
#   define PS2_CLOCK_DDR   DDRD
#   define PS2_CLOCK_BIT   1
#   define PS2_DATA_PORT   PORTD
#   define PS2_DATA_PIN    PIND
#   define PS2_DATA_DDR    DDRD
#   define PS2_DATA_BIT    2
#endif
```

以下のように角度を指定して，トラックポイントの軸を回転することもできるのでデバイスに好きな向きで取り付けられます．

#### config.h

```c{numberLines:true}
#define PS2_MOUSE_ROTATE 270
```

プログラムがかけたらProMicroに焼いて完成です．

## 完成

![trackpoint3](/img/trackpoint3.jpg "trackpoint3")

自分はまだないですが，Busywaitバージョンでは，時々キーの取りこぼしがあるみたいなので
時間があるときにUSARTかInterruptバージョンに実装し直したいと思います．

## 自作キーボード便利アイテム

<iframe style="width:120px;height:240px;" marginwidth="0" marginheight="0" scrolling="no" frameborder="0" src="//rcm-fe.amazon-adsystem.com/e/cm?lt1=_blank&bc1=000000&IS2=1&bg1=FFFFFF&fc1=000000&lc1=0000FF&t=yagijinblog-22&language=ja_JP&o=9&p=8&l=as4&m=amazon&f=ifr&ref=as_ss_li_til&asins=B01MXCKHAM&linkId=3572424633128caadcd31cee7b65f620"></iframe>

<iframe style="width:120px;height:240px;" marginwidth="0" marginheight="0" scrolling="no" frameborder="0" src="//rcm-fe.amazon-adsystem.com/e/cm?lt1=_blank&bc1=000000&IS2=1&bg1=FFFFFF&fc1=000000&lc1=0000FF&t=yagijinblog-22&language=ja_JP&o=9&p=8&l=as4&m=amazon&f=ifr&ref=as_ss_li_til&asins=B08FKWK3VV&linkId=062a2968c78d92bbc4cd1806b0e86963"></iframe>