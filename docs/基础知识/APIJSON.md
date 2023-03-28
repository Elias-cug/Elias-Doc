# APIJSON

## 语法
```js
{
  // 指定返回列
  "@column": "id,name",
  // 查包含
  "id{}": [1, 2, 3],
  // 查范围: | & !
  "id|{}": "<=300,>=400",
  // 模糊查询
  "content$": "%keyword%",
  // 正则匹配
  "content?": "^[0-9]+$",
  // query: 1: 返回条数 2: 返回数据
  "query": 1,
  // 排序: 字段的先后顺序表示字段排序的优先级。id和id+是等价的，表示升序，-表示降序
  "@order": "date-,id,content+"
}
```

## 查询
1. 单表查一条数据
```js 
{
  "Moment": {
    "id": 12
  }
}
```
2. 列表数据
```js
{
  "[]": {
    "Moment": {
      "id|{}": ">=30"
    }
  }
}
```
3. 分页数据
```js
{
  "[]": {
    "Moment": {
      "id|{}": ">=30"
    }
  },
  "page": 0,
  "count": 20
}
```

4. 不分页查询
```js
{
  "[]": {
    "Moment": {
      "@column": "id,date"
    },
    "query": 2
  },
  "total@": "/[]/total"
}
```

5. 查询条数
- 使用query=1
```js
{
  "[]": {
    "Moment": {
      "@column": "id,date"
    },
    "query": 1
  },
  "total@": "/[]/total"
}
```
- 使用 Head方法
```js
{
  "Moment": {
    "userId": 38710
  }
}
```

6. 关联查询
- 场景：每条评论有有一个发评论的人
```js
{
  "[]": {
    "Moment": {
      "id": 12
    },
    "User": {
      "id@": "/Moment/UserId"
    }
  }
}
```

7. 分组查询
- 支持的函数：`count | sum | max | min | avg`
```js
{
  "[]": {
    "Moment": {
      "@column": "max(id):maxid"
    }
  }
}
```

- 分组查询
```js
{
  "[]": {
    "Sale": {
      "@column": "store_id;sum(amt):totAmt",
      "@group": "store_id"
    }
  }
}
```