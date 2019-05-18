  //初始化变量 
  var first = One();
  var keys = first.keys;
  var hash = first.hash;




  //生成键盘
  Two(keys, hash);


  //监听键盘按压事件
  Three(hash)





  //功能函数
  function getFn(name) {
      return JSON.parse(localStorage.getItem(name) || 'null');
  }

  function getTag(tag) {
      return document.createElement(tag);
  }

  function getSpan(content) {
      span1 = getTag('span');
      kbd1.appendChild(span1);
      span1.textContent = content;
      span1.className = 'text';
      return span1;
  }

  function getImg(domain) {
      img1 = getTag('img');
      kbd1.appendChild(img1);
      img1.className = 'ico';
      if (domain) {
          img1.src = 'http://' + domain + '/favicon.ico'
      } else {
          img1.src = './img/hua.png';
      }
      img1.onerror = function(img) {
          img.target.src = './img/hua.png'; //如果img没有获取到ico则将地址指向 hua.png
      }
      return img1;
  }

  function getButton(id) {
      button1 = getTag('button');
      kbd1.appendChild(button1);
      button1.textContent = 'edit';
      button1.id = id; //给按钮添加id名称
      button1.onclick = function(onclick) { //监听鼠标点击事件
          button2 = onclick.target;
          img2 = button2.previousSibling; //拿到一个元素的兄弟
          console.log(img2);
          onc = button2.id;
          x = prompt('请输入你想要的网站');
          hash[onc] = x
          img2.src = img1.src = 'http://' + x + '/favicon.ico'
          localStorage.setItem('ooo', JSON.stringify(hash)); //将用户编辑的网站存到localStorgez中；
      }
      return button1;
  }

  function One() {
      var keys = {
          0: ['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p'],
          1: ['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l'],
          2: ['z', 'x', 'c', 'v', 'b', 'n', 'm'],
          length: 3
      }
      var hash = {
              q: 'qq.com',
              w: 'weibo.com',
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

  function Two() {
      //添加div标签
      for (var index = 0; index < keys['length']; index++) {
          div1 = getTag('div');
          main1.appendChild(div1);
          div1.className = 'row';

          row = keys[index];

          //生成kbd标签
          for (var index2 = 0; index2 < row['length']; index2++) {

              kbd1 = getTag('kbd');
              div1.appendChild(kbd1);
              kbd1.className = 'keyb'; //给kbd标签添加class名字
              kbd1.id = row[index2]; 
              kbd1.onclick = function(aaa) {
                 var kbd = aaa.target.id
                 var web = hash[kbd];
                 if (web === undefined || web === null){
                 }else{
                   window.open('http://' + web, target = '_blank');
                 }      
              }   

              //生成span标签
              getSpan(row[index2])

              //生成img标签，判断img是否能被加载出来
              getImg(hash[row[index2]])

              //生成编辑按钮
              getButton(row[index2])
          }
      }
  } 

  function Three(hash) {
      onkeypress = function(kb) {
          key = kb['key'];
          websit = hash[key];
          if (websit === undefined || websit === null){
             alert('您还没编辑网站，请编辑你想要的网站');
          }else{
            window.open('http://' + websit, target = '_blank');
          }      
      }
  }