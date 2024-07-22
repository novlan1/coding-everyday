## ARP协议与RARP协议

### ARP（`Address Resolution Protocol`）地址解析协议
- [ ] 作用：将网络层IP地址转为数据链路层Mac地址


ARP缓存表：
- [ ] **IP地址和Mac地址**的映射关系
- [ ] ARP缓存表中的记录并不是永久有效的，有一定的期限
 
![ARP缓存表](/imgs/arp_protocol_cache_table.png)

如果没有缓存的话
- ARP协议会**广播**到除A以外的端口，收到回应后，记录Mac地址


查看本地arp表命令 
- [ ] `arp -a`

ARP协议封装在数据链路层的数据帧中，数据总长28位：
 
![ARP](/imgs/arp_protocol_header.png)

- [ ] 因为ARP协议使用到了IP地址，所有是属于**网络层**的内容，其实是**网络层和数据链路层配合使用的协议**


### RARP（`Reverse Address Resolution Protocol`）逆地址解析协议
- [ ] 将Mac地址转为IP地址
- [ ] 数据段长度也是28位


ARP和RARP的操作对程序员是透明的

网络传输中有三张表
1. MAC地址表
2. ARP表
3. 路由表
