// ==UserScript==
// @name         removeShopeeCart
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  批量刪除蝦皮購物車商品
// @author       You
// @match        https://shopee.tw/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=shopee.tw
// @grant        none
// @require      https://code.jquery.com/jquery-3.6.0.min.js
// @require      https://code.jquery.com/ui/1.12.1/jquery-ui.min.js
// ==/UserScript==

(function () {
  "use strict";

  $(document).ready(function () {
    let deleteTimer;
    let deleteButtonList = [];

    // 創建菜單
    const createMenu = () => {
      const menu = $('<div id="shopeeCartToolKit"></div>');
      menu.html(`
            <div id="container">
              <div id="batchRemove">批量刪除</div>
              <div id="stopRemove">停止</div>
            </div>
          `);
      // 設置菜單的樣式，置於左邊中間
      menu.css({
        position: "fixed",
        top: "50%",
        left: "20px",
        transform: "translateY(-50%)",
        "background-color": "white",
        border: "1px solid #ccc",
        "border-radius": "15px",
        padding: "10px",
        cursor: "move",
        "z-index": "9999",
        "box-shadow": "rgba(0, 41, 83, 0.25) 0px 6px 28px 0px",
      });

      // Container styles
      let container = menu.find("#container");
      container.css({
        width: "65px",
        height: "80px",
        padding: "15px",
        display: "flex",
        "justify-content": "space-evenly",
        "flex-direction": "column",
      });

      container
        .find("*")

        .css({
          cursor: "pointer",
        })
        .hover(
          function () {
            $(this).css({
              color: "blue",
            });
          },
          function () {
            $(this).css({
              color: "black",
            });
          }
        );

      menu.draggable();

      $("body").append(menu);
    };

    // 初始化
    createMenu();

    const findAndClickDeleteButton = (text) => {
      deleteTimer = setInterval(function () {
        deleteButtonList[0].click();
        deleteButtonList.splice(
          deleteButtonList.indexOf(deleteButtonList[0]),
          1
        );
      }, 2000);
    };

    const fn1 = $("#batchRemove");
    const fn2 = $("#stopRemove");

    fn1.click(function () {
      const buttons = $("button");

      buttons.each(function () {
        if ($(this).text().trim() === "刪除") {
          deleteButtonList.push(this);
        }
      });

      const result = confirm(
        `畫面上目前有 ${deleteButtonList.length} 件商品，確定執行刪除嗎?`
      );

      if (result) {
        alert("開始刪除");
        findAndClickDeleteButton();
      } else {
        alert("停止刪除");
      }
    });

    fn2.click(function () {
      clearInterval(deleteTimer);
      alert("自動刪除已停止");
    });
  });

  setInterval(() => {
    let imgWithObjectfit = $("img").filter(function () {
      return $(this).css("object-fit") === "contain";
    });

    $(imgWithObjectfit)
      .parent()
      .parent()
      .parent()
      .hover(
        function () {
          // 滑鼠進入圖片時的處理
          $(this).css({
            transform: "scale(2)" /* 將圖片放大 20% */,
          });
        },
        function () {
          // 滑鼠離開圖片時的處理
          $(this).css({
            transform: "scale(1)" /* 還原原始大小 */,
          });
        }
      );
  }, 3000);
})();
