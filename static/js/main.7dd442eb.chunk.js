(this.webpackJsonpthreddit=this.webpackJsonpthreddit||[]).push([[0],{19:function(e,t,n){e.exports={sidebar:"Navbar_sidebar__mwQyv",buttons:"Navbar_buttons__3W0vS",buttonLayout:"Navbar_buttonLayout__2VQ-d",selectedSubreddit:"Navbar_selectedSubreddit__zvZa5",nav:"Navbar_nav__3cHYR"}},20:function(e,t,n){e.exports={container:"Modal_container__Nc-xq",modalContainer:"Modal_modalContainer__1CKZv",smallModalBox:"Modal_smallModalBox__2FFp1",normalModalBox:"Modal_normalModalBox__3o1l0"}},23:function(e,t,n){e.exports={layout:"GoToSubreddit_layout__21D0p",subredditInput:"GoToSubreddit_subredditInput__m12PC",goButton:"GoToSubreddit_goButton__6dCc-",closeButton:"GoToSubreddit_closeButton__3W8HW"}},24:function(e,t,n){e.exports={layout:"AddSubreddit_layout__2jH53",subredditInput:"AddSubreddit_subredditInput__2Ks9l",addButton:"AddSubreddit_addButton__3gyg4",closeButton:"AddSubreddit_closeButton__3_fe6"}},30:function(e,t,n){e.exports={field:"TextInput_field__3Nkmt",active:"TextInput_active__3dxBt",locked:"TextInput_locked___Exol",error:"TextInput_error__2rUuX"}},37:function(e,t,n){e.exports={container:"Dashboard_container__205D7",content:"Dashboard_content__1OVLf"}},47:function(e,t,n){e.exports={button:"Button_button__CftuL"}},50:function(e,t,n){e.exports={spinner:"Spinner_spinner__-Zzob",spin:"Spinner_spin__rZPQ7"}},7:function(e,t,n){e.exports={container:"Comments_container__2gEP4",commentsContainer:"Comments_commentsContainer__3yUU3",hamburger:"Comments_hamburger__1FiW_",backArrow:"Comments_backArrow__3geJG",loading:"Comments_loading__2kYMG",comment:"Comments_comment__3yO4C",postSection:"Comments_postSection__1iARa",postSectionHeader:"Comments_postSectionHeader__1YSqL",postSectionPreview:"Comments_postSectionPreview__39AzW",closeButton:"Comments_closeButton__3YHDJ",previewImg:"Comments_previewImg__Xck6t",textHtml:"Comments_textHtml__3XLtl"}},89:function(e,t,n){},9:function(e,t,n){e.exports={container:"Posts_container__3vF_i",posts:"Posts_posts__fNhWU",subredditText:"Posts_subredditText__cTroL",hamburger:"Posts_hamburger__d_e42",link:"Posts_link__JEwjG",postWrapper:"Posts_postWrapper__5hsp2",loading:"Posts_loading__3ZzJ9",post:"Posts_post__LyNp_",thumbnail:"Posts_thumbnail__OSOEU",selectedPost:"Posts_selectedPost__2kv0K",heart:"Posts_heart__2tyg7"}},90:function(e,t,n){"use strict";n.r(t);var c=n(2),r=n.n(c),s=n(46),a=n.n(s),o=n(16),i=n(3),d=n(4),u=n(18),l=n(8),b=n.n(l),h=n(17),j=n(14),m=n(36),x=n(9),f=n.n(x),p=n(15),v=n(19),_=n.n(v),O=n(47),g=n.n(O),w=n(1);var C=function(e){e.type;var t=e.onClickEvent,n=e.label;return Object(w.jsx)("button",{type:"submit",className:g.a.button,onClick:t,children:n})};var S=function(e){var t=e.navData,n=e.selectedSubreddit,c=e.onCloseNav,r=e.onShowGoToSubreddit,s=e.onShowAddSubreddit,a=n?"/r/"+n:"",i=t.map((function(e,t){var n;return(a===e.path||""===a&&"/home"===e.path)&&(n=_.a.selectedSubreddit),Object(w.jsx)("li",{children:Object(w.jsx)(o.b,{className:n,to:e.path,children:e.text})},t)}));return Object(w.jsxs)("div",{className:_.a.sidebar,children:[Object(w.jsx)("span",{children:Object(w.jsx)(p.b,{alt:"Close",onClick:c,size:"50px"})}),Object(w.jsx)("nav",{className:_.a.nav,children:Object(w.jsx)("ul",{children:i})}),Object(w.jsxs)("div",{className:_.a.buttons,children:[Object(w.jsx)("span",{className:_.a.buttonLayout,children:Object(w.jsx)(C,{onClickEvent:r,label:"Go to Subreddit"})}),Object(w.jsx)("span",{className:_.a.buttonLayout,children:Object(w.jsx)(C,{onClickEvent:s,label:"Add Subreddit"})})]})]})},y=n(7),N=n.n(y),k=n(26),P=n.n(k);var I=function(e){var t,n=e.post;if(n){var c=n.title,s=n.score,a=n.num_comments,o=n.getPrefixedAuthor(),i=n.timeSince(),d=n.getPreviewSource(),u=n.text_html?P.a.decode(n.text_html):void 0,l=n.url?Object(w.jsx)("a",{href:n.url,target:"_blank",rel:"noreferrer",children:n.url}):void 0,b=d?Object(w.jsx)("img",{className:N.a.previewImg,src:d.url,alt:"".concat(n.subreddit_name_prefixed," - ").concat(n.title)}):void 0;t=Object(w.jsxs)("div",{className:N.a.postSection,children:[Object(w.jsxs)("div",{children:["r/",n.subreddit," Posted by ",o," ",i]}),Object(w.jsx)("h3",{children:c}),l,Object(w.jsx)("br",{}),Object(w.jsx)("div",{className:N.a.postSectionPreview,children:b}),Object(w.jsx)("div",{className:N.a.textHtml,dangerouslySetInnerHTML:{__html:u}}),Object(w.jsx)("br",{}),Object(w.jsxs)("div",{children:[s," score | ",a," comments"]})]})}return Object(w.jsx)(r.a.Fragment,{children:t})};var E=function(e){var t,n=e.comment,c=n.score,r=n.body_html,s=n.id,a=n.depth,o=n.getPrefixedAuthor(),i=n.timeSince();return r&&(t=P.a.decode(r)),Object(w.jsxs)("div",{className:N.a.comment,children:[Object(w.jsxs)("div",{children:["Posted by ",o," ",i]}),Object(w.jsx)("div",{dangerouslySetInnerHTML:{__html:t}}),Object(w.jsx)("br",{}),Object(w.jsxs)("div",{children:[c," score | Comment depth: ",a]})]},s)};var L=function(e){var t=e.comments.map((function(e,t){return Object(w.jsx)(E,{comment:e},"".concat(e.id).concat(t))}));return Object(w.jsxs)("div",{children:[t,Object(w.jsx)("br",{}),Object(w.jsx)("br",{})]})},M=n(51),B=n(50),T=n.n(B);var A=function(e){return e.size,Object(w.jsx)(M.a,{alt:"Loading...",icon:"spinner",className:T.a.spinner,size:"40px"})},H=n(52);var z=function(e){var t=e.onClick;return e.size,Object(w.jsx)(H.a,{onClick:t,size:"30px"})},D=n(27),F=n.n(D),U=n(28),R=n(29),G=function(){function e(t){Object(U.a)(this,e),this.author=t.author,this.created_utc=t.created_utc,this.body=t.body,this.body_html=t.body_html,this.depth=t.depth,this.id=t.id,this.commentId=t.name,this.parent_id=t.parent_id,this.score=t.score,this.subreddit=t.subreddit,this.subreddit_name_prefixed=t.subreddit_name_prefixed}return Object(R.a)(e,[{key:"getPrefixedAuthor",value:function(){return"u/".concat(this.author)}},{key:"timeSince",value:function(){var e=new Date(1e3*this.created_utc),t=Math.floor((new Date-e)/1e3),n=t/31536e3;return n>1?Math.floor(n)+" years ago":(n=t/2592e3)>1?Math.floor(n)+" months ago":(n=t/86400)>1?Math.floor(n)+" days ago":(n=t/3600)>1?Math.floor(n)+" hours ago":(n=t/60)>1?Math.floor(n)+" minutes ago":Math.floor(t)+" seconds ago"}}]),e}(),W=function(){function e(t){Object(U.a)(this,e),this.author=t.author,this.created_utc=t.created_utc,this.id=t.id,this.postId=t.name,this.is_video=t.is_video,this.score=t.score,this.subreddit=t.subreddit,this.subreddit_id=t.subreddit_id,this.subreddit_name_prefixed=t.subreddit_name_prefixed,this.title=t.title,this.url=t.url,this.num_comments=t.num_comments,this.text=t.selftext,this.text_html=t.selftext_html,this.preview=t.preview,this.is_video=t.is_video,this.thumbnail=t.url&&t.thumbnail_height&&t.thumbnail_width?{url:t.thumbnail,height:t.thumbnail_height,width:t.thumbnail_width}:void 0}return Object(R.a)(e,[{key:"getPreviewSource",value:function(){if(this.preview&&this.preview.images&&this.preview.images.length>0&&!this.is_video){var e=this.preview.images[0].source;if(!e)return;return{height:e.height,width:e.width,url:e.url.replace("amp;","")}}}},{key:"getPrefixedAuthor",value:function(){return"u/".concat(this.author)}},{key:"getLowerCasedSubreddit",value:function(){return this.subreddit.toLowerCase()}},{key:"timeSince",value:function(){var e=new Date(1e3*this.created_utc),t=Math.floor((new Date-e)/1e3),n=t/31536e3;return n>1?Math.floor(n)+" years ago":(n=t/2592e3)>1?Math.floor(n)+" months ago":(n=t/86400)>1?Math.floor(n)+" days ago":(n=t/3600)>1?Math.floor(n)+" hours ago":(n=t/60)>1?Math.floor(n)+" minutes ago":Math.floor(t)+" seconds ago"}}]),e}();function J(e,t){return X.apply(this,arguments)}function X(){return(X=Object(j.a)(b.a.mark((function e(t,n){var c,r,s,a,o,i;return b.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,F.a.get("".concat(t,"?limit=50"));case 3:if(c=e.sent,console.log(c),200===c.status){e.next=7;break}throw new Error("Unable to fetch comments");case 7:e.next=12;break;case 9:throw e.prev=9,e.t0=e.catch(0),new Error("Unable to fetch comments");case 12:if(!c||!c.data){e.next=23;break}if(n&&(r=new W(c.data[0].data.children[0].data)),s=c.data[1]){e.next=17;break}throw new Error("Unable to fetch comments");case 17:if(a=s.data){e.next=20;break}throw new Error("Unable to fetch comments");case 20:return o=a.children,i=Z(o),e.abrupt("return",{post:r,comments:i});case 23:case"end":return e.stop()}}),e,null,[[0,9]])})))).apply(this,arguments)}function Z(e){return e.reduce((function(e,t){var n=t.data,c=new G(n);if(n.replies){var r=Z(n.replies.data.children);e.push(c),e=[].concat(Object(h.a)(e),Object(h.a)(r))}else e.push(c);return e}),[])}function Y(e,t){return"https://www.reddit.com/r/".concat(e,"/comments/").concat(t,".json")}var K=function(e){var t=e.selectedPost,n=e.onCloseComments,r=e.match,s=e.onCloseNav,a=e.showNavBar,o=Object(c.useState)([]),i=Object(d.a)(o,2),u=i[0],l=i[1],h=Object(c.useState)(void 0),m=Object(d.a)(h,2),x=m[0],f=m[1],v=Object(c.useState)(!1),_=Object(d.a)(v,2),O=_[0],g=_[1],C=r.params,S=C.postId,y=C.subreddit,k=Object(c.useRef)(),P=!(t&&(!t||t.id===S)),E=P?x:t;Object(c.useEffect)((function(){return document.addEventListener("keydown",n),function(){document.removeEventListener("keydown",n),l([]),f(void 0)}}),[n]),Object(c.useEffect)((function(){function e(){return(e=Object(j.a)(b.a.mark((function e(){var t,n,c,r;return b.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return t=Y(y,S),g(!0),e.prev=2,e.next=5,J(t,P);case 5:n=e.sent,c=n.post,r=n.comments,l(r),P&&f(c),e.next=15;break;case 12:e.prev=12,e.t0=e.catch(2),console.error(e.t0);case 15:g(!1);case 16:case"end":return e.stop()}}),e,null,[[2,12]])})))).apply(this,arguments)}return k.current.scrollTo(0,0),function(){e.apply(this,arguments)}(y,S),function(){l([]),f(void 0)}}),[y,S,P]);var M=O?Object(w.jsx)("div",{className:N.a.loading,children:Object(w.jsx)(A,{})}):void 0,B=a?Object(w.jsx)(p.a,{className:N.a.backArrow,alt:"Back",onClick:n,size:"30px"}):Object(w.jsx)("span",{});return Object(w.jsxs)("div",{className:N.a.container,ref:k,children:[Object(w.jsxs)("div",{className:N.a.postSectionHeader,children:[Object(w.jsxs)("span",{className:N.a.hamburger,children:[!a&&Object(w.jsx)(z,{onClick:s}),B]}),Object(w.jsx)("div",{children:Object(w.jsx)(p.b,{alt:"Close",onClick:n,size:"40px"})})]}),Object(w.jsx)("div",{className:N.a.commentsContainer,children:Object(w.jsxs)("div",{className:N.a.commentsSection,children:[Object(w.jsx)(I,{post:E,onCloseComments:n}),Object(w.jsx)("br",{}),M,Object(w.jsx)(L,{comments:u})]})})]})},Q=n(53),V=n(55),q=n(54);var $=function(e){var t,n=e.isHome,c=e.post,r=e.onClickPost,s=c.title,a=c.score,i=c.num_comments,d=c.getPrefixedAuthor(),u=c.timeSince(),l=n?"/home/r/".concat(c.subreddit,"/comments/").concat(c.id):"/r/".concat(c.subreddit,"/comments/").concat(c.id);if(c.thumbnail){var b=c.thumbnail,h=b.url,j=b.height,m=b.width;t=Object(w.jsx)("div",{className:f.a.thumbnail,children:Object(w.jsx)("img",{src:h,width:m,height:j,alt:s})})}var x=n?c.subreddit_name_prefixed:void 0;return Object(w.jsx)("article",{className:f.a.post,onClick:function(){return r(c)},children:Object(w.jsxs)(o.b,{className:f.a.link,to:l,children:[Object(w.jsxs)("div",{children:[x," Posted by ",d," ",u]}),Object(w.jsx)("h3",{children:s}),t,Object(w.jsxs)("div",{children:[a," score | ",i," comments"]})]})})};var ee=function(e){var t=e.subreddit,n=e.isHome,r=e.hasNextPage,s=e.isNextPageLoading,a=e.postList,o=e.loadNextPage,i=e.onClickPost,d=r?a.length+1:a.length,u=function(e){return!r||e<a.length},l=Object(c.useRef)(null),b=Object(c.useRef)(null),h=Object(c.useRef)(null),j=s?function(){}:o;Object(c.useEffect)((function(){l.current&&(console.log("resetting since subreddit changed and VariableSizedList keeps a cache of dimensions for each index"),l.current.resetAfterIndex(0),h.current=null)}),[t]),Object(c.useEffect)((function(){console.log("postList changed with loadingIndexRef = "+h.current),h.current&&l.current.resetAfterIndex(h.current)}),[a]);var m=function(e){if(!u(e))return h.current=e,150;var t=a[e],n=document.createElement("div"),c=document.createElement("h3"),r=document.createElement("div"),s=document.createElement("div");if(c.innerText=t.title,r.innerText="r/".concat(t.subreddit," Posted by ").concat(t.prefixedAuthor," XXX days ago"),s.innerText="".concat(t.score," score | ").concat(t.num_comments," comments"),b.current){console.log(b.current);var o=.1*b.current;console.log("margin = "+o);var i=b.current-o-o-15;console.log("new width "+i);var d="width:".concat(i,"px;").concat("font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen,Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;",";word-wrap:break-word");c.style.cssText=d,r.style.cssText=d,s.style.cssText=d}if(n.appendChild(c),n.appendChild(r),n.appendChild(s),t.thumbnail){var l=t.thumbnail,j=l.width,m=l.height,x=document.createElement("div");x.style.cssText="width:".concat(j,"px;height:").concat(m,"px;"),n.appendChild(x)}var f=function(e){var t=e.cloneNode(!0);t.style.cssText="position:fixed; top:-9999px; opacity:0;",document.body.appendChild(t);var n=t.clientHeight;return t.parentNode.removeChild(t),n}(n);return console.log("nodeHeight = ".concat(f)),50+f},x=function(e){var t=e.index,c=e.style,r=a[t];return u(t)?Object(w.jsx)("div",{style:c,className:f.a.postWrapper,children:Object(w.jsx)($,{isHome:n,post:r,onClickPost:i},r.id)}):Object(w.jsx)("div",{style:c,className:"".concat(f.a.loading),children:Object(w.jsx)(A,{})})};return Object(w.jsx)(q.a,{children:function(e){var t=e.height,n=e.width;return n!==b.current&&(b.current=n),Object(w.jsx)(Q.a,{isItemLoaded:u,itemCount:d,loadMoreItems:j,threshold:8,children:function(e){var c=e.onItemsRendered,r=e.ref;return Object(w.jsx)(V.a,{itemCount:d,onItemsRendered:c,ref:function(e){r(e),l.current=e},itemSize:m,height:t,width:n,children:x})}})}})},te=n(23),ne=n.n(te),ce=n(30),re=n.n(ce);var se=function(e){var t=e.id,n=e.locked,r=e.focused,s=e.value,a=e.error,o=e.label,i=void 0===o?"":o,u=e.onChange,l=Object(c.useState)(n&&r||!1),b=Object(d.a)(l,2),h=b[0],j=b[1],m=Object(c.useState)(s||""),x=Object(d.a)(m,2),f=x[0],p=x[1],v=Object(c.useState)(a||""),_=Object(d.a)(v,2),O=_[0],g=_[1],C="".concat(re.a.field," ").concat((n?h:h||s)&&re.a.active," ").concat(n&&!h?re.a.locked:void 0);return Object(w.jsxs)("div",{className:C,children:[Object(w.jsx)("input",{id:t,type:"text",value:f,placeholder:i,onChange:function(e){var n=e.target.value;return p(n),g(""),u(t,n)},onFocus:function(){return!n&&j(!0)},onBlur:function(){return!n&&j(!1)}}),Object(w.jsx)("label",{htmlFor:t,className:a&&"error",children:O||i})]})},ae=n(20),oe=n.n(ae);var ie=function(e){var t,n=e.children,r=e.onClose,s=e.size,a=Object(c.useRef)(null),o=Object(c.useRef)(null);if("small"===s)t=oe.a.smallModalBox;else t=oe.a.normalModalBox;return Object(c.useEffect)((function(){function e(e){a.current&&a.current.contains(e.target)&&o.current&&!o.current.contains(e.target)&&r()}return document.addEventListener("mousedown",e),function(){document.removeEventListener("mousedown",e)}}),[a,o,r]),Object(w.jsx)("div",{ref:a,className:oe.a.container,children:Object(w.jsx)("div",{className:oe.a.modalContainer,children:Object(w.jsx)("div",{ref:o,className:t,children:n})})})};var de=function(e){var t=e.onClose,n=Object(c.useState)(""),r=Object(d.a)(n,2),s=r[0],a=r[1],o=Object(i.g)();return Object(w.jsx)(ie,{onClose:t,size:"small",children:Object(w.jsxs)("form",{className:ne.a.layout,children:[Object(w.jsx)("span",{className:ne.a.closeButton,children:Object(w.jsx)(p.b,{alt:"Close",onClick:t,size:"40px"})}),Object(w.jsx)("div",{className:ne.a.subredditInput,children:Object(w.jsx)(se,{label:"Subreddit",onChange:function(e,t){a(t)}})}),Object(w.jsx)("div",{className:ne.a.goButton,children:Object(w.jsx)(C,{type:"submit",label:"Go",onClickEvent:function(e){e.preventDefault(),t(),o.push("/r/"+s)}})})]})})};function ue(e){localStorage.getItem(e)||localStorage.setItem(e,"/r/"+e)}function le(e){return!!localStorage.getItem(e)}var be=n(24),he=n.n(be);var je=function(e){var t=e.onClose,n=e.fetchSubreddits,r=Object(c.useState)(""),s=Object(d.a)(r,2),a=s[0],o=s[1];return Object(w.jsx)(ie,{onClose:t,size:"small",children:Object(w.jsxs)("form",{className:he.a.layout,children:[Object(w.jsx)("span",{className:he.a.closeButton,children:Object(w.jsx)(p.b,{alt:"Close",onClick:t,size:"40px"})}),Object(w.jsx)("div",{className:he.a.subredditInput,children:Object(w.jsx)(se,{label:"Subreddit",onChange:function(e,t){o(t)}})}),Object(w.jsx)("div",{className:he.a.addButton,children:Object(w.jsx)(C,{type:"submit",label:"Add",onClickEvent:function(e){e.preventDefault(),ue(a),n(),t()}})})]})})};function me(e,t){return xe.apply(this,arguments)}function xe(){return(xe=Object(j.a)(b.a.mark((function e(t,n){var c,r,s,a,o;return b.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return t||(t="all"),e.prev=1,e.next=4,F.a.get("https://www.reddit.com/r/".concat(t,".json?after=").concat(n,"&limit=15"));case 4:if(c=e.sent,console.log(c),200===c.status){e.next=8;break}throw new Error("Unable to fetch posts for ".concat(t));case 8:e.next=13;break;case 10:throw e.prev=10,e.t0=e.catch(1),new Error("Unable to fetch posts for ".concat(t));case 13:if(!(c&&c.data&&c.data.data)){e.next=17;break}return r=c.data.data,s=r.children,a=r.after,o=fe(s),e.abrupt("return",{posts:o,nextAfter:a});case 17:case"end":return e.stop()}}),e,null,[[1,10]])})))).apply(this,arguments)}function fe(e){return e.map((function(e){return new W(e.data)}))}var pe=function(e){var t=e.match,n=e.isHome,r=e.subreddits,s=e.fetchSubreddits,a=t.params.subreddit,o=Object(c.useState)([]),l=Object(d.a)(o,2),x=l[0],p=l[1],v=Object(c.useState)(""),_=Object(d.a)(v,2),O=_[0],g=_[1],C=Object(c.useState)(void 0),y=Object(d.a)(C,2),N=y[0],k=y[1],P=Object(i.g)(),I=Object(c.useState)(!0),E=Object(d.a)(I,2),L=E[0],M=E[1],B=Object(c.useState)(!1),T=Object(d.a)(B,2),H=T[0],D=T[1],F=Object(c.useState)(!1),U=Object(d.a)(F,2),R=U[0],G=U[1],W=Object(c.useState)(!1),J=Object(d.a)(W,2),X=J[0],Z=J[1],Y=Object(c.useState)(!1),Q=Object(d.a)(Y,2),V=Q[0],q=Q[1],$=n?"/home/r/:subreddit/comments/:postId":"/r/:subreddit/comments/:postId";function te(){M(!L)}function ne(){G(!1),D(!H)}function ce(){D(!1),G(!R)}function re(e){27!==e.keyCode&&"click"!==e.type||(k(void 0),n?P.push("/home"):P.push("/r/".concat(a)))}Object(c.useEffect)((function(){function e(){return e=Object(j.a)(b.a.mark((function e(t,n){var c,r,s;return b.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,me(t,n);case 3:c=e.sent,r=c.posts,s=c.nextAfter,p(r),g(s),Z(!!s),q(!1),e.next=15;break;case 12:e.prev=12,e.t0=e.catch(0),console.error(e.t0);case 15:case"end":return e.stop()}}),e,null,[[0,12]])}))),e.apply(this,arguments)}return q(!0),function(t,n){e.apply(this,arguments)}(a,""),function(){k(void 0),p([]),g(""),q(!1),Z(!1),console.log("subreddit changed in postsview")}}),[a]);var se=""===O?Object(w.jsx)("div",{className:f.a.loading,children:Object(w.jsx)(A,{})}):void 0,ae=n?Object(w.jsx)("div",{children:"Home"}):Object(w.jsxs)("div",{children:["r/",a]});return Object(w.jsxs)("div",{className:f.a.container,children:[L&&Object(w.jsx)(S,{navData:r,selectedSubreddit:a,onCloseNav:te,onShowGoToSubreddit:ne,onShowAddSubreddit:ce}),Object(w.jsxs)("div",{className:f.a.posts,children:[Object(w.jsx)(i.b,{path:$,render:function(e){return Object(w.jsx)(K,Object(u.a)(Object(u.a)({},e),{},{onCloseNav:te,showNavBar:L,selectedPost:N,onCloseComments:re}))}}),H&&Object(w.jsx)(de,{onClose:ne}),R&&Object(w.jsx)(je,{onClose:ce,fetchSubreddits:s}),Object(w.jsxs)("div",{className:f.a.subredditText,children:[!L&&Object(w.jsx)("span",{className:f.a.hamburger,children:Object(w.jsx)(z,{onClick:te})}),Object(w.jsx)("h3",{children:Object(w.jsx)("i",{children:ae})}),!n&&Object(w.jsx)("span",{className:f.a.heart,children:le(a)?Object(w.jsx)(m.b,{size:"30px",color:"rgb(249, 24, 128)",onClick:function(){console.log("test"),function(e){localStorage.removeItem(e)}(a),s()}}):Object(w.jsx)(m.a,{size:"30px",onClick:function(){ue(a),s()}})})]}),Object(w.jsx)("br",{}),se,Object(w.jsx)(ee,{subreddit:a,isHome:n,hasNextPage:X,isNextPageLoading:V,postList:x,loadNextPage:function(){var e;function t(e,t){try{setTimeout(Object(j.a)(b.a.mark((function n(){var c,r,s;return b.a.wrap((function(n){for(;;)switch(n.prev=n.next){case 0:return n.next=2,me(e,t);case 2:c=n.sent,r=c.posts,s=c.nextAfter,p((function(e){return[].concat(Object(h.a)(e),Object(h.a)(r))})),g(s),Z(!!s),q(!1);case 9:case"end":return n.stop()}}),n)}))),1e3)}catch(n){console.error(n)}}for(var n=arguments.length,c=new Array(n),r=0;r<n;r++)c[r]=arguments[r];(e=console).log.apply(e,["_loadNextPage"].concat(c)),q(!0),t(a,O)},onClickPost:function(e){console.log(e),k(e)}})]})]})};var ve=function(e){var t=e.subreddits,n=e.fetchSubreddits;return Object(w.jsxs)(i.d,{children:[Object(w.jsx)(i.b,{exact:!0,path:"/",children:Object(w.jsx)(i.a,{to:"/home"})}),Object(w.jsx)(i.b,{path:"/home",render:function(e){return Object(w.jsx)(pe,Object(u.a)(Object(u.a)({},e),{},{isHome:!0,subreddits:t,fetchSubreddits:n}))}}),Object(w.jsx)(i.b,{path:"/r/:subreddit",render:function(e){return Object(w.jsx)(pe,Object(u.a)(Object(u.a)({},e),{},{isHome:!1,subreddits:t,fetchSubreddits:n}))}})]})},_e=n(37),Oe=n.n(_e);var ge=function(){var e=Object(c.useState)([]),t=Object(d.a)(e,2),n=t[0],r=t[1],s=Object(c.useCallback)((function(){var e=function(){var e=Object.keys(localStorage).map((function(e){return{path:localStorage.getItem(e),text:e}})).sort((function(e,t){var n=e.text.toLowerCase(),c=t.text.toLowerCase();return n<c?-1:n>c?1:0}));return[{path:"/home",text:"Home"}].concat(Object(h.a)(e))}();r(e)}),[]);return Object(c.useEffect)((function(){s()}),[s]),Object(w.jsx)("main",{className:Oe.a.container,children:Object(w.jsx)("div",{className:Oe.a.content,children:Object(w.jsx)(ve,{subreddits:n,fetchSubreddits:s})})})};var we=function(){return Object(w.jsx)(r.a.Fragment,{children:Object(w.jsx)(o.a,{children:Object(w.jsx)(i.d,{children:Object(w.jsx)(i.b,{path:"*",component:ge})})})})};var Ce=function(){return Object(w.jsx)(we,{})},Se=(n(89),function(e){e&&e instanceof Function&&n.e(3).then(n.bind(null,91)).then((function(t){var n=t.getCLS,c=t.getFID,r=t.getFCP,s=t.getLCP,a=t.getTTFB;n(e),c(e),r(e),s(e),a(e)}))});a.a.render(Object(w.jsx)(r.a.StrictMode,{children:Object(w.jsx)(Ce,{})}),document.getElementById("app")),Se()}},[[90,1,2]]]);
//# sourceMappingURL=main.7dd442eb.chunk.js.map