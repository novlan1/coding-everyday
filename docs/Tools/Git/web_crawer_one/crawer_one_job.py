# -*- coding: utf-8 -*-

from datetime import date, datetime
import time
import os
import re

import requests
import pandas as pd
from scrapy import Selector


# 最近的确定的url后缀
oldNum = 2882 
# 最近的确定的日期
oldDate = datetime(2020, 7, 17)  
# 图片保存路径
# img_file_dir = '/root/myjobs/crawerOne/img' 
img_file_dir = '/Users/liyuquan/Downloads/Downloads/img'
# csv保存路径
csv_file_dir = '/Users/liyuquan/Downloads/Downloads/csv'  
# csv_file_dir = '/root/myjobs/crawerOne/csv'
# 《一个》网址 
prefixUrl = 'http://m.wufazhuce.com/one/'
# 《一个》网址
mainUrl = 'http://wufazhuce.com'
# 请求头
headers = {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/74.0.3729.108 Safari/537.36'
}

# 解析页面
def parseText(url):
    html = requests.get(url,headers=headers).text
    sel = Selector(text=html)
    
    day = sel.xpath('//p[@class="day"]/text()').extract()
    month = sel.xpath('//p[@class="month"]/text()').extract()
    
    vol = sel.xpath('//span[@class="picture-detail-issue-no"]/text()').extract()
    text = sel.xpath('//p[@class="text-content"]/text()').extract()
    imgUrl = sel.xpath('//img[contains(@class, "item-picture-img")]/@src').extract()
                       
#     print(imgUrl)
    
    _vol = ''
    _day = 0
    _month = ''
    _content = ''
    _picUrl = ''
    
    if imgUrl:
        _picUrl = imgUrl[0]
    if vol:
        _vol = vol[0]
        _vol = int(re.search('(\d+)', _vol)[0])
        
    if day:
        _day = day[0]
        
    if month: 
        _month = month[0]
    
    if text:
        _content = text[0]
    
    if _content:
        year = _month.split('.')[1]
        mmonth = _month.split('.')[0]
        date = str(year) + '.' + mmonth + '.' +  str(_day)
        
        file_name = str(_vol)+'.jpg'
        saveOnesImg(_picUrl, file_name)
#         print(date, _content, _vol, _picUrl)
        return [date, _vol, _content, _picUrl]


# 导出CSV
def exportToCSV(_all):
    if os.path.exists(csv_file_dir):
        os.chdir(csv_file_dir)
    else:
        os.mkdir(csv_file_dir)
        os.chdir(csv_file_dir)
        
    df = pd.DataFrame(_all)
    df.to_csv('one_future.csv', encoding='utf_8_sig')
    print('Success to save to csv!')
    
    
# 获取最新一期URL后缀
def getLastIssueNumber():
    
    d1 = datetime.today()
    d2 = oldDate
    return (d1-d2).days + oldNum
    
    
# 保存图片到本地
def saveOnesImg(pic_url, file_name):
    if os.path.exists(img_file_dir):
        os.chdir(img_file_dir)
    else:
        os.mkdir(img_file_dir)
        os.chdir(img_file_dir)
        
    res = requests.get(pic_url)
    if res.status_code == 200:
        
        if not os.path.exists(file_name):
            with open(file_name, 'wb') as f:
                f.write(res.content)
                print('Success to save img!', file_name)
        else:
            print(file_name, 'already downloaded!')

            
# 之前方法
# if __name__ == '__main__':
def beforeMain():
    MAXNUM = getLastIssueNumber()
    print(MAXNUM)
    _all = []
    
    # 只保存今日一期
    for i in range(MAXNUM, MAXNUM - 1, -1):
        url = prefixUrl + str(i)
#         print(url)
        
        data = parseText(url)
        if data:
            _all.append(data)
    exportToCSV(_all)
        
        
# 获取首页内容
def getMainUrlContent():
    html = requests.get(mainUrl, headers=headers).text
    sel = Selector(text=html)
    
    _date = time.strftime('%Y.%m.%d',time.localtime(time.time()))
    _imgUrl = ''
    _vol = ''
    _content = ''
    
    todayOne =  sel.xpath('//div[@class="carousel-inner"]/div[contains(@class, "item")]')[0]
    
    _imgUrl = todayOne.xpath('.//img[@class="fp-one-imagen"]/@src').extract()[0]
    
    content = todayOne.xpath('.//div[@class="fp-one-cita"]/a//text()').extract()
    _content = ''.join(content).replace('\r\n', '')
    
    vol = todayOne.xpath('.//div[@class="fp-one-titulo-pubdate"]/p[@class="titulo"]//text()').extract()[0]
    _vol = vol.replace('VOL.', '')
    
    file_name = str(_vol)+'.jpg'
    saveOnesImg(_imgUrl, file_name)
    
    return [_date, _vol, _content, _imgUrl]
    
    
if __name__ == '__main__':
    data = getMainUrlContent()
    
    if data:
        exportToCSV([data])
    
    else:
        print('解析出错')
