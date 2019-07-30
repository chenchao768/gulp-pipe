"use strict";var _createClass=function(){function i(e,s){for(var t=0;t<s.length;t++){var i=s[t];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(e,i.key,i)}}return function(e,s,t){return s&&i(e.prototype,s),t&&i(e,t),e}}();function _classCallCheck(e,s){if(!(e instanceof s))throw new TypeError("Cannot call a class as a function")}!function(i,r,e,s){r.cbNum=r.cbNum||0;var t=(_createClass(a,[{key:"_ajax",value:function(e){return new Promise(function(s,t){i.ajax({url:e.url||"",type:e.type||"GET",dataType:e.dataType||"jsonp",jsonpCallback:e.jsonpCallback||"callback",cache:e.cache||!1,xhrFields:{withCredentials:!0},crossDomain:!0,data:e.data||"",success:function(e){s(e)},error:function(e){t(e)}})})}},{key:"_init",value:function(){this._renderDOM(),this._getProvince(),this._bindEvent()}},{key:"_renderDOM",value:function(){this.settings.onBeforeShow(),this._createDom(),this.settings.onShow()}},{key:"_createDom",value:function(){this.$wrap=i('<div class="g-address-wap '+this.settings.themeClass+'" style="z-index: '+this.settings.zIndex+'"></div>'),this.$box=i('<div class="g-address-box"></div>'),this.$closeBtn=i('<a href="javascript:;" class="dialog-close"></a>'),this.$title=i('<div class="box-title"><span>'+this.settings.titleText+"</span></div>"),this.$bar=i('<div class="box-bar cf"></div>'),this.$list=i('<div class="address-list-box"></div>'),this.$title.append(this.$closeBtn),this.$box.append(this.$title);for(var e=0;e<this.settings.level;e++)this.$bar.append('<a href="javascript:;"  class="select-bar equal-'+this.settings.level+'">请选择</a>'),this.$list.append('<div class="list-box"></div>');this.$box.append(this.$bar),this.$box.append(this.$list),this.$wrap.append(this.$box),i("body").append(this.$wrap)}},{key:"_bindEvent",value:function(){var s=this;s.$wrap.on("click",".address-item",function(e){e.preventDefault(),s._getAddressList(i(this).data("type"),i(this).data("lesid"),i(this).text())}),s.$wrap.on("click",".select-bar",function(e){e.preventDefault(),s.$wrap.find(".address-item").removeClass("active"),s.settings.curAddress=null,i(this).text("请选择"),s._changeBar(i(this).index())}),s.$closeBtn.on("click",function(e){e.preventDefault(),s._close()}),this.settings.maskClose&&s.$wrap.on("click",function(e){try{0<=e.target.className.indexOf("g-address-wap")&&s._close()}catch(e){console.error(e)}})}},{key:"_getProvince",value:function(){var a=this;++r.cbNum;var e={url:this.ipservice+"/les/provinceList-cb"+r.cbNum+".html",jsonpCallback:"cb"+r.cbNum};this._ajax(e).then(function(e){try{for(var s=[],t=0;t<e.provinces.length;t++){var i=a.settings.curAddress&&a.settings.curAddress[0]&&a.settings.curAddress[0].id===e.provinces[t].mdmId?"active":"";s.push('<a href="javascript:;" data-type="province" data-lesid="'+e.provinces[t].mdmId+'" class="address-item '+i+'">'+e.provinces[t].name+"</a>")}a.$list.find(".list-box").eq(0).html(s.join("")),a._changeBar(0),1!==a.settings.level&&a.settings.curAddress&&a._getAddressList("province",a.settings.curAddress[0].id,a.settings.curAddress[0].name)}catch(e){throw Error(e)}}).catch(function(e){console.error(e)})}},{key:"_getCity",value:function(e){var a=this;++r.cbNum;var s={url:this.ipservice+"/les/cityList-"+e+"-cb"+r.cbNum+".html",jsonpCallback:"cb"+r.cbNum};this._ajax(s).then(function(e){try{for(var s=[],t=0;t<e.cities.length;t++){var i=a.settings.curAddress&&a.settings.curAddress[1]&&a.settings.curAddress[1].id===e.cities[t].lesId?"active":"";s.push('<a href="javascript:;" data-type="city" data-lesid="'+e.cities[t].lesId+'" class="address-item '+i+'">'+e.cities[t].name+"</a>")}a.$list.find(".list-box").eq(1).html(s.join("")),a._changeBar(1),2!==a.settings.level&&a.settings.curAddress?a._getAddressList("city",a.settings.curAddress[1].id,a.settings.curAddress[1].name):e.cities&&1===e.cities.length&&a._getAddressList("city",e.cities[0].lesId,e.cities[0].name)}catch(e){throw Error(e)}}).catch(function(e){console.error(e)})}},{key:"_getDistrict",value:function(e){var a=this;++r.cbNum;var s={url:this.ipservice+"/les/districtList-"+e+"-cb"+r.cbNum+".html",jsonpCallback:"cb"+r.cbNum};this._ajax(s).then(function(e){try{for(var s=[],t=0;t<e.districts.length;t++){var i=a.settings.curAddress&&a.settings.curAddress[2]&&a.settings.curAddress[2].id===e.districts[t].lesId?"active":"";s.push('<a href="javascript:;" data-type="district" data-lesid="'+e.districts[t].lesId+'" class="address-item '+i+'">'+e.districts[t].name+"</a>")}a.$list.find(".list-box").eq(2).html(s.join("")),a._changeBar(2),3!==a.settings.level&&a.settings.curAddress?a._getAddressList("district",a.settings.curAddress[2].id,a.settings.curAddress[2].name):e.districts&&1===e.districts.length&&a._getAddressList("district",e.districts[0].lesId,e.districts[0].name)}catch(e){throw Error(e)}}).catch(function(e){console.error(e)})}},{key:"_getStreet",value:function(e){var a=this;++r.cbNum;var s=this.addressInfo[1].id,t={url:this.ipservice+"/les/streetList-"+s+"-"+e+"-cb"+r.cbNum+".html",jsonpCallback:"cb"+r.cbNum};this._ajax(t).then(function(e){try{for(var s=[],t=0;t<e.streets.length;t++){var i=a.settings.curAddress&&a.settings.curAddress[3]&&a.settings.curAddress[3].id===e.streets[t].lesId?"active":"";s.push('<a href="javascript:;" data-type="street"  data-lesid="'+e.streets[t].lesId+'" class="address-item '+i+'">'+e.streets[t].name+"</a>")}a.$list.find(".list-box").eq(3).html(s.join("")),a._changeBar(3),e.streets&&1===e.streets.length&&a._getAddressList("street",e.streets[0].lesId,e.streets[0].name)}catch(e){throw Error(e)}}).catch(function(e){console.log("获取街道接口异常")})}},{key:"_getAddressList",value:function(e,s,t){var i=""+s,a=this.$bar.find(".select-bar");"province"===e&&(this.addressInfo[0].id=i,this.addressInfo[0].name=t,a.eq(0).text(t),1===this.settings.level?this._getAddress():this._getCity(i)),"city"===e&&(this.addressInfo[1].id=i,this.addressInfo[1].name=t,a.eq(1).text(t),2===this.settings.level?this._getAddress():this._getDistrict(i)),"district"===e&&(this.addressInfo[2].id=i,this.addressInfo[2].name=t,a.eq(2).text(t),3===this.settings.level?this._getAddress():this._getStreet(i)),"street"===e&&(this.addressInfo[3].id=i,this.addressInfo[3].name=t,this._getAddress())}},{key:"_changeBar",value:function(e){var s=this.$bar.find(".select-bar"),t=this.$box.find(".list-box");0===e&&(s.eq(0).show().addClass("active").siblings().html("请选择").hide().removeClass("active"),t.eq(0).show(),t.eq(1).empty().hide(),t.eq(2).empty().hide(),t.eq(3).empty().hide()),1===e&&(s.eq(0).removeClass("active"),s.eq(1).show().addClass("active"),s.eq(2).html("请选择").hide().removeClass("active"),s.eq(3).html("请选择").hide().removeClass("active"),t.eq(0).hide(),t.eq(1).show(),t.eq(2).empty().hide(),t.eq(3).empty().hide()),2===e&&(s.eq(0).removeClass("active"),s.eq(1).removeClass("active"),s.eq(2).show().addClass("active"),s.eq(3).html("请选择").hide().removeClass("active"),t.eq(0).hide(),t.eq(1).hide(),t.eq(2).show(),t.eq(3).empty().hide()),3===e&&(s.eq(0).removeClass("active"),s.eq(1).removeClass("active"),s.eq(2).removeClass("active"),s.eq(3).show().addClass("active"),t.eq(0).hide(),t.eq(1).hide(),t.eq(2).hide(),t.eq(3).show())}},{key:"_getAddress",value:function(){this.$wrap.remove(),this.settings.selectCallback(this.$element,this.addressInfo)}},{key:"_close",value:function(){this.settings.onBeforeClosed(),this.$wrap.remove(),this.settings.onClosed()}}]),a);function a(e,s){_classCallCheck(this,a),this.ipservice="//ipservice.suning.com",this.$element=i(e),this.settings=i.extend({},i.fn.address.defaults,s),this.addressInfo=[{id:"",name:""},{id:"",name:""},{id:"",name:""},{id:"",name:""}]}i.fn.address=function(e){return this.each(function(){new t(this,e)._init()})},i.fn.address.defaults={themeClass:"",zIndex:"999",titleText:"请选择地址",level:4,maskClose:!1,curAddress:null,onBeforeShow:function(){},onShow:function(){},selectCallback:function(){},onBeforeClosed:function(){},onClosed:function(){}}}(window.jQuery||window.Zepto,window,document);