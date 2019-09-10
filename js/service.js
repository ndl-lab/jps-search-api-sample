//API呼び出しとユーティリティ

// メタデータ一つを取得するAPI
function getItem(id) {
  return axios
    .get("https://jpsearch.go.jp/api/item/" + id)
    .then(function(response) {
      return response.data;
    });
}

// キーワードでメタデータを検索するAPI
function searchItems(keyword, from, size) {
  return axios
    .get(
      "https://jpsearch.go.jp/api/item/search/jps-cross?keyword=" +
        keyword +
        "&from=" +
        from +
        "&size=" +
        size
    )
    .then(function(response) {
      return response.data;
    });
}

// データベースを取得するAPI
function getDatabase(id) {
  return axios
    .get("https://jpsearch.go.jp/api/database/" + id)
    .then(function(response) {
      return response.data;
    });
}

// データベースのラベル定義を取得するAPI
function getLabel(id) {
  return axios
    .get("https://jpsearch.go.jp/api/database/" + id + "/label")
    .then(function(response) {
      return response.data;
    });
}

//組織を取得するAPI
function getOrg(id) {
  return axios
    .get("https://jpsearch.go.jp/api/organization/" + id)
    .then(function(response) {
      return response.data;
    });
}

//コード値を取得するAPI
function getCode(id) {
  return axios
    .get("https://jpsearch.go.jp/api/code/" + id)
    .then(function(response) {
      var data = response.data;
      // 返ってくるのはコード値の配列なので、便利に使えるようにmapを付与
      data.map = {};
      data.values.forEach(function(value) {
        data.map[value.code] = value;
      });
      return data;
    });
}

//ラベル定義から値を取得してくるための関数
function deepFind(obj, path) {
  let values = [];
  _deepFind(path.split("."), obj, values);
  return values;
}

function _deepFind(paths, obj, values) {
  if (obj == null) return;
  var sub = obj[paths[0]];
  if (sub) {
    if (paths.length == 1) {
      if (Array.isArray(sub)) {
        sub.forEach(v => {
          values.push(v);
        });
      } else {
        values.push(sub);
      }
    } else {
      if (Array.isArray(sub)) {
        sub.forEach(node =>
          _deepFind(paths.slice(1, paths.length), node, values)
        );
      } else {
        _deepFind(paths.slice(1, paths.length), sub, values);
      }
    }
  }
}
