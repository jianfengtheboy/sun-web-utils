### 数组相关的工具函数

#### 将类数组转为数组
```js
  const htmlCollection = document.getElementsByClassName('div') // HTMLCollection[]
  // 调用transformArray()方法
  transformArray(htmlCollection) // []
```

#### 返回数组中的最小值
```js
  const arr = [2, 3, 24, 23, 8]

  arrayMin(arr)  // 2
```

#### 将数组块划分为指定大小的较小数组
```js
  const arr = [2, 3, 4, 5, 6, 7, 8]

  chunkArray(arr, 3) // [[2, 3, 4], [5, 6, 7], [8]]
```

#### 从数组中移除 false 值
```js
  const arr = [2, undefined, 4, false, 6, true, 8]

  compact(arr) // [2, 4, 6, true, 8]
```

#### 返回两个数组之间的不相同元素
```js
  const arr1 = [2, 3, 24, 23, 8]
  const arr2 = [2, 3, 4, 5, 6, 7, 8]
  // arr1相对于arr2的差集
  difference(arr1, arr2) // [24, 23]
```

#### 返回两个数组之间的相同的元素
```js
  const arr1 = [2, 3, 24, 23, 8]
  const arr2 = [2, 3, 4, 5, 6, 7, 8]

  intersection(arr1, arr2) // [2, 3, 8]
```

#### 返回数组中的每个第 n 个元素
```js
  const arr = [2, 3, 4, 5, 6, 7, 8]

  everyNth(arr, 2) // [2, 4, 6, 8]
  everyNth(arr, 3) // [2, 5, 8]
```

#### 筛选出数组中的非唯一值
```js
  const arr = [2, 6, 4, 5, 6, 7, 8]

  filterNonUnique(arr) // [6, 6]
```

#### 初始化并填充具有指定值的数组
```js
  initializeArrayWithRange(6, 0) // [6, 7, 8, 9, 10, 11]

  initializeArrayWithValues(4, 2) // [2, 2, 2, 2]
```

#### 返回数组中的随机元素
```js
  const arr = [2, 3, 4, 5, 6, 7, 8]
  // 可随机返回数组中的元素
  sample(arr) // 8
```

#### 返回两个数组中都显示的元素的数组
```js
  const arr = [2, 3, 4, 5, 6, 7, 8]
  const args = [3, 5, 6, 9, 10]

  similarity(arr, args) // [3, 5, 6]
```

#### 返回两个数组之间的对称差
```js
  const arr = [2, 3, 4, 5, 6, 7, 8]
  const args = [3, 5, 6, 9, 10]

  symmetricDifference(arr, args) // [2, 4, 7, 8, 9, 10]
```

#### 返回一个数组, 其中 n 个元素从开始处移除
```js
  const arr = [2, 3, 4, 5, 6, 7, 8]

  take(arr, 2) // [2, 3]
```

#### 返回一个数组, 其中 n 个元素从末尾移除
```js
  const arr = [2, 3, 4, 5, 6, 7, 8]

  takeRight(arr) // [7, 8]
```

#### 合并两个数组并去重
```js
  const arr = [2, 3, 4, 5, 6, 7, 8]
  const args = [3, 5, 6, 9, 10]

  union(arr, args) // [2, 3, 4, 5, 6, 7, 8, 9, 10]
```

#### 数组去重
```js
  const arr = [2, 3, 4, 3, 5, 6, 2, 7, 8, 8, 4]

  noRepeatSet(arr) // [2, 3, 4, 5, 6, 7, 8]

  noRepeatFrom(arr) // [2, 3, 4, 5, 6, 7, 8]

  noRepeatFilter(arr) // [3, 5, 6, 2, 7, 8, 4]

  noRepeatObject(arr) // [2, 3, 4, 5, 6, 7, 8]
```

#### 查找数组中的最大值
```js
  const arr = [2, 3, 4, 5, 6, 7, 8]

  arrayMax(arr) // 8

  arrayMaxReduce(arr) // 8

  arrayMaxCompire(arr) // 8

  arrayMaxSort(arr) // 8
```

#### 返回以size为长度的数组分割的原数组
```js
  const arr = [2, 3, 4, 5, 6, 7, 8]

  chunkSlice(arr, 4) // [[2, 3, 4, 5], [6, 7, 8]]

  chunkSplice(arr, 4) // [[2, 3, 4, 5], [6, 7, 8]]
```

#### 返回数组中某元素出现的次数
```js
  const arr = [2, 3, 4, 5, 6, 3, 7, 8]

  countOccurrencesReduce(arr, 3) // 2

  countOccurrencesFilter(arr, 3) // 2
```
