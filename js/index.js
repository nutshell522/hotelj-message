window.onload = function () {
    // 讓重置頁面按鈕綁訂重置功能
    document.getElementById("refresh").ondblclick = function () {
        window.location.reload()
    }

    /*  
        當姓名欄失焦時，需提醒確認性別
    */
    // 遍歷所有姓名框
    for (let i = 0; i < document.getElementsByClassName("name").length; i++) {

        // 創建保存定時器的變量
        var timer1
        // 將姓名欄綁定失焦後性別提醒功能
        document.getElementsByClassName("name")[i].onblur = function () {
            // 關閉上個複製成功定時器
            clearInterval(timer1);
            if (document.getElementsByClassName("name")[i].value != "") {
                // 提示請確認性別
                document.getElementsByClassName("gender-tip")[i].innerHTML = "** 請記得確認性別 **"
                // 開啟定時器，時間到將複製成功提示刪除
            }
            timer1 = setInterval(function () {
                document.getElementsByClassName("gender-tip")[i].innerHTML = ""
            }, 3200)
        }
    }


    // 獲得今天日期
    var today = new Date()
    // 預設退房日期(明日)
    var tomorrow = new Date()
    // 重新賦值退房日期的年月日(預設為入住日期加一天)
    tomorrow.setFullYear(today.getFullYear())
    tomorrow.setMonth(today.getMonth())
    tomorrow.setDate(today.getDate() + 1)

    /* 
        設定有關入住日/退房日/天數的功能
    */
    // 遍歷所有的入住日輸入框
    for (let i = 0; i < document.getElementsByClassName("check-in").length; i++) {


        /* 
        將日期及天數內容賦值
        */
        // 入住日
        document.getElementsByClassName("check-in")[i].value = dateString(today)
        // 退房日
        document.getElementsByClassName("check-out")[i].value = dateString(tomorrow)
        // 天數
        document.getElementsByClassName("days")[i].value = 1


        /* 
        替入住日綁訂內容變更事件
        */
        document.getElementsByClassName("check-in")[i].addEventListener('change', function (e) {
            // 判斷所選日期是否小於今天
            if (Date.parse(document.getElementsByClassName("check-in")[i].value) > Date.parse(today) || document.getElementsByClassName("check-in")[i].value == dateString(today)) {
                // 如果大於等於今天，還原提示框
                document.getElementsByClassName("date-hint")[i].innerHTML = ""
            } else {
                // 如果小於今天，跳出提示文字
                document.getElementsByClassName("date-hint")[i].innerHTML = "** 注意，所選入住日期小於今天日期 **"
            }

            // 將新得到的入住日期的值，轉成JS日期格式
            let checkIn = new Date(document.getElementsByClassName("check-in")[i].value)
            // 定義退房日期
            let checkOut = new Date
            // 重新賦值退房日期的年月日(預設為入住日期加一天)
            checkOut.setFullYear(checkIn.getFullYear())
            checkOut.setMonth(checkIn.getMonth())
            checkOut.setDate(checkIn.getDate() + 1)

            // 將退房日期格式轉換為文字框內格式()
            document.getElementsByClassName("check-out")[i].value = dateString(checkOut)
            // 天數返回預設值 1
            document.getElementsByClassName("days")[i].value = 1
        }, false);


        /* 
        替退房日綁訂內容變更事件
        */
        document.getElementsByClassName("check-out")[i].addEventListener('change', function (e) {
            // 判斷所選日期
            if (!(document.getElementsByClassName("check-out")[i].value > document.getElementsByClassName("check-in")[i].value)) {
                alert("退房日期需大於入住日期")
                document.getElementsByClassName("check-out")[i].value = dateString(checkOut)
            }

            document.getElementsByClassName("days")[i].value = parseInt((Date.parse(document.getElementsByClassName("check-out")[i].value) - Date.parse(document.getElementsByClassName("check-in")[i].value)) / 24 / 3600 / 1000)
        }, false);



        /* 
            替天數綁訂內容變更事件
        */
        document.getElementsByClassName("days")[i].set1(function () {
            // 定義入住日期內的值
            let checkIn = new Date(document.getElementsByClassName("check-in")[i].value)
            // 定義退房日期
            let checkOut = new Date()

            // 重新賦值退房日期的年月日
            checkOut.setFullYear(checkIn.getFullYear())
            checkOut.setMonth(checkIn.getMonth())
            // 由於拿到的天數值為字串，故須將字串轉為數字
            checkOut.setDate(checkIn.getDate() + parseInt(document.getElementsByClassName("days")[i].value))
            // 將退房日期格式轉換為文字框內格式()
            document.getElementsByClassName("check-out")[i].value = dateString(checkOut)
        })
    }

    // 定義 "標準" 頁籤
    const stdTab = document.getElementById("std-tab")



    /* 
        替間數綁訂內容變更事件
    */
    // 遍歷間數輸入框   
    for (let i = 0; i < document.getElementsByClassName("room-count").length; i++) {
        // 綁定間數框操作事件
        // 判斷間數是否小於1，如小於1，更正為1
        document.getElementsByClassName("room-count")[i].set1()
    }
    // 定義標準頁面裡的加價框 
    let extraFeeWrapper1 = stdTab.getElementsByClassName("extra-fee-wrapper")[0]
    // 將加價框裡綁定所有加價系統功能
    extraFeeWrapper1.extraFee1Rule()

    /* 
        替新增按鈕綁定新增功能
    */
    for (let i = 0; i < document.getElementsByClassName("crt").length; i++) {
        // 替新增按鈕綁定新增功能
        document.getElementsByClassName("crt")[i].onclick = crtA
    }



    // 替 標準頁面 送出按鈕綁定獲得文字功能 
    document.getElementById("submit1").onclick = function () {

        // 獲得姓名
        let name = stdTab.getElementsByClassName("name")[0].value
        // 定義性別
        let gender
        // 定義性別單選框
        let radio = stdTab.getElementsByClassName("gender")

        // 判斷並獲得性別
        for (let i = 0; i < radio.length; i++) {
            if (radio[i].checked) {
                gender = radio[i].value
            }
        }

        // 定義入住日
        let checkIn = new Date(stdTab.getElementsByClassName("check-in")[0].value)
        // 定義退房日
        let checkOut = new Date(stdTab.getElementsByClassName("check-out")[0].value)

        // 獲得 入住日 文字
        let checkInDate = getTheDate(checkIn)
        // 獲得 退房日 文字
        let checkOutDate = getTheDate(checkOut)
        // 獲得 天數
        let days = stdTab.getElementsByClassName("days")[0].value

        // 定義房型
        let roomStyle = stdTab.getElementsByClassName("room-style")
        // 定義間數
        let roomCount = stdTab.getElementsByClassName("room-count")
        // 定義房價
        let roomRate = stdTab.getElementsByClassName("room-rate")

        // 保存已獲取的房型陣列
        let roomStyleArr = []
        // 保存已獲取的間數陣列
        let roomCountArr = []
        // 保存已獲取的房價陣列
        let roomRateArr = []
        // 定義總金額
        let totalRate = 0
        // 定義總間數
        let amountOfRoom = 0

        // 遍歷所有房型框
        for (let i = 0; i < roomStyle.length; i++) {
            // 如果房型內有傳值
            if (roomStyle[i].value != 0) {
                // 房型陣列內傳入獲得的房型
                roomStyleArr.push(roomStyle[i].value)
                // 間數陣列內傳入獲得的間數
                roomCountArr.push(roomCount[i].value)
                // 房價陣列內傳入獲得的房價
                roomRateArr.push(roomRate[i].value)

                // 增加計算總間數
                amountOfRoom += parseInt(roomCount[i].value)

                // 計算總金額
                totalRate += (roomCount[i].value * roomRate[i].value)
            }
        }
        // 目前獲得總金額乘以天數
        totalRate *= days

        // 創建變數以保存房價
        let roomRateKeep = totalRate

        /* 
        格式:
            經典雙人房1間(每間...元)
        */
        // 創建 每間房價 字串
        let roomString = ""
        // 遍歷所有已輸入房型
        for (let i = 0; i < roomStyleArr.length; i++) {
            // 判斷是否有打勾 "顯示每間房價"
            // 每間 房價字串 重設
            let roomRateString = ""
            if (document.getElementById("separate").checked) {
                // 獲得每間多少金額
                roomRateString += "(每間" + roomRateArr[i] + "元)"

            }
            // 將獲得的房價字串保存至每間房價字串裡
            roomString += (roomStyleArr[i] + roomCountArr[i] + "間" + roomRateString + "，")
        }

        // 創建變數保存總房價字串
        let totalRoomRateString = ""

        /* 
            房價字串格式:
                為...元
                共為...元
        */
        // 判斷是否已輸入房價
        if (totalRate != 0) {
            // 判斷房間是否只有1間
            if (roomRateArr.length == 1 && roomRateArr[0] == totalRate) {
                totalRoomRateString += ("為" + totalRate + "元")
            } else {
                totalRoomRateString += ("共為" + totalRate + "元")
            }
        }

        /* 
            當只有部分房型輸入房價時，提示框內顯示錯誤提醒
        */
        // 獲得提示框
        let remind = stdTab.getElementsByClassName("remind");
        // 使提示框預設空白
        remind[0].innerHTML = ""
        // 創建變數以確認房價輸入狀態
        let priceFlag = false
        let noPriceFlag = false
        // 便歷房價陣列
        for (let i = 0; i < roomRateArr.length; i++) {
            // 如房價陣列有值，將有房價的變數改變狀態
            if (roomRateArr[i] != "") {
                priceFlag = true
            } else {
                noPriceFlag = true
            }
        }
        // 如果兩個變數皆被改變，則輸出提醒文字
        if (priceFlag && noPriceFlag) {
            remind[0].innerHTML = "注意，僅部分房型輸入房價，可能會出現錯誤"
        }


        let efBtn = stdTab.getElementsByClassName("extra-fee-button")
        let efName = stdTab.getElementsByClassName("extra-fee-name")
        let efCount = stdTab.getElementsByClassName("extra-fee-count")

        let efItem = []
        let extraFee = []
        let efString = ""
        let efIndex = 0

        for (let i = 0; i < efBtn.length; i++) {
            if (!((efBtn[i].innerHTML == "加價項目" || efBtn[i].innerHTML == "優惠項目") && efCount[i].value == "")) {
                if (efIndex > 0 || roomRateKeep != 0) {
                    efString += "，"
                }
                if (efBtn[i].innerHTML == "加價項目") {
                    efItem.push(efName[i].value)
                    extraFee.push(efCount[i].value)
                    totalRate += (efCount[i].value * days)
                    efString += "加收" + efCount[i].value + "元" + efName[i].value
                    efIndex++
                } else if (efBtn[i].innerHTML == "優惠項目") {
                    efItem.push(efName[i].value)
                    extraFee.push(efCount[i].value * -1)
                    totalRate -= (efCount[i].value * days)
                    efString += "扣除" + efName[i].value + efCount[i].value + "元"
                    efIndex++
                } else if (efBtn[i].innerHTML == "壽星優惠") {
                    efItem.push("壽星優惠")
                    extraFee.push(efCount[i].value * -1)
                    totalRate -= (efCount[i].value * days * amountOfRoom)
                    efString += "扣除壽星優惠" + efCount[i].value + "元"
                    efIndex++
                } else if (efBtn[i].innerHTML == "續住優惠") {
                    efItem.push("續住優惠")
                    extraFee.push(efCount[i].value * -1)
                    totalRate -= (efCount[i].value * (days - 1) * amountOfRoom)
                    efString += "扣除續住優惠" + efCount[i].value + "元"
                    efIndex++
                }
            }
        }


        let totalRateString = ""
        if (((roomRateArr.length > 0 && roomRateArr[0] != "") && extraFee.length > 0) && totalRate > 0) {
            totalRateString += "，現場需支付" + totalRate + "元"
        }



        let messsage = stdTab.getElementsByClassName("message")[0]
        let roomRateHeader = ""
        let roomRateFooter = ""
        if (roomRateArr[0] != "" || extraFee.length > 0) {
            if (extraFee.length > 0) {
                roomRateHeader += "\n  "
            }
            roomRateHeader += "房價"
            roomRateFooter = "。"
            if (roomRateKeep == 0) {
                roomRateHeader += "將"
            }
        }

        let parkingString = "本飯店為地下停車場，平面式停車位，車輛限高210公分。因車位有限，若當天車輛較多，導致地下室停滿，會全額補助您停到附近停車場。(一間房僅提供一個汽車車位)。"

        if (document.getElementById("noParking").checked){
            parkingString = "此訂房不含停車位。"
        }



        // 將值回傳至簡訊獲取框內
        messsage.value = "  " + name + gender + "您好，我們是日月光大飯店-桃園館。您的入住日期為" +
            checkInDate + "，退房日期為" + checkOutDate + "，房型為" + roomString +
            "總共入住" + days + "天。" + roomRateHeader + totalRoomRateString + efString + totalRateString + roomRateFooter +
            "\n  提醒您，可於下午3點過後辦理Check in手續，退房時間為隔天中午12點前。"+ parkingString +"感謝您的訂房，祝您旅途愉快。如有任何問題，請洽詢03-491-6018  Hotel-j日月光桃園館。謝謝您。"

        /* 
            黃圓均先生您好，我們是日月光大飯店-桃園館。您的入住日期為2023年1月26日，退房日期為2023年1月27日，房型為經典雙人房一大床1間，總共入住1天。
  房價原為3680元，扣除壽星優惠100元，現場只需支付3580元(含早餐)。謝謝!。
  提醒您，可於下午3點過後辦理Check in手續，退房時間為隔天中午12點前。本飯店為地下停車場，平面式停車位，車輛限高210公分。因車位有限，若當天車輛較多，導致地下室停滿，會全額補助您停到附近停車場。(一間房僅提供一個汽車車位)。感謝您的訂房，祝您旅途愉快。如有任何問題，請洽詢03-491-6018  Hotel-j日月光桃園館。謝謝您。

        */
    }
}









/* 
    定義新函式
*/

// 將年月日轉為格式 yyyy-mm-dd
/* 
    參數:
        day 為日期數值
*/
dateString = function (day) {
    // 獲取年份
    let year = day.getFullYear()
    // 獲取月份(值需+1)
    let month = day.getMonth() + 1
    // 如果月份為個位數，需加前面加0
    if (month < 10) {
        month = "0" + month
    }
    // 獲取日期
    let date = day.getDate()
    // 如果日期為個位數，需加前面加0
    if (date < 10) {
        date = "0" + date
    }
    // 獲取日期字符串
    var date0 = year + "-" + month + "-" + date
    // 回傳日期字符串
    return date0
}


// 新增按鍵函式
crtA = function () {

    // 複製新的節點
    let copyNode = this.parentNode.parentNode.cloneNode(true)

    // 綁定所有輸入框
    let defultClear = copyNode.getElementsByTagName("input")
    // 將所有輸入框清空
    for (let i = 0; i < defultClear.length; i++) {
        defultClear[i].value = ""
    }

    if (copyNode.getElementsByClassName("room-count")[0] != undefined) {

        // 定義間數
        let quantity = copyNode.getElementsByClassName("room-count")[0]
        // 將間數還原至1
        quantity.value = 1
        // 使新建間數不能小於1
        quantity.set1();

    }

    if (copyNode.getElementsByClassName("extra-fee-button")[0] != undefined) {
        copyNode.extraFee1Rule()
    }


    // 定義增加鍵
    let crt = copyNode.getElementsByClassName("crt")[0]
    // 將增加按鍵綁定增加函數
    crt.onclick = crtA

    // 定義刪除鍵
    let del = copyNode.getElementsByClassName("del")[0]
    // 增加刪除按件文字
    del.innerHTML = "刪除 -"
    // 將刪除按鍵綁定增加函式
    del.onclick = delA

    // 設置div中的內容
    this.parentNode.parentNode.parentNode.appendChild(copyNode);
}


// 刪除按鍵函式
delA = function () {
    let div = this.parentNode.parentNode;

    // 刪除div
    div.parentNode.removeChild(div);

    /* 
        點擊超連結以後，超連結會跳轉頁面，這式超連結的預設行為，
            此時我們並不希望出現預設行為，可以通過在響應式函數的最後 return false來取消預設行為
    */
    return false;
}

// 回傳年/月/日，如回傳NaN則不附值
/* 
    參數:
        date 為入住或退房日期
        obj 為調用的方法(獲取年/月/日)  
*/
getTheDate = function (date) {
    // 建立一個變量回傳年/月/日
    // let count = date[obj]()
    let string = date.getFullYear() + "年" + (date.getMonth() + 1) + "月" + date.getDate() + "日"

    return string

}






/* 
    向原型鏈添加新方法
*/

// 將值設置為1，且禁止出現比1小的值
/* 
    參數:
        callback:於結束時回調函數
*/
Object.prototype.set1 = function (callback) {
    this.addEventListener('change', function () {
        // 判斷是否小於1，如小於1，更正為1
        if (this.value < 1) {
            this.value = 1
        }
        callback && callback()
    }, false)
}


/* 
        替加價項目下拉列表綁定功能:
            1.點擊後按鈕更換內容
            2.加價列表其他內容，需依據不同的選定內容而有變化
            3.如已有其他的"壽星優惠 或 續住優惠"，其他的加價按鈕將不可再選定
    */
// 遍歷加價項目列 (第一頁)
Object.prototype.extraFee1Rule = function () {
    let stdTab = document.getElementsByClassName("tabs")[0]
    let extraFeeWrapper1 = stdTab.getElementsByClassName("extra-fee-wrapper")[0]
    // 定義加價下拉列表按鈕
    let extraFeeButton = this.getElementsByClassName("extra-fee-button")[0]
    // 定義加價下拉列表所有的超連結
    let extraFeeList = this.getElementsByClassName("extra-fee-list")
    // 定義加價項目名稱
    let extraFeeName = this.getElementsByClassName("extra-fee-name")[0]
    // 定義加價金額
    let extraFeeCount = this.getElementsByClassName("extra-fee-count")[0]
    // 定義推薦輸入項目超連結
    let extraInputList = this.getElementsByClassName("extra-input-list")
    /* 
        定義常用項目名稱
    */
    // 加床費
    let extraBed = this.getElementsByClassName("extra-bed")[0]
    // 人頭費
    let extraPeople = this.getElementsByClassName("extra-people")[0]
    // 小窗優惠
    let smallWindow = this.getElementsByClassName("small-window")[0]


    /*  
        定義說明鈕的所有說明
    */
    // 加價
    let e1 = this.getElementsByClassName("e1")[0]
    // 優惠
    let d1 = this.getElementsByClassName("d1")[0]
    // 壽星
    let d2 = this.getElementsByClassName("d2")[0]
    // 續住
    let d3 = this.getElementsByClassName("d3")[0]

    extraFeeButton.innerHTML = "加價項目"
    extraFeeName.disabled = false
    extraFeeButton.classList.add("btn-outline-primary")
    extraFeeButton.classList.remove("btn-outline-danger")
    extraBed.classList.remove("d-none")
    extraPeople.classList.remove("d-none")
    smallWindow.classList.add("d-none")

    for (let i = 0; i < stdTab.getElementsByClassName("extra-fee-wrapper").length; i++) {

        extraFeeButton.onclick = function () {
            this.parentNode.getElementsByClassName("birthday")[0].classList.remove("disabled")
            this.parentNode.getElementsByClassName("longStay")[0].classList.remove("disabled")

            if (stdTab.getElementsByClassName("days")[0].value < 2) {
                this.parentNode.getElementsByClassName("longStay")[0].classList.add("disabled")
            }


            let flagBirthday = true
            let flagLongStay = true
            for (let j = 0; j < stdTab.getElementsByClassName("extra-fee-button").length; j++) {
                if (stdTab.getElementsByClassName("extra-fee-button")[j].innerHTML == "壽星優惠" && this != stdTab.getElementsByClassName("extra-fee-button")[j]) {
                    flagBirthday = false
                }
                if (stdTab.getElementsByClassName("extra-fee-button")[j].innerHTML == "續住優惠" && this != stdTab.getElementsByClassName("extra-fee-button")[j]) {
                    flagLongStay = false
                }
            }

            if (!flagBirthday) {
                this.parentNode.getElementsByClassName("birthday")[0].classList.add("disabled")
            }
            if (!flagLongStay) {
                this.parentNode.getElementsByClassName("longStay")[0].classList.add("disabled")
            }

            for (let j = 0; j < extraFeeList.length; j++) {
                extraFeeList[j].onclick = function () {
                    if (extraFeeList[j].innerHTML != "清空") {
                        extraFeeButton.innerHTML = extraFeeList[j].innerHTML
                        if (extraFeeButton.innerHTML == "加價項目") {
                            extraFeeName.disabled = false
                            extraFeeButton.classList.add("btn-outline-primary")
                            extraFeeButton.classList.remove("btn-outline-danger")
                            extraBed.classList.remove("d-none")
                            extraPeople.classList.remove("d-none")
                            smallWindow.classList.add("d-none")
                            e1.classList.remove("d-none")
                            d1.classList.add("d-none")
                            d2.classList.add("d-none")
                            d3.classList.add("d-none")
                        } else if (extraFeeButton.innerHTML == "優惠項目") {
                            extraFeeName.disabled = false
                            extraFeeButton.classList.remove("btn-outline-primary")
                            extraFeeButton.classList.add("btn-outline-danger")
                            extraBed.classList.add("d-none")
                            extraPeople.classList.add("d-none")
                            smallWindow.classList.remove("d-none")
                            e1.classList.add("d-none")
                            d1.classList.remove("d-none")
                            d2.classList.add("d-none")
                            d3.classList.add("d-none")
                        } else if (extraFeeButton.innerHTML == "壽星優惠") {
                            extraFeeName.value = ""
                            extraFeeName.disabled = true
                            extraFeeCount.value = 100
                            e1.classList.add("d-none")
                            d1.classList.add("d-none")
                            d2.classList.remove("d-none")
                            d3.classList.add("d-none")
                            extraFeeButton.classList.remove("btn-outline-primary")
                            extraFeeButton.classList.add("btn-outline-danger")
                        } else if (extraFeeButton.innerHTML == "續住優惠") {
                            extraFeeName.value = ""
                            extraFeeName.disabled = true
                            extraFeeCount.value = 100
                            e1.classList.add("d-none")
                            d1.classList.add("d-none")
                            d2.classList.add("d-none")
                            d3.classList.remove("d-none")
                            extraFeeButton.classList.remove("btn-outline-primary")
                            extraFeeButton.classList.add("btn-outline-danger")
                        }
                    } else {
                        extraFeeButton.innerHTML = "加價項目"
                        extraFeeName.disabled = false
                        extraFeeCount.value = ""
                        e1.classList.remove("d-none")
                        d1.classList.add("d-none")
                        d2.classList.add("d-none")
                        d3.classList.add("d-none")
                        extraFeeButton.classList.add("btn-outline-primary")
                        extraFeeButton.classList.remove("btn-outline-danger")
                    }
                }
            }
        }
    }
    for(let i=0; i<extraInputList.length;i++){
        extraInputList[i].onclick = function(){
            extraFeeName.value = extraInputList[i].innerHTML
            if(extraInputList[i].innerHTML=="加床費"){
                extraFeeCount.value = 1000
            }else if(extraInputList[i].innerHTML=="人頭費"){
                extraFeeCount.value = 600
            }else if(extraInputList[i].innerHTML=="小窗優惠"){
                extraFeeCount.value = 100
            }
        }
    }
}