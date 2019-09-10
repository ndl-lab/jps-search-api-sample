new Vue({
  //Vueのマウントポイント
  el: "#app",
  data: {
    //Vue内で使う変数の宣言
    keyword: "",
    result: null,
    item: null,
    label: null,
    database: null,
    organization: null,
    rightsCode: null,
    accessCode: null,
    size: 20
  },
  methods: {
    //検索APIを呼んで結果をresultに格納する。
    search: function(from) {
      var _this = this;
      searchItems(this.keyword, from, this.size).then(function(data) {
        _this.result = data;
      });
    },
    //メタデータの詳細表示。itemに値が入ると、modalが表示される。
    show: function(item) {
      var _this = this;
      this.database = null;
      this.organization = null;
      this.label = null;
      this.item = item;
      //メタデータに付随するデータをAPIで取得してくる
      getDatabase(item.common.database).then(function(db) {
        _this.database = db;
      });
      getOrg(item.common.ownerOrg).then(function(org) {
        _this.organization = org;
      });
      getLabel(item.common.database).then(function(label) {
        _this.label = label;
      });
    },
    //JSONPathで、メタデータの個別項目取得する
    getValue(item, path) {
      return deepFind(item, path);
    }
  },
  mounted: function() {
    //Vueが初期化されたときに、権利とアクセスのコード値を取得してくる
    var _this = this;
    getCode("jpsearch-rights_type").then(function(code) {
      _this.rightsCode = code;
    });
    getCode("jpsearch-contents_access").then(function(code) {
      _this.accessCode = code;
    });
  }
});
