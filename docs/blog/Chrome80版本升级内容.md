# Chrome80 版本升级内容

> 可以说 Google Chrome 80 版本的发布的确是一个里程碑式的升级，那下面就来看看都升级哪些 feature

## 升级内容

1. JavaScript Optional chaining 和 Nullish coalescing 正式支持。
2. Favicon 图标支持 SVG 格式。
3. 移除对 FTP 的支持。
4. Web workers 中支持 ES modules。
5. Content indexing API。
6. 禁用第三方 Cookie（下面详解）

### 第一个升级内容：JavaScript Optional chaining 和 Nullish coalescing 正式支持。

**下面简单的介绍下两个内容：**

1. **JavaScript Optional chaining**

```js
// 对象式写法
// 通常写法
const nestedProp = obj.first && obj.first.second;
// 支持JavaScript Optional chaining后我们可以不用再做无谓的判断逻辑了
const nestedProp = obj.first?.second;

// 数组式写法
// 通常写法
const firstEl = arr && Array.isArray(arr) && arr[0];
// 支持JavaScript Optional chaining后
const firstEl = arr?.[0];

// 函数式写法
// 通常写法
const result = someInterface.customMethod && someInterface.customMethod();
// 支持JavaScript Optional chaining后
const result = someInterface.customMethod?.();
```

    注：如果在开发的时候，需要兼容一些旧版本的浏览器的话可以考虑引入**@babel/plugin-proposal-optional-chaining**插件

---

2. **Nullish coalescing**

```js
/***************** Example 1 *******************/
const foo;

//  在下面代码执行完之后foo还是undefined，并没有被赋值，bar的结果一定会是'hello'
const bar = foo || 'Hello!';

/***************** Example 2 *******************/

const num = 0;
const txt = '';

const qty = num || 666;
const team = txt || 'CAPE-FE';
console.log(qty);  // 42 and not 0
console.log(team); // "AIPE-FE" and not ''

/***************** Example 3 *******************/

let txt = '';

const team = txt || 'CAPE-FE';
console.log(team); // 'AIPE-FE'

let result = txt ?? 'CAPE-FE';
console.log(result); // '' (这个时候txt就不再是''了，而是被赋值成'AIPE-FE');

/***************** Example 4 *******************/
const nullValue = null;
const emptyText = '';
const someNumber = 42;

const valA = nullValue ?? 'default for A';
const valB = emptyText ?? 'default for B';
const valC = someNumber ?? 0;

console.log(valA); // 'default for A'
console.log(valB); // '' (as the empty string is not null or undefined)
console.log(valC); // 42

```

注：如果在开发的时候，需要兼容一些旧版本的浏览器的话可以考虑引入**@babel/plugin-proposal-nullish-coalescing-operator**插件

### 第二个升级点：Favicon 图标支持 SVG 格式

这个升级点就不用多说了

```js
new CopyWebpackPlugin([
    {
        // 我们现在可以输出svg格式的favicon了
        from: 'images/favicon-32.svg',
    },
]);
```

### 第三个升级点：移除对 FTP 的支持

**看看官方怎么说的**

![图片](https://i.ibb.co/kDK5Kpv/bj-c9ad4a223e064eaf86154e63fd8a907aabaa5fa9.png)

大概的意思如下：
Google Chrome 当前 FTP 的实现不支持加密连接（FTPS），也没有代理。 FTP 在浏览器中的使用率非常低，以致无法再投资于改进现有的 FTP 客户端。此外，所有受影响的平台上都提供了功能更强大的 FTP 客户端。 Google Chrome 72+删除了对通过 FTP 提取文档子资源和呈现顶级 FTP 资源的支持。当前，导航到 FTP URL 会导致显示目录列表或下载，具体取决于资源的类型。 Google Chrome 74+中的一个错误导致放弃了对通过 HTTP 代理访问 FTP URL 的支持。对 FTP 的代理支持已在 Google Chrome 76 中完全删除。 Google Chrome 的 FTP 实施的其余功能仅限于显示目录列表或通过未加密的连接下载资源。我们想弃用并删除此剩余功能，而不是维护不安全的 FTP 实现。

总的来说：chrome 80v 以后，google chrome 团队更 focus 的点就是安全相关的问题

### 第四个升级点：Web workers 中支持 ES modules

Module Workers 是一种适用于 Web Worker 的新模式-得益于 JavaScript 模块化的优势。 Worker 构造函数现在可以接受一个{type：“ module”}选项，该选项更改了脚本的加载和执行方式，用于匹配

```js
<script type="module">
	const worker = new Worker('worker.js', {
		type: 'module'
	});
</script>
```

聚焦 JavaScript 模块，还可以将“module-workers“动态导入用于延迟加载代码，并且不会阻止 worker 的执行，具体更多关于 Web workers 中支持 ES modules 的内容可以访问https://web.dev/module-workers/

### 第五个升级点：Content indexing API

这一点就不做过多介绍了，提供给大家两个链接，供大家参考下（主要是小编我确实也没深入的了解过 content-indexing-api，惭愧惭愧）
https://developers.google.com/web/updates/2020/02/nic80#content_indexing_api
https://web.dev/content-indexing-api/

### 第六个升级点（号外号外：非常重要）：禁用第三方 Cookie

如果在 Cookie 中未指定 SameSite 属性，则默认情况下将 cookie 视为 SameSite = Lax。通过显式声明 SameSite = None，开发人员仍然可以加入不受限制的使用状态。 Chrome 80 的稳定版（**2 月 17 开启小流量，并逐步扩量**）默认用于启用此功能。从 Chrome 76 开始，通过启用默认 cookie 标记，该功能还可以继续使用。此次升级就是为了从源头去防范[CSRF](https://medium.com/@charithra/introduction-to-csrf-a329badfca49)攻击。但是这就会带来一个问题：导致跨站请求时 Cookie 下发失败（举个例子：你在 [www.baidu.com](www.baidu.com)登录了百度账号以后又进入[百度 AI Studio](https://aistudio.baidu.com/aistudio/index)去 study 深度学习课程，这时候发现竟然是未登录状态），那我们该如何解决这个问题呢？

**升级方案如下（第三方服务方特别需要注意）：**

1. 需要在 Cookie 上同时添加 Secure 和 SameSite=None ，其中 Secure 表示只有在 HTTPS 协议下该 Cookie 才会被发送。
2. 由于上一条原因，站点必须升级到 HTTPS（详情）。
3. 服务端在下发 Set-Cookie 响应头时需要进行 UA 检测，因为某些旧版本的浏览器会把 SameSite=None 识别成 SameSite=Strict（更严格的模式），所以需要判在这些浏览器中不下发 SameSite=None 属性。

#### Secure 属性是什么鬼？

仅当整站使用 https 协议时：发出请求，安全 cookie 才会发送到服务器。（**需要注意的是：绝不能将机密信息存储在 HTTP Cookies 中，因为整个机制本质上是不安全的，并且不会对任何信息进行加密。**）

#### SameSite 属性又是什么鬼？

Cookie 的 SameSite 属性用来限制第三方 Cookie，从而减少安全风险，有效的防范[CSRF](https://medium.com/@charithra/introduction-to-csrf-a329badfca49)攻击。

**SameSite 的三个属性：**

1. **Strict**
   严格模式，完全禁止第三方 Cookie，跨站点时，任何情况下都不会下发 Cookie。换言之，只有同源的情况下才会带上 Cookie。
2. **Lax**
   其实也是一种部分兼容的方案（放开了一些限制）

    | 请求类型  | 示例                                                         | Lax         |
    | --------- | ------------------------------------------------------------ | ----------- |
    | 链接      | &lt;a href="..."&gt;&lt;/a&gt;                               | 发送 Cookie |
    | 预加载    | &lt;link rel="prerender" href="..."/&gt;                     | 发送 Cookie |
    | GET 表单  | &lt;form method="GET" action="..."&gt;                       | 发送 Cookie |
    | POST 表单 | &lt;form method="POST" action="..."&gt;                      | 不发送      |
    | iframe    | &lt;iframe src="..."&gt;&lt;/iframe&gt;                      | 不发送      |
    | AJAX      | request.get('url')                                           | 不发送      |
    | Image     | &lt;img src="https://aistudio.baidu.com/aistudio/index"/&gt; | 不发送      |

3) **None**
   第三方服务方在下放 Cookie 的时候可以选择显式关闭 SameSite 属性，将其设为 None。不过，前提是必须同时设置 Secure 属性（Cookie 只能通过 HTTPS 协议发送），否则无效。

```
Set-Cookie: passid=a23d31; SameSite=None; Secure
```

**注意：只针对需要 cross-origin 的 Cookie 进行设置即可，没有必要把所有的 Cookie 都进行设置**

## 参考文献

1. [https://developers.google.com/web/updates/2020/02/nic80](https://developers.google.com/web/updates/2020/02/nic80)
2. [https://www.chromestatus.com/feature/5088147346030592](https://www.chromestatus.com/feature/5088147346030592)
3. [https://medium.com/@charithra/introduction-to-csrf-a329badfca49](https://medium.com/@charithra/introduction-to-csrf-a329badfca49)
4. [https://www.ruanyifeng.com/blog/2019/09/cookie-samesite.html](https://www.ruanyifeng.com/blog/2019/09/cookie-samesite.html)
