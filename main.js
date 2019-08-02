//初始化 








var obj = init();
var keys = obj.keys;
var hash = obj.hash;


let audio = $('audio');
audio.autoplay = true;

//生成键盘
setkeys(keys, hash);


//监听键盘按压事件
listenKeydown(hash)




//功能函数
function getFn(name) {
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
        img.target.src = './img/hua.png'; //如果img没有获取到ico则将地址指向 hua.png
    }
}

function getButton(id, kbd1) {
    let button1 = getTag('button');
    kbd1.appendChild(button1);
    button1.textContent = 'edit';
    button1.id = id; //给按钮添加id名称
    button1.onclick = function (e) { //监听鼠标点击事件
        let button2 = e.target;
        let img2 = button2.previousSibling; //拿到一个元素的兄弟
        let key = button2.id;
        let web = prompt('请输入你想要的网站');
        hash[key] = web
        img2.src = 'http://' + web + '/favicon.ico'
        localStorage.setItem('ooo', JSON.stringify(hash)); //将用户编辑的网站存到localStorgez中；
    }
    return button1;
}

function init() {
    var keys = {
        0: ['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p'],
        1: ['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l'],
        2: ['z', 'x', 'c', 'v', 'b', 'n', 'm'],
        length: 3
    }
    var hash = {
        q: 'qq.com',
        w: 'weibo.com',
        b: 'baidu.com',
        d: 'douyu.com',
        g: 'www.github.com',
    }
    //调取localStorge中的值去替换hash中的数据；
    var hashLocalStorge = getFn('ooo')
    if (hashLocalStorge) {
        hash = hashLocalStorge;
    }
    return {
        keys: keys,
        hash: hash
    }
}

function setkeys(keys, hash) {
    //添加div标签
    for (var index = 0; index < keys['length']; index++) {

        let div1 = getTag('div');
        main1.appendChild(div1);
        div1.className = 'row';

        let row = keys[index];

        // //生成kbd标签
        for (var index2 = 0; index2 < row['length']; index2++) {
            var kbd1 = getTag('kbd');
            div1.appendChild(kbd1);
            kbd1.className = 'keyb'; //给kbd标签添加class名字
            kbd1.id = row[index2];

            kbd1.onclick = function (aaa) {
                let id = aaa.target.id;
                console.log(id)
                var web = hash[id];
            }

            //生成span标签
            getSpan(row[index2], kbd1)

            //生成img标签，判断img是否能被加载出来
            getImg(hash[row[index2]], kbd1)

            //生成编辑按钮
            getButton(row[index2], kbd1)
        }
    }
}

function listenKeydown(hash) {
    document.addEventListener('keypress', (e) => {
        let key = e.key;
        let websit = hash[key];
        if (!websit) {
            alert('您还没编辑网站，请编辑你想要的网站');
        } else {
            window.open('http://' + websit, target = '_blank');
        }
    })

}


function listenKeydown(hash) {
    document.addEventListener('keypress', (e) => {
        let key = e.key;
        let websit = hash[key];
        if (!websit) {
            alert('您还没编辑网站，请编辑你想要的网站');
        } else {
            window.open('http://' + websit, target = '_blank');
        }
    })
}

