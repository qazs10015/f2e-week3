# 六角學院第三屆精神時光屋-第三週
## 前端個人組

[Demo](https://qazs10015.github.io/f2e-week3)

**由於第三方 API 免費會員 1 分鐘內只能有 5 次的呼叫次數，因此可能會有無法顯示資料的情況發生**

開發框架： Angular

 其他套件：[Angualr Material](https://material.angular.io/)、[Angular GoogleMap](https://github.com/angular/components/tree/master/src/google-maps)、[jssha(加密套件)](https://github.com/Caligatio/jsSHA)、[ngx-device-detector](https://github.com/KoderLabs/ngx-device-detector#readme)

資料來源：[TDX 運輸資料流通服務](https://tdx.transportdata.tw/api-service/swagger)

## 執行專案
```
git clone https://github.com/qazs10015/f2e-week3.git
npm install
npm start
```


## UI組設計師資料

[vum](https://2021.thef2e.com/users/6296432819610583154?week=3&type=1)、[figma 設計稿](https://www.figma.com/file/I9HRHRRM2xtTFhoGuJjcJn/The-F2E_week3?node-id=197%3A4243)

## 網站簡介

此網站支援 RWD 大部分可以做的功能都盡量完成了，除了 **附近站點** 的功能沒有實作(設計稿上無提供)，**班表查詢** 的功能已整合到 **公車動態**，所以無顯示此按鈕。
時間關係只有手機跟電腦的版本，平板會跑版。

### mobile (沒有 iphone X 所以用電腦模擬 😅😅😅)
![image](https://user-images.githubusercontent.com/30744341/143811585-9394916b-8f2b-45b7-97fd-d64f42c55f94.png)
![image](https://user-images.githubusercontent.com/30744341/143811598-94031c0a-2cfa-4cf4-aab8-1430f32504e0.png)
![image](https://user-images.githubusercontent.com/30744341/143811606-0cde09a1-b77d-4b10-a9be-ec50913823c7.png)
![image](https://user-images.githubusercontent.com/30744341/143811636-7866269f-0a63-41e3-9c65-0e743d6b6617.png)
![image](https://user-images.githubusercontent.com/30744341/143811649-3ab9b2c0-f1f2-4f51-b102-0a73174d8671.png)
![image](https://user-images.githubusercontent.com/30744341/143811658-ca8ebccc-775e-4c2a-bc1d-80489a42b11b.png)
![image](https://user-images.githubusercontent.com/30744341/143811909-fdea3a88-c956-4fa0-9c31-a6e188f641a2.png)


### web
![image](https://user-images.githubusercontent.com/30744341/143811780-53be055b-4465-4f98-96ca-6dae66be4a3e.png)
![image](https://user-images.githubusercontent.com/30744341/143811816-2def18f4-d906-471b-95d4-9687701688c1.png)
![image](https://user-images.githubusercontent.com/30744341/143811849-19e44d5a-8c17-41d3-9f73-ad19ccd9c9eb.png)
![image](https://user-images.githubusercontent.com/30744341/143811862-7d26e736-b60e-44c0-8335-a000327137f5.png)
![image](https://user-images.githubusercontent.com/30744341/143811885-6adeb91d-4e77-45b7-be41-e301e3034ee8.png)

## 專案架構

```
src
 | --- app
 |       | --- components (共用元件)
 |       | --- dialogs    (共用的 dialog)
 |       | --- pages      (所有頁面)
 |       | --- pipes
 |       | --- services   (所有使用到的 API)
 |       | --- shared     (任何共用或第三方模組)
 |
 | --- assets (images、icons、styles)
         
```

## GoogleMap API

[大部分有用到的API在第二週的介紹中](https://github.com/qazs10015/f2e-week2#googlemap-%E7%94%B3%E8%AB%8B%E6%B5%81%E7%A8%8B)

## 完賽心得

連續三週練習切板還有想辦法生出一樣的功能這件事情，讓我成長不少，也謝謝六角學院的 CSS 教學，我的 CSS 技巧又更好了

也感謝設計師可以弄出如此漂亮的設計稿讓前端工程師挑戰！

這個比賽很值得，但真的每天寫 code 好想吐 🤮🤮🤮



