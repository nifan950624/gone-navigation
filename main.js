var obj = init(),
    keys = obj.keys,
    hash = obj.hash,
    isinput = false

//生成键盘
setkeys(keys, hash);

//监听键盘按压事件
listenKeydown(hash)

//阻断input 键盘冲突
blockInputing()

function init() {
  var keys = {
    0: ['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p'],
    1: ['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l'],
    2: ['z', 'x', 'c', 'v', 'b', 'n', 'm'],
    length: 3
  }

  var hash = {
    q: 'qq.com',
    t: 'taobao.com',
    w: 'weibo.com',
    b: 'baidu.com',
    j: 'jingdong.com',
    h: 'hao123.com',
    d: 'douyu.com',
    g: 'www.github.com',
  }

  var localStorageData = getKeysName('keysName')

  if (localStorageData) {
    hash = localStorageData;
  }
  return {
    keys: keys,
    hash: hash
  }
}

function getKeysName(name) {
  return JSON.parse(localStorage.getItem(name) || 'null');
}

function getTag(tag) {
  return document.createElement(tag);
}

function getSpan(content, kbd1) {
  let span1 = getTag('span');
  kbd1.appendChild(span1);
  span1.textContent = content;
  span1.className = 'text';
  return span1;
}

function getImg(domain, kbd1) {
  let img1 = getTag('img');
  kbd1.appendChild(img1);
  img1.className = 'ico';
  if (domain) {
    img1.src = 'http://' + domain + '/favicon.ico'
  } else {
    img1.src = './img/hua.png';
  }

  img1.onerror = function (img) {
    img.target.src = './img/hua.png';
  }
}


function getEditButton(id, kbd1) {
  let button1 = getTag('button');

  kbd1.appendChild(button1);
  button1.textContent = 'edit';
  button1.id = id;
  button1.onclick = function (e) {
    let button2 = e.target,
        img2 = button2.previousSibling,
        key = button2.id,
        web = prompt('请输入你想到达的网站，例如：google.com')

    hash[key] = web
    img2.src = 'http://' + web + '/favicon.ico'
    localStorage.setItem('keysName', JSON.stringify(hash));
  }
  return button1;
}


function setkeys(keys, hash) {
  for (var index = 0; index < keys['length']; index++) {

    let div1 = getTag('div');
    main1.appendChild(div1);
    div1.className = 'row';

    let row = keys[index];

    for (var index2 = 0; index2 < row['length']; index2++) {
      var kbd1 = getTag('kbd');
      div1.appendChild(kbd1);
      kbd1.className = 'keyb';
      kbd1.id = row[index2];

      getSpan(row[index2], kbd1)
      getImg(hash[row[index2]], kbd1)
      getEditButton(row[index2], kbd1)
    }
  }
}


function listenKeydown(hash) {
  document.addEventListener('keypress', (e) => {
    if (isinput) return;
    let key = e.key
    let websit = hash[key]
    if (!websit) {
      alert('您还没编辑网站，请编辑你想要的网站')
    } else {
      window.open('http://' + websit, '_blank')
    }
  })
}

function blockInputing() {
  var search = document.getElementsByClassName('search-input')

  for (let i = 0; i < search.length; i++) {
    var searchItem = search[i]

    searchItem.onfocus = function () {
      isinput = true
    }

    searchItem.onblur = function () {
      isinput = false
    }
  }
}
