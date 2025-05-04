## SVG 数值指示器

```jsx
const POSITIVE_NUM = "#FF5140";
const NEGATIVE_NUM = "#00CE7D"; 
const HALF_ALARM = "#F2AC34";
const GREEN_DOT = "#00B69B";

// 参数：当前值、阈值、起始位置
const cancelRatioCell = (val, thre, startX = 15) => {
  const _val = parseInt(val);
  const _thre = parseInt(thre);
  
  const angle =
    _val > _thre || _thre === 0 
    ? 180 
    : parseInt((_val / _thre) * 180);
  const R1 = 17;
  const R2 = 13;
  
  const startY = 25;
  const stopX = startX + 2 * R1;
  
  let [endX, endY] = getPointsOfEllipse(startX, startY, R1, R2, angle);

  return (
    <span style={{ position: "relative" }}>
      <svg
        width="100%"
        height="30px"
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="linearRed" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#FF9A7B" />
            <stop offset="108%" stopColor="#F93C65" />
          </linearGradient>
          <linearGradient id="linear" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor={NEGATIVE_NUM} />
            <stop offset="108%" stopColor="#73D070" />
          </linearGradient>
          <linearGradient id="linearYellow" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#FFD460" />
            <stop offset="108%" stopColor="#FF9A7B" />
          </linearGradient>
        </defs>
        <path
          d={`M${startX},${startY} A${R1},${R2} 0,0,1 ${stopX},${startY}`}
          fill="green"
          stroke="#272B36"
          strokeWidth="5"
          fillOpacity="0"
        />
        {_val != 0 && (
          <path
            d={`M${startX},${startY} A${R1},${R2} 0,0,1 ${endX},${endY}`}
            fill="green"
            strokeWidth="5"
            stroke={
              _val >= _thre
                ? "url(#linearRed)"
                : _thre - _val <= 5
                ? "url(#linearYellow)"
                : "url(#linear)"
            }
            fillOpacity="0"
          />
        )}
        <g
          fontSize="11"
          font="sans-serif"
          fill="rgba(255,255,255,0.8)"
          stroke="none"
          textAnchor="right"
        >
          <text x={stopX} y={startY} dx="8" dy="2">
            {_thre}
          </text>
        </g>
        <g
          fontSize="11"
          font="sans-serif"
          fill={
            _val >= _thre
              ? POSITIVE_NUM
              : _thre - _val <= 5
              ? HALF_ALARM
              : NEGATIVE_NUM
          }
          stroke="none"
          textAnchor="middle"
        >
          <text x={startX + R1} y={startY} dx="0" dy="2">
            {_val}
          </text>
        </g>
      </svg>
    </span>
  );
};


// 根据角度获取椭圆上点的位置
function getPointsOfEllipse(startX, startY, R1, R2, angle) {
  angle = 180 - angle;
  var theta = ((Math.PI * 2) / 360) * angle;
  var commonBottom = Math.sqrt(R1 * R1 * Math.tan(theta) ** 2 + R2 * R2);
  
  var x = (R1 * R2) / commonBottom;
  var y = (R1 * R2 * Math.tan(theta)) / commonBottom;
  
  if (angle > 90) {
    x = -x;
  }
  return [startX + x + R1, startY - Math.abs(y)];
}
```

效果图：

![SVG 数值指示器](/imgs/svg_numerical_indicator.png)



