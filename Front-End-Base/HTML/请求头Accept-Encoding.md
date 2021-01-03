- [1. 请求头Accept-Encoding](#1-请求头accept-encoding)
  - [1.1. 概述](#11-概述)
  - [1.2. 语法](#12-语法)
  - [1.3. 指令](#13-指令)
    - [1.3.1. gzip](#131-gzip)
    - [1.3.2. compress](#132-compress)
    - [1.3.3. deflate](#133-deflate)
    - [1.3.4. br](#134-br)
    - [1.3.5. identity](#135-identity)
    - [1.3.6. *](#136-)
    - [1.3.7. ;q= (qvalues weighting)](#137-q-qvalues-weighting)
  - [1.4. 示例](#14-示例)

## 1. 请求头Accept-Encoding

### 1.1. 概述

**HTTP 请求头 Accept-Encoding 会将客户端能够理解的内容编码方式——通常是某种压缩算法——进行通知（给服务端）**。通过**内容协商**的方式，**服务端会选择一个客户端提议的方式，使用并在响应头 Content-Encoding 中通知客户端该选择**。

即使客户端和服务器都支持相同的压缩算法，在 identity 指令可以被接受的情况下，服务器也可以选择对响应主体不进行压缩。导致这种情况出现的两种常见的情形是：

- **要发送的数据已经经过压缩**，再次进行压缩不会导致被传输的数据量更小。一些图像格式的文件会存在这种情况；
- **服务器超载**，无法承受压缩需求导致的计算开销。通常，如果服务器使用超过80%的计算能力，微软建议不要压缩。

**只要 identity —— 表示不需要进行任何编码——没有被明确禁止使用**（**通过 identity;q=0 指令**或是 *;q=0 而没有为 identity 明确指定权重值），则**服务器禁止返回表示客户端错误的 406 Not Acceptable 响应**。



### 1.2. 语法

```
Accept-Encoding: gzip
Accept-Encoding: compress
Accept-Encoding: deflate
Accept-Encoding: br
Accept-Encoding: identity
Accept-Encoding: *

// Multiple algorithms, weighted with the quality value syntax:
Accept-Encoding: deflate, gzip;q=1.0, *;q=0.5
```

### 1.3. 指令


#### 1.3.1. gzip

表示采用 Lempel-Ziv coding (LZ77) 压缩算法，以及32位CRC校验的编码方式。

#### 1.3.2. compress

采用 Lempel-Ziv-Welch (LZW) 压缩算法。

#### 1.3.3. deflate

采用 **zlib** 结构和 **deflate** 压缩算法。

#### 1.3.4. br

表示采用 **Brotli** 算法的编码方式。

#### 1.3.5. identity

用于指代自身（例如：未经过压缩和修改）。除非特别指明，这个标记始终可以被接受。

#### 1.3.6. *

匹配其他任意未在该请求头字段中列出的编码方式。假如该请求头字段不存在的话，**这个值是默认值。它并不代表任意算法都支持，而仅仅表示算法之间无优先次序**。

#### 1.3.7. ;q= (qvalues weighting)

值代表优先顺序，用相对质量价值 表示，又称为权重。


### 1.4. 示例

```
Accept-Encoding: gzip
Accept-Encoding: gzip, compress, br
Accept-Encoding: br;q=1.0, gzip;q=0.8, *;q=0.1
```