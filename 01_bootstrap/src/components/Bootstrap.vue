<template>
  <section>
    <div id="bootstrap-study" class="container">
      <div class="row">
        <div id="main-container" class="col-9">
          <ul class="nav nav-tabs" role="tablist">
            <li v-for="(tab,t) in tabs" :key="t" class="nav-item class-title">
              <a
                class="nav-link"
                :class="{'active': isActive(tab.id),'disabled':tab.disabled}"
                :id="tab.id+'-tab'"
                :href="'#'+tab.id"
                data-toggle="tab"
                role="tab"
                :aria-controls="tab.id"
                :aria-selected="tab.selected"
                @click="changeNav(tab.id)"
              >{{tab.name}}</a>
            </li>
          </ul>
          <div class="tab-content mt-3">
            <div
              class="tab-pane active"
              id="carousel"
              role="tabpanel"
              aria-labelledby="carousel-tab"
            >
              <h1 class="component-content">輪播：用於圖片元素、幻燈片或包含文字的輪播元件</h1>
              <hr />
              <h2>Slides only</h2>
              <div class="container">
                <div
                  id="carouselExampleSlidesOnly"
                  class="carousel slide"
                  data-ride="carousel"
                  data-pause="hover"
                >
                  <div class="carousel-inner">
                    <div
                      class="carousel-item"
                      v-for="(carousel,c) in carouselSlide"
                      :key="c"
                      :class="{'active':c==0}"
                    >
                      <img :src="carousel.url" :alt="carousel.alt" class="d-block" />
                    </div>
                  </div>
                </div>
              </div>
              <hr />
              <h2>With controls</h2>
              <div class="container">
                <div id="carouselExampleControls" class="carousel slide" data-ride="carousel">
                  <div class="carousel-inner">
                    <div
                      class="carousel-item"
                      v-for="(carousel,c) in carouselControl"
                      :key="c"
                      :class="{'active':c==0}"
                    >
                      <img :src="carousel.url" :alt="carousel.alt" class="d-block" />
                    </div>
                  </div>
                  <a
                    class="carousel-control-prev"
                    href="#carouselExampleControls"
                    role="button"
                    data-slide="prev"
                  >
                    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span class="sr-only">Previous</span>
                  </a>
                  <a
                    class="carousel-control-next"
                    href="#carouselExampleControls"
                    role="button"
                    data-slide="next"
                  >
                    <span class="carousel-control-next-icon" aria-hidden="true"></span>
                    <span class="sr-only">Next</span>
                  </a>
                </div>
              </div>
              <hr />
              <h2>With indicators</h2>
              <div class="container">
                <div id="carouselExampleIndicators" class="carousel slide" data-ride="carousel">
                  <ol class="carousel-indicators">
                    <li
                      v-for="(carousel,c) in carouselIndicator"
                      :key="c"
                      data-target="#carouselExampleIndicators"
                      :data-slide-to="c"
                      :class="{'active':c==0}"
                    ></li>
                  </ol>
                  <div class="carousel-inner">
                    <div
                      class="carousel-item"
                      v-for="(carousel,c) in carouselIndicator"
                      :key="c"
                      :class="{'active':c==0}"
                    >
                      <img :src="carousel.url" :alt="carousel.alt" />
                    </div>
                  </div>
                </div>
              </div>
              <hr />
              <h2>Different sizes</h2>
              <div class="container">
                <div class="row">
                  <div class="switch">
                    <span class="switch-title">Fix Size</span>
                    <div class="switch-button">
                      <input
                        id="switch-toggle"
                        class="cmn-toggle cmn-toggle-round-flat"
                        type="checkbox"
                        v-model="fixSize"
                      />
                      <label for="switch-toggle"></label>
                    </div>
                  </div>
                </div>
              </div>
              <div class="container">
                <div id="carouselExampleIndicatorsSize" class="carousel slide" data-ride="carousel">
                  <ol class="carousel-indicators">
                    <li
                      v-for="(carousel,c) in carouselIndicatorSize"
                      :key="c"
                      data-target="#carouselExampleIndicatorsSize"
                      :data-slide-to="c"
                      :class="{'active':c==0}"
                    ></li>
                  </ol>
                  <div class="carousel-inner">
                    <div
                      class="carousel-item"
                      v-for="(carousel,c) in carouselIndicatorSize"
                      :key="c"
                      :class="{'active':c==0}"
                    >
                      <img :class="{'fix-size':fixSize}" :src="carousel.url" :alt="carousel.alt" />
                      <div class="carousel-caption">{{carousel.size}}</div>
                    </div>
                  </div>
                </div>
                <br />
                <div class="row" v-show="fixSize">
                  <pre class="mx-3">&nbsp;{{code}}
                    </pre>
                </div>
              </div>
              <div class="container"></div>
            </div>
            <div class="tab-pane" id="scrollspy" role="tabpanel" aria-labelledby="scrollspy-tab">
              <h1 class="component-content">滾動監控：跟隨滾動位置自動更新Bootstrap導覽或列表元件，以標示當前處於何種狀態連結</h1>
              <hr />
              <h5>
                data-offset="
                <input class="input-wrap" v-model.number="scrollOffset" />"
              </h5>
              <h2>navbar</h2>
              <div class="container bd-example">
                <nav id="navbar-example2" class="navbar navbar-light bg-light">
                  <a class="navbar-brand" href="#">Navbar</a>
                  <ul class="nav nav-pills">
                    <li class="nav-item">
                      <a class="nav-link active" href="#fat">@fat</a>
                    </li>
                    <li class="nav-item">
                      <a class="nav-link" href="#mdo">@mdo</a>
                    </li>
                    <li class="nav-item dropdown">
                      <a
                        class="nav-link dropdown-toggle"
                        data-toggle="dropdown"
                        href="#"
                        role="button"
                        aria-haspopup="true"
                        aria-expanded="false"
                      >Dropdown</a>
                      <div class="dropdown-menu">
                        <a class="dropdown-item" href="#one">one</a>
                        <a class="dropdown-item" href="#two">two</a>
                        <div role="separator" class="dropdown-divider"></div>
                        <a class="dropdown-item" href="#three">three</a>
                      </div>
                    </li>
                  </ul>
                </nav>
                <div
                  data-spy="scroll"
                  data-target="#navbar-example2"
                  :data-offset="scrollOffset"
                  class="scrollspy-example"
                >
                  <h4 id="fat">@fat</h4>
                  <p>Ad leggings keytar, brunch id art party dolor labore. Pitchfork yr enim lo-fi before they sold out qui. Tumblr farm-to-table bicycle rights whatever. Anim keffiyeh carles cardigan. Velit seitan mcsweeney's photo booth 3 wolf moon irure. Cosby sweater lomo jean shorts, williamsburg hoodie minim qui you probably haven't heard of them et cardigan trust fund culpa biodiesel wes anderson aesthetic. Nihil tattooed accusamus, cred irony biodiesel keffiyeh artisan ullamco consequat.</p>
                  <h4 id="mdo">@mdo</h4>
                  <p>Veniam marfa mustache skateboard, adipisicing fugiat velit pitchfork beard. Freegan beard aliqua cupidatat mcsweeney's vero. Cupidatat four loko nisi, ea helvetica nulla carles. Tattooed cosby sweater food truck, mcsweeney's quis non freegan vinyl. Lo-fi wes anderson +1 sartorial. Carles non aesthetic exercitation quis gentrify. Brooklyn adipisicing craft beer vice keytar deserunt.</p>
                  <h4 id="one">one</h4>
                  <p>Occaecat commodo aliqua delectus. Fap craft beer deserunt skateboard ea. Lomo bicycle rights adipisicing banh mi, velit ea sunt next level locavore single-origin coffee in magna veniam. High life id vinyl, echo park consequat quis aliquip banh mi pitchfork. Vero VHS est adipisicing. Consectetur nisi DIY minim messenger bag. Cred ex in, sustainable delectus consectetur fanny pack iphone.</p>
                  <h4 id="two">two</h4>
                  <p>In incididunt echo park, officia deserunt mcsweeney's proident master cleanse thundercats sapiente veniam. Excepteur VHS elit, proident shoreditch +1 biodiesel laborum craft beer. Single-origin coffee wayfarers irure four loko, cupidatat terry richardson master cleanse. Assumenda you probably haven't heard of them art party fanny pack, tattooed nulla cardigan tempor ad. Proident wolf nesciunt sartorial keffiyeh eu banh mi sustainable. Elit wolf voluptate, lo-fi ea portland before they sold out four loko. Locavore enim nostrud mlkshk brooklyn nesciunt.</p>
                  <h4 id="three">three</h4>
                  <p>Ad leggings keytar, brunch id art party dolor labore. Pitchfork yr enim lo-fi before they sold out qui. Tumblr farm-to-table bicycle rights whatever. Anim keffiyeh carles cardigan. Velit seitan mcsweeney's photo booth 3 wolf moon irure. Cosby sweater lomo jean shorts, williamsburg hoodie minim qui you probably haven't heard of them et cardigan trust fund culpa biodiesel wes anderson aesthetic. Nihil tattooed accusamus, cred irony biodiesel keffiyeh artisan ullamco consequat.</p>
                  <p>Keytar twee blog, culpa messenger bag marfa whatever delectus food truck. Sapiente synth id assumenda. Locavore sed helvetica cliche irony, thundercats you probably haven't heard of them consequat hoodie gluten-free lo-fi fap aliquip. Labore elit placeat before they sold out, terry richardson proident brunch nesciunt quis cosby sweater pariatur keffiyeh ut helvetica artisan. Cardigan craft beer seitan readymade velit. VHS chambray laboris tempor veniam. Anim mollit minim commodo ullamco thundercats.</p>
                </div>
              </div>
              <hr />
              <h2>nested navbar</h2>
              <div class="container-fluid bd-example">
                <div class="row">
                  <div class="col-4" id="navbar-example3">
                    <nav class="navbar navbar-light bg-light flex-column">
                      <a class="navbar-brand" href="#">Navbar</a>
                      <nav class="nav nav-pills flex-column">
                        <a class="nav-link active" href="#item-1">Item 1</a>
                        <nav class="nav nav-pills flex-column">
                          <a class="nav-link ml-3 my-1" href="#item-1-1">Item 1-1</a>
                          <a class="nav-link ml-3 my-1" href="#item-1-2">Item 1-2</a>
                        </nav>
                        <a class="nav-link" href="#item-2">Item 2</a>
                        <a class="nav-link" href="#item-3">Item 3</a>
                        <nav class="nav nav-pills flex-column">
                          <a class="nav-link ml-3 my-1" href="#item-3-1">Item 3-1</a>
                          <a class="nav-link ml-3 my-1" href="#item-3-2">Item 3-2</a>
                        </nav>
                      </nav>
                    </nav>
                  </div>
                  <div class="col-8">
                    <div
                      data-spy="scroll"
                      data-target="#navbar-example3"
                      :data-offset="scrollOffset"
                      class="scrollspy-example-2"
                    >
                      <h4 id="item-1">Item 1</h4>
                      <p>Ex consequat commodo adipisicing exercitation aute excepteur occaecat ullamco duis aliqua id magna ullamco eu. Do aute ipsum ipsum ullamco cillum consectetur ut et aute consectetur labore. Fugiat laborum incididunt tempor eu consequat enim dolore proident. Qui laborum do non excepteur nulla magna eiusmod consectetur in. Aliqua et aliqua officia quis et incididunt voluptate non anim reprehenderit adipisicing dolore ut consequat deserunt mollit dolore. Aliquip nulla enim veniam non fugiat id cupidatat nulla elit cupidatat commodo velit ut eiusmod cupidatat elit dolore.</p>
                      <h5 id="item-1-1">Item 1-1</h5>
                      <p>Amet tempor mollit aliquip pariatur excepteur commodo do ea cillum commodo Lorem et occaecat elit qui et. Aliquip labore ex ex esse voluptate occaecat Lorem ullamco deserunt. Aliqua cillum excepteur irure consequat id quis ea. Sit proident ullamco aute magna pariatur nostrud labore. Reprehenderit aliqua commodo eiusmod aliquip est do duis amet proident magna consectetur consequat eu commodo fugiat non quis. Enim aliquip exercitation ullamco adipisicing voluptate excepteur minim exercitation minim minim commodo adipisicing exercitation officia nisi adipisicing. Anim id duis qui consequat labore adipisicing sint dolor elit cillum anim et fugiat.</p>
                      <h5 id="item-1-2">Item 2-2</h5>
                      <p>Cillum nisi deserunt magna eiusmod qui eiusmod velit voluptate pariatur laborum sunt enim. Irure laboris mollit consequat incididunt sint et culpa culpa incididunt adipisicing magna magna occaecat. Nulla ipsum cillum eiusmod sint elit excepteur ea labore enim consectetur in labore anim. Proident ullamco ipsum esse elit ut Lorem eiusmod dolor et eiusmod. Anim occaecat nulla in non consequat eiusmod velit incididunt.</p>
                      <h4 id="item-2">Item 2</h4>
                      <p>Quis magna Lorem anim amet ipsum do mollit sit cillum voluptate ex nulla tempor. Laborum consequat non elit enim exercitation cillum aliqua consequat id aliqua. Esse ex consectetur mollit voluptate est in duis laboris ad sit ipsum anim Lorem. Incididunt veniam velit elit elit veniam Lorem aliqua quis ullamco deserunt sit enim elit aliqua esse irure. Laborum nisi sit est tempor laborum mollit labore officia laborum excepteur commodo non commodo dolor excepteur commodo. Ipsum fugiat ex est consectetur ipsum commodo tempor sunt in proident.</p>
                      <h4 id="item-3">Item 3</h4>
                      <p>Quis anim sit do amet fugiat dolor velit sit ea ea do reprehenderit culpa duis. Nostrud aliqua ipsum fugiat minim proident occaecat excepteur aliquip culpa aute tempor reprehenderit. Deserunt tempor mollit elit ex pariatur dolore velit fugiat mollit culpa irure ullamco est ex ullamco excepteur.</p>
                      <h5 id="item-3-1">Item 3-1</h5>
                      <p>Deserunt quis elit Lorem eiusmod amet enim enim amet minim Lorem proident nostrud. Ea id dolore anim exercitation aute fugiat labore voluptate cillum do laboris labore. Ex velit exercitation nisi enim labore reprehenderit labore nostrud ut ut. Esse officia sunt duis aliquip ullamco tempor eiusmod deserunt irure nostrud irure. Ullamco proident veniam laboris ea consectetur magna sunt ex exercitation aliquip minim enim culpa occaecat exercitation. Est tempor excepteur aliquip laborum consequat do deserunt laborum esse eiusmod irure proident ipsum esse qui.</p>
                      <h5 id="item-3-2">Item 3-2</h5>
                      <p>Labore sit culpa commodo elit adipisicing sit aliquip elit proident voluptate minim mollit nostrud aute reprehenderit do. Mollit excepteur eu Lorem ipsum anim commodo sint labore Lorem in exercitation velit incididunt. Occaecat consectetur nisi in occaecat proident minim enim sunt reprehenderit exercitation cupidatat et do officia. Aliquip consequat ad labore labore mollit ut amet. Sit pariatur tempor proident in veniam culpa aliqua excepteur elit magna fugiat eiusmod amet officia.</p>
                    </div>
                  </div>
                </div>
              </div>
              <hr />
              <h2>list-group</h2>
              <div class="container bd-example">
                <div class="row">
                  <div class="col-4">
                    <ul id="list-example" class="list-group">
                      <li
                        class="list-group-item list-group-item-action active"
                        href="#list-item-1"
                      >Item 1</li>
                      <li class="list-group-item list-group-item-action" href="#list-item-2">Item 2</li>
                      <li class="list-group-item list-group-item-action" href="#list-item-3">Item 3</li>
                      <li class="list-group-item list-group-item-action" href="#list-item-4">Item 4</li>
                    </ul>
                  </div>
                  <div class="col-8">
                    <div
                      data-spy="scroll"
                      data-target="#list-example"
                      :data-offset="scrollOffset"
                      class="scrollspy-example"
                    >
                      <h4 id="list-item-1">Item 1</h4>
                      <p>Ex consequat commodo adipisicing exercitation aute excepteur occaecat ullamco duis aliqua id magna ullamco eu. Do aute ipsum ipsum ullamco cillum consectetur ut et aute consectetur labore. Fugiat laborum incididunt tempor eu consequat enim dolore proident. Qui laborum do non excepteur nulla magna eiusmod consectetur in. Aliqua et aliqua officia quis et incididunt voluptate non anim reprehenderit adipisicing dolore ut consequat deserunt mollit dolore. Aliquip nulla enim veniam non fugiat id cupidatat nulla elit cupidatat commodo velit ut eiusmod cupidatat elit dolore.</p>
                      <h4 id="list-item-2">Item 2</h4>
                      <p>Quis magna Lorem anim amet ipsum do mollit sit cillum voluptate ex nulla tempor. Laborum consequat non elit enim exercitation cillum aliqua consequat id aliqua. Esse ex consectetur mollit voluptate est in duis laboris ad sit ipsum anim Lorem. Incididunt veniam velit elit elit veniam Lorem aliqua quis ullamco deserunt sit enim elit aliqua esse irure. Laborum nisi sit est tempor laborum mollit labore officia laborum excepteur commodo non commodo dolor excepteur commodo. Ipsum fugiat ex est consectetur ipsum commodo tempor sunt in proident.</p>
                      <h4 id="list-item-3">Item 3</h4>
                      <p>Quis anim sit do amet fugiat dolor velit sit ea ea do reprehenderit culpa duis. Nostrud aliqua ipsum fugiat minim proident occaecat excepteur aliquip culpa aute tempor reprehenderit. Deserunt tempor mollit elit ex pariatur dolore velit fugiat mollit culpa irure ullamco est ex ullamco excepteur.</p>
                      <h4 id="list-item-4">Item 4</h4>
                      <p>Quis anim sit do amet fugiat dolor velit sit ea ea do reprehenderit culpa duis. Nostrud aliqua ipsum fugiat minim proident occaecat excepteur aliquip culpa aute tempor reprehenderit. Deserunt tempor mollit elit ex pariatur dolore velit fugiat mollit culpa irure ullamco est ex ullamco excepteur.</p>
                    </div>
                  </div>
                </div>
              </div>
              <hr />
              <h2>Sample</h2>
              <div class="container">
                <a
                  href="https://www.starlux-airlines.com/Welcome/CarriageOfLiveAnimals"
                  target="_blank"
                  class="links"
                >Starlux-ailines</a>
              </div>
              <hr />
              <h2>Point *****</h2>
              <div class="container">
                <div class="row">
                  <pre class="mx-3">&nbsp;
                    body {
                      position: relative;
                    }
                    </pre>
                </div>
              </div>
            </div>
            <div class="tab-pane" id="popovers" role="tabpanel" aria-labelledby="popovers-tab">
              <h1 class="component-content">彈出提示框：可以加在任何元素上做提示</h1>
              <hr />
              <h2>Point *****</h2>
              <div class="container">
                <div class="row">
                  <p>- 在頁面上初始化所有彈出提示框的一種方法是透過它們的"data-toggle"屬性來啟用它們：</p>
                  <pre class="mx-3">&nbsp;
                    $(function () {
                      $('[data-toggle="popover"]').popover()
                    });
                  </pre>
                </div>
                <div class="row">
                  <p>- 必須使用"data-title"和"data-content"顯示彈出提示框</p>
                </div>
                <div class="row">
                  <p>- 父元素如果有干擾彈出提示框的樣式時，要指定"container:'body'"：</p>
                  <pre class="mx-3">&nbsp;
                    $(function () {
                      $('.example-popover').popover({
                        container: 'body'
                      })
                    })
                  </pre>
                </div>
                <div class="row">
                  <p>
                    - 具有 "disabled"的元素是不能產生互動的，用戶不能用hover及click觸發彈出提示框，
                    <br />如果想要啟用，可以用"&lt;div&gt;"或"&lt;span&gt;"包覆，並覆蓋"pointer-events:none;"在禁用的元素上。
                  </p>
                </div>
              </div>
              <hr />
              <h2>Example: with popover title</h2>
              <div class="container">
                <button
                  type="button"
                  class="btn btn-lg btn-primary"
                  data-toggle="popover"
                  data-content="Popover content"
                  data-original-title="Popover title"
                >Click here to toggle popover!!!</button>
              </div>
              <hr />
              <h2>Example: directions</h2>
              <div class="container">
                <div class="bd-example-popovers">
                  <button
                    type="button"
                    class="btn btn-secondary"
                    data-container="body"
                    data-toggle="popover"
                    data-placement="top"
                    data-content="top!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!"
                    data-original-title
                    title
                  >Popover on top</button>
                  <button
                    type="button"
                    class="btn btn-secondary"
                    data-container="body"
                    data-toggle="popover"
                    data-placement="right"
                    data-content="right!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!"
                    data-original-title
                    title
                  >Popover on right</button>
                  <button
                    type="button"
                    class="btn btn-secondary"
                    data-container="body"
                    data-toggle="popover"
                    data-placement="bottom"
                    data-content="bottom!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!"
                    data-original-title
                    title
                  >Popover on bottom</button>
                  <button
                    type="button"
                    class="btn btn-secondary"
                    data-container="body"
                    data-toggle="popover"
                    data-placement="left"
                    data-content="left!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!"
                    data-original-title
                    title
                  >Popover on left</button>
                </div>
              </div>
              <hr />
              <h2>Example: popover with disabled button</h2>
              <div class="container">
                <span class="d-inline-block" data-toggle="popover" data-content="popover content">
                  <button
                    class="btn btn-primary"
                    style="pointer-events: none;"
                    type="button"
                    disabled
                  >Disabled button</button>
                </span>
                <p>disabled的元素，可以使用data-trigger="hover"，因為用戶不會點擊disabled的元素。</p>
                <span
                  class="d-inline-block"
                  data-toggle="popover"
                  data-trigger="hover"
                  data-content="popover content"
                >
                  <button
                    class="btn btn-primary"
                    style="pointer-events: none;"
                    type="button"
                    disabled
                  >Hover this disabled button</button>
                </span>
              </div>
              <hr />
              <h2>In button-group</h2>
              <p>可以使用data-container="body"</p>
              <div class="container">
                <div class="btn-group" role="group" aria-label="Basic example">
                  <button
                    type="button"
                    class="btn btn-secondary"
                    data-toggle="popover"
                    data-placement="left"
                    data-content="left!!!!!!!!!!!!!!!"
                  >Left</button>
                  <button
                    type="button"
                    class="btn btn-secondary"
                    data-toggle="popover"
                    data-placement="top"
                    data-content="middle!!!!!!!!!!!!!!!"
                  >Middle</button>
                  <button
                    type="button"
                    class="btn btn-secondary"
                    data-toggle="popover"
                    data-placement="right"
                    data-content="right!!!!!!!!!!!!!!!"
                  >Right</button>
                </div>
              </div>
            </div>
            <div class="tab-pane" id="tooltips" role="tabpanel" aria-labelledby="tooltips-tab">
              <h1 class="component-content">工具提示框：以CSS3作為動畫顯示</h1>
              <hr />
              <h2>Point *****</h2>
              <div class="container">
                <div class="row">
                  <p>- 在頁面上初始化所有工具提示框的一種方法是透過它們的"data-toggle"屬性來啟用它們：</p>
                  <pre class="mx-3">&nbsp;
                    $(function () {
                      $('[data-toggle="tooltip"]').tooltip()
                    });
                  </pre>
                </div>
                <div class="row">
                  <p>- 必須使用"data-title"和"data-content"顯示工具提示框</p>
                </div>
                <div class="row">
                  <p>- 父元素如果有干擾工具提示框的樣式時，要指定"container:'body'"：</p>
                  <pre class="mx-3">&nbsp;
                    $(function () {
                      $('.example-popover').popover({
                        container: 'body'
                      })
                    })
                  </pre>
                </div>
                <div class="row">
                  <p>
                    - 具有 "disabled"的元素是不能產生互動的，用戶不能用hover及click觸發工具提示框，
                    <br />如果想要啟用，可以用"&lt;div&gt;"或"&lt;span&gt;"包覆，且調整 tabindex="0" 讓鍵盤能夠切換，並覆蓋"pointer-events:none;"在禁用的元素上。
                  </p>
                </div>
              </div>
              <hr />
              <h2>Example: Hover over the links</h2>
              <div class="container">
                <div class="tooltip-demo">
                  <p class="muted">
                    Tight pants next level keffiyeh
                    <a
                      href="javascript:void(0);"
                      data-toggle="tooltip"
                      title
                      data-original-title="Default tooltip"
                    >you probably</a> haven't heard of them. Photo booth beard raw denim letterpress vegan messenger bag stumptown. Farm-to-table seitan, mcsweeney's fixie sustainable quinoa 8-bit american apparel
                    <a
                      href="javascript:void(0);"
                      data-toggle="tooltip"
                      title="Another tooltip"
                    >have a</a> terry richardson vinyl chambray. Beard stumptown, cardigans banh mi lomo thundercats. Tofu biodiesel williamsburg marfa, four loko mcsweeney's cleanse vegan chambray. A really ironic artisan
                    <a
                      href="javascript:void(0);"
                      data-toggle="tooltip"
                      title="Another one here too"
                    >whatever keytar</a>, scenester farm-to-table banksy Austin
                    <a
                      href="javascript:void(0);"
                      data-toggle="tooltip"
                      title="The last tip!"
                    >twitter handle</a> freegan cred raw denim single-origin coffee viral.
                  </p>
                </div>
              </div>
              <hr />
              <h2>Example: directions</h2>
              <div class="container">
                <div class="bd-example-tooltips">
                  <button
                    type="button"
                    class="btn btn-secondary"
                    data-toggle="tooltip"
                    data-placement="top"
                    title
                    data-original-title="Tooltip on top"
                  >Tooltip on top</button>
                  <button
                    type="button"
                    class="btn btn-secondary"
                    data-toggle="tooltip"
                    data-placement="right"
                    title
                    data-original-title="Tooltip on right"
                  >Tooltip on right</button>
                  <button
                    type="button"
                    class="btn btn-secondary"
                    data-toggle="tooltip"
                    data-placement="bottom"
                    title
                    data-original-title="Tooltip on bottom"
                  >Tooltip on bottom</button>
                  <button
                    type="button"
                    class="btn btn-secondary"
                    data-toggle="tooltip"
                    data-placement="left"
                    title
                    data-original-title="Tooltip on left"
                  >Tooltip on left</button>
                </div>
              </div>
              <hr />
              <h2>Example: tooltip with html</h2>
              <div class="container">
                <div class="bd-example-tooltips">
                  <button
                    type="button"
                    class="btn btn-secondary"
                    data-toggle="tooltip"
                    data-html="true"
                    title
                    data-original-title="<em>Tooltip</em> <u>with</u> <b>HTML</b>"
                  >Tooltip with HTML</button>
                </div>
                <br />
                <div class="row">
                  <pre class="mx-3">&nbsp;
      &lt;button type="button" class="btn btn-secondary" data-toggle="tooltip" data-html="true" title="&lt;em&gt;Tooltip&lt;/em&gt; &lt;u&gt;with&lt;/u&gt; &lt;b&gt;HTML&lt;/b&gt;"&gt;
        Tooltip with HTML
      &lt;/button&gt;
                  </pre>
                </div>
              </div>
              <hr />
              <h2>Example: tooltip with disabled button</h2>
              <div class="container">
                <span
                  class="d-inline-block"
                  tabindex="0"
                  data-toggle="tooltip"
                  title="Disabled tooltip"
                >
                  <button
                    class="btn btn-primary"
                    style="pointer-events: none;"
                    type="button"
                    disabled
                  >Disabled button</button>
                </span>
              </div>
            </div>
          </div>
        </div>
        <div id="usage-container" class="col-3">
          <br />
          <br />
          <h3>Usage</h3>
          <p v-html="usages[navId].dataAttributes"></p>
          <div class="card collapsed-card">
            <div
              class="card-header"
              :id="'card-options-'+navId"
              data-toggle="collapse"
              :data-target="'#collapse-options-'+navId"
              aria-expanded="true"
              :aria-controls="'collapse-options-'+navId"
            >
              <h6 class="m-1">Options</h6>
            </div>
            <div
              :id="'collapse-options-'+navId"
              class="collapse show"
              :aria-labelledby="'card-options-'+navId"
              data-parent="#usage-container"
            >
              <div class="card-body" v-html="usages[navId].options"></div>
            </div>
          </div>
          <div class="card collapsed-card">
            <div
              class="card-header"
              :id="'card-methods-'+navId"
              data-toggle="collapse"
              :data-target="'#collapse-methods-'+navId"
              aria-expanded="false"
              :aria-controls="'collapse-methods-'+navId"
            >
              <h6 class="m-1">Methods</h6>
            </div>
            <div
              :id="'collapse-methods-'+navId"
              class="collapse show"
              :aria-labelledby="'card-methods-'+navId"
              data-parent="#usage-container"
            >
              <div class="card-body" v-html="usages[navId].methods"></div>
            </div>
          </div>
          <div class="card collapsed-card">
            <div
              class="card-header"
              :id="'card-events-'+navId"
              data-toggle="collapse"
              :data-target="'#collapse-events-'+navId"
              aria-expanded="false"
              :aria-controls="'collapse-events-'+navId"
            >
              <h6 class="m-1">Events</h6>
            </div>
            <div
              :id="'collapse-events-'+navId"
              class="collapse show"
              :aria-labelledby="'card-events-'+navId"
              data-parent="#usage-container"
            >
              <div class="card-body" v-html="usages[navId].events"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
const weekOne = true;
const weekTwo = false;
export default {
  name: "Bootstrap",
  data() {
    return {
      fixSize: false,
      scrollOffset: 0,
      code: `.carousel-item > img {
    width: 100%;
    display: block;
    height: div的高度;
  }`,
      navId: "carousel",
      tabs: [
        {
          id: "carousel",
          name: "Carousel",
          selected: true,
          disabled: !weekOne
        },
        {
          id: "scrollspy",
          name: "Scrollspy",
          selected: false,
          disabled: !weekOne
        },
        {
          id: "popovers",
          name: "Popovers",
          selected: false,
          disabled: !weekTwo
        },
        {
          id: "tooltips",
          name: "Tooltips",
          selected: false,
          disabled: !weekTwo
        }
      ],
      carouselSlide: [
        {
          url: "https://source.unsplash.com/1600x900/?nature",
          alt: "First Slide"
        },
        {
          url: "https://source.unsplash.com/1600x900/?cake",
          alt: "Second Slide"
        },
        {
          url: "https://source.unsplash.com/1600x900/?fish",
          alt: "Third Slide"
        }
      ],
      carouselControl: [
        {
          url: "https://source.unsplash.com/1024x480/?cookie",
          alt: "First Slide"
        },
        {
          url: "https://source.unsplash.com/1024x480/?happy",
          alt: "Second Slide"
        },
        {
          url: "https://source.unsplash.com/1024x480/?dog",
          alt: "Third Slide"
        }
      ],
      carouselIndicator: [
        {
          url: "https://source.unsplash.com/1024x480/?wall",
          alt: "First Slide"
        },
        {
          url: "https://source.unsplash.com/1024x480/?beauty",
          alt: "Second Slide"
        },
        {
          url: "https://source.unsplash.com/1024x480/?life",
          alt: "Third Slide"
        },
        {
          url: "https://source.unsplash.com/1024x480/?cat",
          alt: "Forth Slide"
        }
      ],
      carouselIndicatorSize: [
        {
          url: "https://picsum.photos/1024/960/?image=123",
          alt: "First Slide",
          size: "1024*960"
        },
        {
          url: "https://picsum.photos/2048/480/?image=186",
          alt: "Second Slide",
          size: "2048*480"
        },
        {
          url: "https://picsum.photos/512/240/?image=117",
          alt: "Third Slide",
          size: "512*240"
        },
        {
          url: "https://picsum.photos/1024/480/?image=210",
          alt: "Forth Slide",
          size: "1024*480"
        }
      ],
      usages: {
        carousel: {
          dataAttributes: `<p>
            控制輪播的位置。
            <code class="highlighter-rouge">data-slide</code> 接受
            <code class="highlighter-rouge">prev</code>或
            <code class="highlighter-rouge">next</code> 的關鍵字。或者，使用
            <code class="highlighter-rouge">data-slide-to</code> 將索引轉換到
            <code class="highlighter-rouge">data-slide-to="2"</code>。
          </p>`,
          options: `<p> 
          <code class="highlighter-rouge">data-</code>，如 <code class="highlighter-rouge">data-interval=""</code>。</p>
          <div class="table-responsive">
          <table class="table table-bordered table-sm">      
            <tbody>
              <tr>
                <td>interval</td>
                <td>輪播的延遲時間，設定false則不會自動輪播。</td>
              </tr>
              <tr>
                <td>keyboard</td>
                <td>鍵盤事件反應</td>
              </tr>
              <tr>
                <td>pause</td>
                <td>
                  <p>
                    如果設置為
                    <code>"hover"</code>, 輪播會因為
                    <code>mouseenter</code> 而暫停並在
                    <code>mouseleave</code> 時再度執行。
                    如果設置
                    <code>false</code>，滑鼠滑過時不會停止輪播。
                  </p>
                </td>
              </tr>
              <tr>
                <td>ride</td>
                <td>手動播放第一個後自動輪播。如果是<code>"carousel"</code>在輪播載入後自動播放。</td>
              </tr>
              <tr>
                <td>wrap</td>
                <td>輪播是否連續循環或停止。</td>
              </tr>
            </tbody>
          </table></div>`,
          methods: `<div><code class="highlighter-rouge">.carousel(options)</code></div><br/>...`,
          events: `<p>Bootstrap 提供了兩個事件：<br/>
          <code class="highlighter-rouge">slide.bs.carousel</code><br/>
          <code class="highlighter-rouge">slid.bs.carousel</code><br/>
          都具有以下附加屬性：</p>
          <ul>
          <li>- <code class="highlighter-rouge">direction</code>：輪播滑動的方向（<code class="highlighter-rouge">"left"</code> 或 <code class="highlighter-rouge">"right"</code>）。</li>
          <li>- <code class="highlighter-rouge">relatedTarget</code>：被作為啟用的物件滑動到指定 DOM 元素。</li>
          <li>- <code class="highlighter-rouge">from</code>：當前物件的索引</li>
          <li>- <code class="highlighter-rouge">to</code>：下一個物件的索引</li>
        </ul>`
        },
        scrollspy: {
          dataAttributes: `<p>將滾動監控行為加到導覽中，將 <code class="highlighter-rouge">data-spy="scroll"</code> 加到要偵聽的元素（通常是 <code class="highlighter-rouge">&lt;body&gt;</code>）。 然後將 <code class="highlighter-rouge">data-target</code> 屬性加到任何 Bootstrap <code class="highlighter-rouge">.nav</code> 元件的父元素的 ID 或 Class。</p>`,
          options: `<table class="table table-bordered table-sm">      
            <tbody>
              <tr>
                <td>offset</td>
                <td>計算位置時，從頂部開始計算的像素偏移。</td>
              </tr>
              </tbody>
          </table>`,
          methods: `<code class="highlighter-rouge">.scrollspy('refresh')</code><br/><code class="highlighter-rouge">.scrollspy('dispose')</code>`,
          events: `<code class="highlighter-rouge">activate.bs.scrollspy</code>`
        },
        popovers: {
          options: `<div class="table-responsive"><table class="table table-bordered table-sm"><tbody>
          <tr>
            <td>animation</td>
            <td>套用CSS fade transition</td>
          </tr>
          <tr>
            <td>container</td>
            <td>
              <p>
              將彈出提示框加到特定元素。例如：<code>container: 'body'</code>。可防止畫面調整大小的時候，彈出提示框遠離觸發元素。</p>
            </td>
          </tr>
          <tr>
            <td>content</td>
            <td>
            <p>如果 <code>data-content</code> 屬性不存在，則為預設內容值''。</p>
            </td>
          </tr>
          <tr>
            <td>delay</td>
            <td>
              <p>顯示和隱藏彈出提示框的延遲時間（ms） - 不適用手動觸發</p>
              <p>如果是數字，則將延遲應用於隱藏/顯示</p>
              <p>如果是物件，則結構是：<code>delay: { "show": 500, "hide": 100 }</code></p>
            </td>
          </tr>
          <tr>
            <td>placement</td>
            <td>
            <p>定位彈出提示框(auto | top | bottom | left | right)，預設為'right'。<br>指定 <code>auto</code> 時，將動態重新定位彈出提示框。</p>
            </td>
          </tr>
          <tr>
            <td>template</td>
            <td>
              <p>創建動態提示框時使用的基本 HTML </p>
              <p>動態提示框的 <code>title</code> 將被注入到 <code>.popover-header</code> 中。</p>
              <p>動態提示框的 <code>content</code> 將被注入到 <code>.popover-body</code> 中。</p>
              <p> <code>.arrow</code> 將成為動態提示框的箭頭。</p>
              <p>最外層的包裝元素應該要有 <code>.popover</code>。</p>
            </td>
          </tr>
          <tr>
            <td>title</td>
            <td>
              <p>預設值''。</p>
            </td>
          </tr>
          <tr>
            <td>trigger</td>
            <td>
            觸發動態提示框(click | hover | focus | manual)。可以傳遞多個觸發器用空格分開。但是'manual'不能與任何其他觸發器組合。</td>
          </tr>
          <tr>
            <td>offset</td>
            <td>
            偏移</td>
          </tr>          
          </tbody></table></div><br/>...`,
          methods: `<code class="highlighter-rouge">$().popover(options)</code><br/>
          <code class="highlighter-rouge">.popover('show')</code><br/>
          <code class="highlighter-rouge">.popover('hide')</code><br/>
          <code class="highlighter-rouge">.popover('toggle')</code><br/>
          <code class="highlighter-rouge">.popover('dispose')</code><br/>
          <code class="highlighter-rouge">.popover('enable')</code><br/>
          <code class="highlighter-rouge">.popover('disable')</code><br/>
          <code class="highlighter-rouge">.popover('toggleEnabled')</code><br/>
          <code class="highlighter-rouge">.popover('update')</code><br/>`,
          events: `<code class="highlighter-rouge">show.bs.popover</code><br/>
          <code class="highlighter-rouge">shown.bs.popover</code><br/>
          <code class="highlighter-rouge">hide.bs.popover</code><br/>
          <code class="highlighter-rouge">hidden.bs.popover</code><br/>
          <code class="highlighter-rouge">inserted.bs.popover</code><br/>`
        },
        tooltips: {
          options: `<table class="table table-bordered table-sm"><tbody>
          <tr>
            <td>animation</td>
            <td>套用CSS fade transition</td>
          </tr>
          <tr>
            <td>container</td>
            <td>
              <p>
              將工具提示框加到特定元素。例如：<code>container: 'body'</code>。可防止畫面調整大小的時候，工具提示框遠離觸發元素。</p>
            </td>
          </tr>
          <tr>
            <td>delay</td>
            <td>
              <p>顯示和隱藏工具提示框的延遲時間（ms） - 不適用手動觸發</p>
              <p>如果是數字，則將延遲應用於隱藏/顯示</p>
              <p>如果是物件，則結構是：<code>delay: { "show": 500, "hide": 100 }</code></p>
            </td>
          </tr>
          <tr>
            <td>placement</td>
            <td>
            <p>定位彈出提示框(auto | top | bottom | left | right)，預設為'top'。<br>指定 <code>auto</code> 時，將動態重新定位工具提示框。</p>
            </td>
          </tr>
          <tr>
            <td>template</td>
            <td>
              <p>創建工具提示框時使用的基本 HTML </p>
              <p>工具提示框的 <code>title</code> 將被注入到 <code>.tooltip-inner</code> 中。</p>
              <p> <code>.arrow</code> 將成為工具提示框的箭頭。</p>
              <p>最外層的包裝元素應該要有 <code>.tooltip</code> 及 <code>role="tooltip"</code>。</p>
            </td>
          </tr>
          <tr>
            <td>title</td>
            <td>
              <p>預設值''。</p>
            </td>
          </tr>
          <tr>
            <td>trigger</td>
            <td>
            觸發工具提示框(click | hover | focus | manual)。可以傳遞多個觸發器用空格分開。但是'manual'不能與任何其他觸發器組合。</td>
          </tr>
          <tr>
            <td>offset</td>
            <td>
            偏移</td>
          </tr>          
          </tbody></table><br/>...`,
          methods: `<code class="highlighter-rouge">$().tooltip(options)</code><br/>
          <code class="highlighter-rouge">.tooltip('show')</code><br/>
          <code class="highlighter-rouge">.tooltip('hide')</code><br/>
          <code class="highlighter-rouge">.tooltip('toggle')</code><br/>
          <code class="highlighter-rouge">.tooltip('dispose')</code><br/>
          <code class="highlighter-rouge">.tooltip('enable')</code><br/>
          <code class="highlighter-rouge">.tooltip('disable')</code><br/>
          <code class="highlighter-rouge">.tooltip('toggleEnabled')</code><br/>
          <code class="highlighter-rouge">.tooltip('update')</code><br/>`,
          events: `<code class="highlighter-rouge">show.bs.tooltip</code><br/>
          <code class="highlighter-rouge">shown.bs.tooltip</code><br/>
          <code class="highlighter-rouge">hide.bs.tooltip</code><br/>
          <code class="highlighter-rouge">hidden.bs.tooltip</code><br/>
          <code class="highlighter-rouge">inserted.bs.tooltip</code><br/>`
        }
      }
    };
  },
  methods: {
    isActive(id) {
      return id == "carousel";
    },
    changeNav(id) {
      console.log(id);
      this.navId = id;
    }
  },
  created() {
    this.$nextTick(function() {
      $('[data-toggle="popover"]').popover();
      $('[data-toggle="tooltip"]').tooltip();
    });
  }
};
</script>

<style lang="scss" scoped>
$basic-color: #222a35;
$primary-color: #93664a;
$font-color: #fa3f95;

body {
  position: relative;
}

#bootstrap-study {
  max-width: 1800px;
  width: 90%;
}

#main-container {
  color: $font-color;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
    "Microsoft JhengHei", Oxygen, Ubuntu, Cantarell, "Open Sans",
    "Helvetica Neue", sans-serif;
  line-height: 1.4;
  margin: 1rem auto;
  width: 80%;
  background-color: $basic-color;
  p {
    margin-top: 1rem;
    margin-bottom: 1rem;
  }
  .btn-primary {
    background-color: $primary-color !important;
    border: none;
  }
  .btn.disabled,
  .btn:disabled {
    opacity: 0.5;
  }
}

#usage-container {
  color: $basic-color;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
    "Microsoft JhengHei", Oxygen, Ubuntu, Cantarell, "Open Sans",
    "Helvetica Neue", sans-serif;
  line-height: 1.4;
  margin: 1rem auto;
  width: 80%;
}

.component-content {
  color: white;
}

.nav {
  background-color: white;
  margin: 0 -15px;
  .class-title {
    font-size: 1.5rem;
  }
}

.nav-tabs .nav-item .nav-link.active {
  border-bottom: 6px solid $primary-color;
}

.nav-tabs .nav-link.active {
  background-color: #f2f2f2;
}

.fix-size {
  width: 100%;
  display: block;
  height: 480px;
}

#carouselExampleIndicators,
#carouselExampleControls,
#carouselExampleSlidesOnly {
  .carousel-item > img {
    width: 100%;
  }
}

.carousel-caption {
  background-color: $primary-color;
}

pre {
  background-color: #ccc;
  border: 1px solid #ccc;
  border-radius: 5px;
  width: 100%;
}

input.cmn-toggle-round-flat + label {
  width: 60px;
}

input.cmn-toggle-round-flat:checked + label {
  background-color: $primary-color;
  width: 60px;
}

input.cmn-toggle-round-flat:checked + label:after {
  margin-left: 30px;
  background-color: $primary-color;
}

input.input-wrap {
  text-align: center;
  color: white;
  background-color: transparent;
  border: none;
  width: 6rem;
}

.btn-link {
  border: none;
  background-color: transparent !important;
  text-decoration: none;
  &:hover {
    border: none;
    background-color: transparent !important;
    box-shadow: none;
  }
}

.collapsed-card .card-header {
  border: none;
  text-decoration: none;
  cursor: pointer;
  line-height: 1.5rem;
  color: #333;
  font-weight: 400;
}

.links {
  color: white !important;
}

.card-header {
  background-color: rgba(34, 42, 53, 0.3);
}

#scrollspy {
  position: relative;
}

.bd-example {
  position: relative;
  padding: 1rem;
  margin: 1rem auto 0;
  width: 85%;
  border-width: 0.2rem 0 0;
  color: $basic-color;
}

.tooltip-demo {
  padding: 1rem;
  margin: 1rem auto 0;
  border-width: 0.2rem 0 0;
  color: $basic-color;
  background-color: #f2f2f2;
}

.scrollspy-example {
  position: relative;
  height: 200px;
  overflow: auto;
  background-color: white;
  padding: 0 15px;
}

.scrollspy-example-2 {
  position: relative;
  height: 350px;
  overflow: auto;
  background-color: white;
  padding: 0 15px;
}

#navbar-example3 .nav {
  background-color: transparent;
}
</style>
