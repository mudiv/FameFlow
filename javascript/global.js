// add sensorGA
;(function (para) {
    var p = para.sdk_url,
      n = para.name,
      w = window,
      d = document,
      s = "script",
      x = null,
      y = null
    w["sensorsDataAnalytic201505"] = n
    w[n] =
      w[n] ||
      function (a) {
        return function () {
          ;(w[n]._q = w[n]._q || []).push([a, arguments])
        }
      }
    var ifs = [
      "track",
      "quick",
      "register",
      "registerPage",
      "registerOnce",
      "clearAllRegister",
      "trackSignup",
      "trackAbtest",
      "setProfile",
      "setOnceProfile",
      "appendProfile",
      "incrementProfile",
      "deleteProfile",
      "unsetProfile",
      "identify",
      "login",
      "logout",
      "trackLink",
      "clearAllRegister",
    ]
    for (var i = 0; i < ifs.length; i++) {
      w[n][ifs[i]] = w[n].call(null, ifs[i])
    }
    if (!w[n]._t) {
      ;(x = d.createElement(s)), (y = d.getElementsByTagName(s)[0])
      x.async = 1
      x.src = p
      w[n].para = para
      y.parentNode.insertBefore(x, y)
    }
  })({
    name: "Sensors",
    heatmap: {
      clickmap: "default",
      scroll_notice_map: "default",
    },
    show_log: true,
    sdk_url: "https://ad-static.mb-cdn.com/sensors/latest/sensorsdata.min.js",
    server_url: "https://sensors.snaptubead.com/sa?project=SnaptubeMainpage",
  })
  
  const getLocalStorage = JSON.parse(localStorage.getItem("__utmParams"))
  
  const storageSource = getLocalStorage && getLocalStorage.source
  const storageCampaign = getLocalStorage && getLocalStorage.campaign
  const host = window.location.host
  const searchParams = new URL(document.location).searchParams
  const utmSource = searchParams.get("utm_source") || storageSource || ""
  const utmCampaign = searchParams.get("utm_campaign") || storageCampaign || ""
  const isAds =
    location.search.indexOf("utm_source") !== -1 || utmSource.length > 1
  const userLandingId = getRandomId()
  let current = {}
  const apkLinkArr = [
    { host: "apksdownloads.com", channel: "tube_apksdownloads" },
    { host: "snaptube.mx", channel: "tube_snaptubemx" },
    { host: "snaptubear.com", channel: "tube_snaptubear" },
    { host: "snaptube.pe", channel: "tube_snaptubepe" },
    { host: "snaptubeeg.com", channel: "tube_snaptubeeg" },
    { host: "snaptubeiq.com", channel: "tube_snaptubeiq" },
    { host: "snaptubema.com", channel: "tube_snaptubema" },
    { host: "snapmodapk.com", channel: "tube_snapmodapk" },
    { host: "snapdownloads.com", channel: "tube_snapdownloads" },
    { host: "esnatube.com", channel: "tube_esnatube" },
    { host: "snapapklink.com", channel: "tube_snapapklink" },
    { host: "snapindir.com", channel: "tube_snapindir" },
    { host: "installapks.com", channel: "tube_installapks" },
  ]
  
  const getChannel = (curhost) => {
    return (current = apkLinkArr.find((item) => curhost.indexOf(item.host) > -1))
  }
  
  getChannel(host)
  
  // 基础链接
  let baseUrl = ""
  
  if (utmSource) {
    saveUtmParams(utmSource, utmCampaign, 24)
  }
  
  window.Sensors.quick("autoTrack", {
    path: window.location.pathname,
    organic: isAds ? false : true,
    web_host: window.location.host,
    web_url: window.location.href,
    web_utmSource: utmSource || "default",
    web_utmCampaign: utmCampaign || "default",
    landing_id: userLandingId,
  })
  
  function onDownload(props) {
    window.Sensors.track(isAds ? "semDownload" : "multiSites", {
      action: "seoPage",
      path: window.location.pathname,
      organic: isAds ? false : true,
      web_host: window.location.host,
      web_url: window.location.href,
      web_utmSource: utmSource || "default",
      web_utmCampaign: utmCampaign || "default",
      landing_id: userLandingId,
      ...props,
    })
  }
  
  function makeRandomStr(length = 36) {
    var result = ""
    var characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789"
    var charactersLength = characters.length
    for (var i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength))
    }
    return result
  }
  function getRandomId() {
    try {
      const val = localStorage.getItem("_randomId")
      if (val) return val
      const v = makeRandomStr()
      localStorage.setItem("_randomId", v)
      return v
    } catch (error) {}
    return makeRandomStr()
  }
  
  // social share popup
  ;(function ($) {
    /**
     * jQuery function to prevent default anchor event and take the href * and the title to make a share popup
     *
     * @param  {[object]} e           [Mouse event]
     * @param  {[integer]} intWidth   [Popup width defalut 500]
     * @param  {[integer]} intHeight  [Popup height defalut 400]
     * @param  {[boolean]} blnResize  [Is popup resizeabel default true]
     */
    $.fn.customerPopup = function (e, intWidth, intHeight, blnResize) {
      // Prevent default anchor event
      e.preventDefault()
      // Set values for window
      intWidth = intWidth || "500"
      intHeight = intHeight || "400"
      strResize = blnResize ? "yes" : "no"
      // Set title and open popup with focus on it
      var strTitle =
          typeof this.attr("title") !== "undefined"
            ? this.attr("title")
            : "Social Share",
        strParam =
          "width=" +
          intWidth +
          ",height=" +
          intHeight +
          ",resizable=" +
          strResize,
        objWindow = window.open(this.attr("href"), strTitle, strParam).focus()
    }
    $.fn.isOnScreen = function () {
      var win = $(window)
  
      var viewport = {
        top: win.scrollTop(),
        left: win.scrollLeft(),
      }
      viewport.right = viewport.left + win.width()
      viewport.bottom = viewport.top + win.height()
  
      var bounds = this.offset()
      bounds.right = bounds.left + this.outerWidth()
      bounds.bottom = bounds.top + this.outerHeight()
  
      return !(
        viewport.right < bounds.left ||
        viewport.left > bounds.right ||
        viewport.bottom < bounds.top ||
        viewport.top > bounds.bottom
      )
    }
    $(document).ready(function ($) {
      $(".customer.share").on("click", function (e) {
        $(this).customerPopup(e)
      })
    })
  
    // 处理动态打包逻辑
    start(utmSource, utmCampaign, host)
  })(jQuery)
  
  // seo site main js
  ;(function ($) {
    var MobileUA = (function () {
      var ua = navigator.userAgent.toLowerCase()
  
      var mua = {
        IOS: /ipod|iphone|ipad/.test(ua), //iOS
        IPHONE: /iphone/.test(ua), //iPhone
        IPAD: /ipad/.test(ua), //iPad
        ANDROID: /android/.test(ua), //Android Device
        WINDOWS: /windows/.test(ua), //Windows Device
        TOUCH_DEVICE: "ontouchstart" in window || /touch/.test(ua), //Touch Device
        MOBILE: /mobile/.test(ua), //Mobile Device (iPad)
        ANDROID_TABLET: false, //Android Tablet
        WINDOWS_TABLET: false, //Windows Tablet
        TABLET: false, //Tablet (iPad, Android, Windows)
        SMART_PHONE: false, //Smart Phone (iPhone, Android)
      }
  
      mua.ANDROID_TABLET = mua.ANDROID && !mua.MOBILE
      mua.WINDOWS_TABLET = mua.WINDOWS && /tablet/.test(ua)
      mua.TABLET = mua.IPAD || mua.ANDROID_TABLET || mua.WINDOWS_TABLET
      mua.SMART_PHONE = mua.MOBILE && !mua.TABLET
  
      return mua
    })()
  
    var customizeBtn = $("#post_content").find(".Post-download")
    if (customizeBtn && customizeBtn.hasClass("download")) {
      customizeBtn.attr("target", "_blank")
    }
    // 移动端导航栏效果
    function mNavControl() {
      $(".sidebar .content .item.hasLink").click(function (e) {
        $(this).toggleClass("active")
      })
      $(".sidebar .content .item .linkList .link").click(function (e) {
        e.stopPropagation()
      })
      // 左侧导航
  
      $(".mobileNav .linkList a").addClass("link")
  
      $(".navSidebar").click(function (e) {
        $(" .navSidebar").attr("style", "display: none;")
        $("body").attr("style", "overflow: auto;")
      })
      $(".navSidebar .content").click(function (e) {
        e.stopPropagation()
      })
      $(".navIcon").click(function (e) {
        $(" .navSidebar").attr("style", "display: flex;")
        $("body").attr("style", "overflow: hidden;")
      })
      // 右侧语言
      $(".langSidebar").click(function (e) {
        $(" .langSidebar").attr("style", "display: none;")
        $("body").attr("style", "overflow: auto;")
      })
      $(".langSidebar .content").click(function (e) {
        e.stopPropagation()
      })
      $(".mlangIcon").click(function (e) {
        $(".langSidebar").attr("style", "display: flex;")
        $("body").attr("style", "overflow: hidden;")
      })
    }
    mNavControl()
  
    window.onscroll = function () {
      var top = document.body.scrollTop || document.documentElement.scrollTop
      if (top > 250) {
        $("#footerBtn").css("position", "fixed")
        $("#categoryBtn").css("position", "fixed")
      } else {
        $("#footerBtn").css("position", "static")
        $("#categoryBtn").css("position", "static")
      }
    }
    $("#dl-main").on("click", function () {
      onDownload({ label: "seo-top", type: "top" })
    })
  
    $("#dl-float").on("click", function () {
      onDownload({ label: "seo-bottom", type: "float" })
    })
  
    $("#mydownload").on("click", function () {
      onDownload({ label: "seo-rectangle" })
    })
    $("#mydownload-es").on("click", function () {
      onDownload({ label: "seo-rectangle-es" })
    })
    $("#mydownload-en").on("click", function () {
      onDownload({ label: "seo-rectangle-en" })
    })
    $("#mydownload-ar").on("click", function () {
      onDownload({ label: "seo-rectangle-ar" })
    })
  
    $(".text-download").on("click", function () {
      onDownload({ label: "seo-textDownload" })
    })
    $(".btn2 a").on("click", function () {
      onDownload({ label: "seo-customize-btn" })
    })
  })(jQuery)
  
  if (getLocalStorage) {
    const expire = getLocalStorage.expireTime
  
    const currentTime = Date.now()
    if (currentTime > expire) {
      localStorage.removeItem("__utmParams")
    }
  }
  
  /**
   * @description 获取动态打包链接
   * @param {string} utmSource - 流量渠道
   * @param {string} utmCampaign - 安装包代码
   */
  async function start(utmSource, utmCampaign, host) {
    // 根据 host 获取不同的渠道包
    getChannel(host)
    /**
     * 需要替换链接的元素列表
     * 后续可根据需求拓展列表
     */
    const buttonList = [
      document.getElementById("dl-main"),
      document.getElementById("dl-float"),
      document.getElementById("text-download"),
    ]
  
    let storageTime = ""
    const getLocalStorage = JSON.parse(localStorage.getItem("__utmParams"))
    if (getLocalStorage) {
      storageTime = getLocalStorage && getLocalStorage.timestamp
    }
  
    let url = location.search
    let query = {}
    url.replace(/([^?&]+)=([^?&]+)/g, function (s, v, k) {
      query[v] = decodeURIComponent(k)
    })
  
    /**
     * 拼装参数
     * 用于后续动态打包链接传参，方便安装包NDAU上报数据
     */
    const normalParams = {
      utm_source: utmSource,
      utm_campaign: utmCampaign,
      landing_id: userLandingId,
      landing_time: storageTime,
    }
  
    const params = JSON.stringify(normalParams)
  
    try {
      for (const target of buttonList) {
        if (!target) continue
        /**
         * STEP1: 获取动态打包基础链接
         * 如果存在 utmSource，则动态获取基础链接
         * 否则以当前元素的链接作为基础链接
         */
  
        if (current && current.channel) {
          target.href = `https://dl-master.snaptubead.com/installer/snaptube/latest/Click_me_to_install_SnapTube_${current.channel}.apk`
        }
  
        const baseUrl = utmSource ? await getBaseUrl() : target.href
  
        if (!baseUrl) return
  
        // 设置动态链接
        setDynamicLink(baseUrl, params, target)
      }
    } catch (error) {
      console.log("error", error)
    }
  }
  
  /**
   * @description 设置动态链接
   * @param {string} baseUrl - 基础链接
   * @param {object} params - 动态参数
   * @param {object} target - 目标元素
   */
  async function setDynamicLink(baseUrl, params, target) {
    let apkURL = baseUrl
    // STEP2: 如果基础链接包含 dl-master 域名，则进一步发起请求
    if (apkURL.includes("dl-master")) {
      let resp = await fetch(apkURL.replace(".apk", ".json"), {
        method: "get",
        headers: {
          "Content-Type": "application/json",
        },
      })
      apkURL = (await resp.json()).message || apkURL
    }
  
    // STEP3: 进行安装包链接域名替换
    apkURL = apkURL.replace(
      "https://dl-st.mb-cdn.com",
      "https://duq553trcjqkb.cloudfront.net"
    )
  
    // STEP4: 注入参数，用于安装包数据上报使用，至此，获得目标链接雏形
    apkURL += `?m=${encodeURIComponent(params)}&randomId=${userLandingId}`
  
    // STEP5: 先将目标元素进行连接替换，避免用户在 STEP6 之前点击下载
    if (target && target.href) {
      target.href = apkURL
    }
  
    // STEP6: 发起最终请求，获取到最终的安装包链接，并进行下载按钮元素链接替换
    fetch(apkURL, {
      method: "HEAD",
    }).then((res) => {
      if (res.url && target && target.href) {
        target.href = res.url
      }
    })
  }
  
  /**
   * @description 获取基础链接
   * @returns {string} baseUrl
   */
  async function getBaseUrl() {
    const requestOptions = {
      method: "GET",
      redirect: "follow",
    }
    if (!baseUrl) {
      const res = await fetch(
        `https://www.snaptube.com/package/select?s=${utmSource}`,
        requestOptions
      )
      baseUrl = (await res.json()).url
    }
    return baseUrl
  }
  
  function saveUtmParams(source, campaign, expire) {
    const UTM_PARAMS = "__utmParams"
    try {
      const utmParams = JSON.parse(localStorage.getItem(UTM_PARAMS))
      if (utmParams) {
        const { source: lastSource, campaign: lastCampaign } = utmParams
  
        if (lastSource === source && lastCampaign === campaign) {
          return
        }
      }
      const expireTime = Date.now() + expire * 60 * 60 * 1000
      const timestamp = Date.now()
  
      localStorage.setItem(
        UTM_PARAMS,
        JSON.stringify({
          source,
          campaign,
          timestamp,
          expireTime,
        })
      )
    } catch (error) {}
  }