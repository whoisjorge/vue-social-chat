'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var focusLoop = require('@vue-a11y/focus-loop');

var URL_ASSETS_LOGOS = 'https://raw.githubusercontent.com/ktquez/vue-social-chat/master/src/logos';
var URL_ASSETS_ICONS = 'https://raw.githubusercontent.com/ktquez/vue-social-chat/master/src/icons';

var HREF_BY_APP = {
  whatsapp: 'https://api.whatsapp.com/send?phone=%ph%&text=',
  messenger: 'https://m.me/%ph%',
  telegram: 'https://telegram.me/%ph%',
  viber: 'viber://chat?number=%ph%',
  wechat: 'weixin://dl/chat?%ph%',
  line: 'https://line.me/R/oaMessage/%ph%/',
  twitter: 'https://twitter.com/messages/compose?recipient_id=%ph%'
};

//

var script = {
  name: 'ListChat',

  props: {
    urlAssets: {
      type: String,
      default: URL_ASSETS_LOGOS
    },
    attendants: {
      type: Array,
      default: function () { return ([]); }
    }
  }
};

function normalizeComponent(template, style, script, scopeId, isFunctionalTemplate, moduleIdentifier /* server only */, shadowMode, createInjector, createInjectorSSR, createInjectorShadow) {
    if (typeof shadowMode !== 'boolean') {
        createInjectorSSR = createInjector;
        createInjector = shadowMode;
        shadowMode = false;
    }
    // Vue.extend constructor export interop.
    var options = typeof script === 'function' ? script.options : script;
    // render functions
    if (template && template.render) {
        options.render = template.render;
        options.staticRenderFns = template.staticRenderFns;
        options._compiled = true;
        // functional template
        if (isFunctionalTemplate) {
            options.functional = true;
        }
    }
    // scopedId
    if (scopeId) {
        options._scopeId = scopeId;
    }
    var hook;
    if (moduleIdentifier) {
        // server build
        hook = function (context) {
            // 2.3 injection
            context =
                context || // cached call
                    (this.$vnode && this.$vnode.ssrContext) || // stateful
                    (this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext); // functional
            // 2.2 with runInNewContext: true
            if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
                context = __VUE_SSR_CONTEXT__;
            }
            // inject component styles
            if (style) {
                style.call(this, createInjectorSSR(context));
            }
            // register component module identifier for async chunk inference
            if (context && context._registeredComponents) {
                context._registeredComponents.add(moduleIdentifier);
            }
        };
        // used by ssr in case component is cached and beforeCreate
        // never gets called
        options._ssrRegister = hook;
    }
    else if (style) {
        hook = shadowMode
            ? function (context) {
                style.call(this, createInjectorShadow(context, this.$root.$options.shadowRoot));
            }
            : function (context) {
                style.call(this, createInjector(context));
            };
    }
    if (hook) {
        if (options.functional) {
            // register for functional component in vue file
            var originalRender = options.render;
            options.render = function renderWithStyleInjection(h, context) {
                hook.call(context);
                return originalRender(h, context);
            };
        }
        else {
            // inject component registration as beforeCreate hook
            var existing = options.beforeCreate;
            options.beforeCreate = existing ? [].concat(existing, hook) : [hook];
        }
    }
    return script;
}

/* script */
var __vue_script__ = script;

/* template */
var __vue_render__ = function (_h,_vm) {var _c=_vm._c;return _c('ul',{staticClass:"vsc-popup-body__list"},[_vm._ssrNode((_vm._ssrList((_vm.props.attendants),function(attendant,index){return ("<li class=\"vsc-popup-body__list-item\"><a"+(_vm._ssrAttr("href",attendant.href))+" rel=\"noopener noreferer\" target=\"_blank\""+(_vm._ssrAttr("aria-label",("Contact " + (attendant.name) + ", opens in a new window")))+" class=\"vsc-popup-body__link\"><div class=\"vsc-popup-body__link-avatar\"><img"+(_vm._ssrAttr("src",attendant.avatar.src))+(_vm._ssrAttr("alt",attendant.avatar.alt))+"> <span class=\"vsc-popup-body__link-avatar-brand\""+(_vm._ssrStyle(null,attendant.app ? ("background-image: url(" + (_vm.props.urlAssets) + "/" + (attendant.app) + ".png)") : '', null))+"></span></div> <div class=\"vsc-popup-body__link-info\"><span class=\"vsc-popup-body__link-info__label\">"+_vm._ssrEscape(_vm._s(attendant.label))+"</span> <span class=\"vsc-popup-body__link-info__name\">"+_vm._ssrEscape(_vm._s(attendant.name))+"</span></div></a></li>")})))])};
var __vue_staticRenderFns__ = [];

  /* style */
  var __vue_inject_styles__ = undefined;
  /* scoped */
  var __vue_scope_id__ = undefined;
  /* module identifier */
  var __vue_module_identifier__ = "data-v-08dcc106";
  /* functional template */
  var __vue_is_functional_template__ = true;
  /* style inject */
  
  /* style inject SSR */
  
  /* style inject shadow dom */
  

  
  var __vue_component__ = /*#__PURE__*/normalizeComponent(
    { render: __vue_render__, staticRenderFns: __vue_staticRenderFns__ },
    __vue_inject_styles__,
    __vue_script__,
    __vue_scope_id__,
    __vue_is_functional_template__,
    __vue_module_identifier__,
    false,
    undefined,
    undefined,
    undefined
  );

//

var script$1 = {
  name: 'VueSocialChat',

  components: {
    ListChat: __vue_component__,
    FocusLoop: focusLoop.FocusLoop
  },

  props: {
    icon: {
      type: Boolean,
      default: false
    },

    attendants: {
      type: Array,
      default: function () { return ([]); }
    },

    dir: {
      type: String,
      default: 'ltr'
    },

    urlAssets: {
      type: String,
      default: URL_ASSETS_ICONS
    }
  },

  data: function () { return ({
    show: false,
    defaultAssetsPath: URL_ASSETS_ICONS
  }); },

  computed: {
    ariaLabelButton: function ariaLabelButton () {
      return ((this.show ? 'Close' : 'Open') + " social chat popup")
    },

    getAttendants: function getAttendants () {
      return this.attendants.map(function (attendant) {
        var href = attendant.app ? HREF_BY_APP[attendant.app].replace('%ph%', (attendant.number || attendant.id || attendant.username)) : attendant.href;
        return Object.assign({}, attendant, {href: href})
      })
    }
  },

  watch: {
    show: function show (val) {
      if (!val) { return this.removeEventListeners() }
      document.addEventListener('click', this.closeClickOutside);
      document.addEventListener('keydown', this.closeKeydownEsc);
    }
  },

  beforeDestroy: function beforeDestroy () {
    this.removeEventListeners();
  },

  methods: {
    togglePopup: function togglePopup () {
      var this$1 = this;

      this.show = !this.show;
      setTimeout(function () { return this$1.$refs.vscButton.blur(); }, 500);
      if (!this.show) { return this.$emit('close') }
      this.$emit('open');
    },

    closeClickOutside: function closeClickOutside (ref) {
      var target = ref.target;

      if (!this.$refs.vscPopup.contains(target)) { this.togglePopup(); }
    },

    closeKeydownEsc: function closeKeydownEsc (ref) {
      var which = ref.which;

      if (which === 27) { this.togglePopup(); }
    },

    removeEventListeners: function removeEventListeners () {
      document.removeEventListener('click', this.closeClickOutside);
      document.removeEventListener('keydown', this.closeKeydownEsc);
    }
  }
};

function createInjectorSSR(context) {
    if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
        context = __VUE_SSR_CONTEXT__;
    }
    if (!context)
        { return function () { }; }
    if (!('styles' in context)) {
        context._styles = context._styles || {};
        Object.defineProperty(context, 'styles', {
            enumerable: true,
            get: function () { return context._renderStyles(context._styles); }
        });
        context._renderStyles = context._renderStyles || renderStyles;
    }
    return function (id, style) { return addStyle(id, style, context); };
}
function addStyle(id, css, context) {
    var group =  css.media || 'default' ;
    var style = context._styles[group] || (context._styles[group] = { ids: [], css: '' });
    if (!style.ids.includes(id)) {
        style.media = css.media;
        style.ids.push(id);
        var code = css.source;
        style.css += code + '\n';
    }
}
function renderStyles(styles) {
    var css = '';
    for (var key in styles) {
        var style = styles[key];
        css +=
            '<style data-vue-ssr-id="' +
                Array.from(style.ids).join(' ') +
                '"' +
                (style.media ? ' media="' + style.media + '"' : '') +
                '>' +
                style.css +
                '</style>';
    }
    return css;
}

/* script */
var __vue_script__$1 = script$1;

/* template */
var __vue_render__$1 = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('FocusLoop',{attrs:{"disabled":!_vm.show}},[_c('div',{ref:"vscPopup",staticClass:"vsc-popup",attrs:{"dir":_vm.dir}},[_c('transition',{attrs:{"name":"scale"}},[_c('div',{directives:[{name:"show",rawName:"v-show",value:(_vm.show),expression:"show"}],staticClass:"vsc-popup-box",attrs:{"id":"vsc-popup-box"}},[_c('div',{directives:[{name:"show",rawName:"v-show",value:(_vm.$slots.header),expression:"$slots.header"}],staticClass:"vsc-popup-header"},[_vm._t("header")],2),_vm._v(" "),_c('div',{staticClass:"vsc-popup-body"},[_vm._t("body",[(_vm.urlAssets === _vm.defaultAssetsPath)?[_c('ListChat',{attrs:{"attendants":_vm.getAttendants}})]:[_c('ListChat',{attrs:{"url-assets":_vm.urlAssets,"attendants":_vm.getAttendants}})]])],2),_vm._v(" "),_c('div',{directives:[{name:"show",rawName:"v-show",value:(_vm.$slots.footer),expression:"$slots.footer"}],staticClass:"vsc-popup-footer"},[_vm._t("footer")],2)])]),_vm._v(" "),_c('button',{ref:"vscButton",staticClass:"vsc-popup-button vsc-popup-button--default",class:{ 'vsc-popup-button--no-icon': !_vm.icon },attrs:{"aria-haspopup":"true","aria-controls":"vsc-popup-box","aria-expanded":_vm.show ? 'true' : 'false',"aria-label":_vm.ariaLabelButton,"title":_vm.ariaLabelButton},on:{"click":_vm.togglePopup}},[_c('span',{directives:[{name:"show",rawName:"v-show",value:(!_vm.show || !_vm.icon),expression:"!show || !icon"}]},[_vm._t("button",[_c('img',{attrs:{"src":(_vm.urlAssets + "/chat.svg"),"alt":"chat icon","aria-hidden":"true"}})],{"open":_vm.show})],2),_vm._v(" "),_c('span',{directives:[{name:"show",rawName:"v-show",value:(_vm.show && _vm.icon),expression:"show && icon"}]},[_vm._t("button-close",[_c('img',{attrs:{"src":(_vm.urlAssets + "/close.svg"),"alt":"close icon","aria-hidden":"true"}})])],2)])],1)])};
var __vue_staticRenderFns__$1 = [];

  /* style */
  var __vue_inject_styles__$1 = function (inject) {
    if (!inject) { return }
    inject("data-v-5f754530_0", { source: ":root{--vsc-bg-header:#333;--vsc-bg-footer:#fafafa;--vsc-text-color-header:#fff;--vsc-text-color-footer:inherit;--vsc-bg-button:#333;--vsc-text-color-button:#fff;--vsc-outline-color:#333;--vsc-border-color-bottom-header:transparent;--vsc-border-color-top-footer:#f3f3f3}.vsc-popup *{box-sizing:border-box;padding:0;margin:0}.vsc-popup{position:fixed;z-index:999;right:20px;bottom:20px;display:flex;flex-wrap:wrap;justify-content:flex-end;max-width:380px;margin-left:20px;-webkit-font-smoothing:antialiased}.vsc-popup[dir=ltr]{text-align:left}.vsc-popup[dir=rtl]{left:20px;right:auto;display:flex;flex-wrap:wrap;justify-content:flex-end}.vsc-popup[dir=rtl] .vsc-popup-box{transform-origin:bottom left}.vsc-popup[dir=rtl] .vsc-popup-body .vsc-popup-body__link-info{padding-left:0;padding-right:10px}.vsc-popup-box{transition:transform .3s ease-in-out,opacity .2s,visibility .2s;transform-origin:bottom right;transform:scale3d(1,1,1);border-radius:10px;margin-bottom:10px;box-shadow:0 5px 25px -5px rgba(45,62,79,.15);background-color:#fbfbfb;border:var(--vsc-border-default);overflow:hidden}.vsc-popup .scale-enter,.vsc-popup .scale-leave-active{transform:scale3d(0,0,0)}.vsc-popup-header{padding:22px 18px;border-bottom:5px solid var(--vsc-border-color-bottom-header);background-color:var(--vsc-bg-header);color:var(--vsc-text-color-header)}.vsc-popup-body{padding:14px;background-color:#fff;max-height:300px;overflow:auto}.vsc-popup-body__list{list-style:none;display:flex;flex-wrap:wrap}.vsc-popup-body__list-item{width:100%}.vsc-popup-body__list-item:not(:last-child){border-bottom:1px solid #fbfbfb}.vsc-popup-body__link{outline:0;display:flex;padding:10px 18px;text-decoration:none;color:#333;letter-spacing:.2px;margin:1.5px 0;border-radius:10px;text-decoration:none!important}.vsc-popup-body__link:focus,.vsc-popup-body__link:hover{background-color:#fbfbfb}.vsc-popup-body__link:focus{box-shadow:0 0 0 3px var(--vsc-outline-color)}.vsc-popup-body__link-avatar{position:relative;width:62px;height:62px}.vsc-popup-body__link-avatar>img{width:100%;height:100%;object-fit:cover;border-radius:50%}.vsc-popup-body__link-avatar-brand{position:absolute;right:2px;bottom:2px;width:15px;height:15px;background-repeat:no-repeat;background-size:contain}.vsc-popup-body__link-info{padding-top:12px;padding-left:12px}.vsc-popup-body__link-info>span{display:block;line-height:1rem}.vsc-popup-body__link-info__label{font-size:12px}.vsc-popup-body__link-info__name{font-weight:700;margin-top:2px;font-size:18px}.vsc-popup-footer{padding:16px;border-top:1px solid var(--vsc-border-color-top-footer);background-color:var(--vsc-bg-footer);color:var(--vsc-text-color-footer)}.vsc-popup-button{outline:0;appearance:none;-webkit-appearance:none;-moz-appearance:none;background-color:transparent;color:var(--vsc-text-color-button);border:none;cursor:pointer;border-radius:50%;width:60px;height:60px;display:inline-block;padding-top:2px;box-shadow:0 3px 10px rgba(0,0,0,.2);font-family:inherit;transition:background-color .3s,box-shadow .2s}.vsc-popup-button--default{background-color:var(--vsc-bg-button)}.vsc-popup-button--no-icon{border-radius:30px;height:auto;width:auto;padding:14px 20px}.vsc-popup-button:focus,.vsc-popup-button:hover{box-shadow:0 0 0 3px #fff,0 0 0 6px var(--vsc-outline-color)}@media (prefers-reduced-motion:reduce){.vsc-popup *{transition:none}}", map: undefined, media: undefined });

  };
  /* scoped */
  var __vue_scope_id__$1 = undefined;
  /* module identifier */
  var __vue_module_identifier__$1 = "data-v-5f754530";
  /* functional template */
  var __vue_is_functional_template__$1 = false;
  /* style inject shadow dom */
  

  
  var __vue_component__$1 = /*#__PURE__*/normalizeComponent(
    { render: __vue_render__$1, staticRenderFns: __vue_staticRenderFns__$1 },
    __vue_inject_styles__$1,
    __vue_script__$1,
    __vue_scope_id__$1,
    __vue_is_functional_template__$1,
    __vue_module_identifier__$1,
    false,
    undefined,
    createInjectorSSR,
    undefined
  );

function install (Vue) {
  if (install.installed) { return }
  install.installed = true;
  Vue.component('SocialChat', __vue_component__$1);
}

// auto install
if (typeof window !== 'undefined' && typeof window.Vue !== 'undefined') {
  window.Vue.use(install);
}

exports.SocialChat = __vue_component__$1;
exports.default = install;
