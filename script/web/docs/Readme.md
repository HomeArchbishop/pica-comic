# 哔咔漫画

![Lang](https://img.shields.io/badge/Node-6.0.0%2B-green)
![Lang](https://img.shields.io/badge/npm-3.0.0%2B-green)
![Lang](https://img.shields.io/badge/LANG-JS/TS-gold)
![Lang](https://img.shields.io/badge/Vue-2.5.2-brightgreen)

- 哔咔漫画桌面客户端（目前支持浏览器环境）
- 该项目仅供技术研究使用，请勿用于其他用途
- 如果觉得本项目对你有所帮助，请点个star关注，感谢支持
- 如有使用中遇到问题，欢迎提ISSUE

## 开发背景
- 大约一阵子前，哔咔的ios端签名不给用了，导致需要自签，比较麻烦。再加之早就想用PC端看漫画了，就写了这个桌面端应用。

## 功能
- 已实现哔咔漫画大部分功能
- 支持看图和下载
 
## 如何使用
  ### Windows (测试使用win10)
  1. 下载最新的版本 https://github.com/tonquer/picacg-windows/releases
  2. 解压zip
  3. 打开start.exe
  4. 后续有更新，只需要下载最新版本覆盖原目录即可
  5. 如果无法初始化waifu2x，请更新显卡驱动，安装 [Vs运行库](https://download.visualstudio.microsoft.com/download/pr/366c0fb9-fe05-4b58-949a-5bc36e50e370/015EDD4E5D36E053B23A01ADB77A2B12444D3FB6ECCEFE23E3A8CD6388616A16/VC_redist.x64.exe)，如果还是无法启用，说明你的电脑不支持vulkan

  ### macOS (测试使用 macOS 10.15.7)
  1. 下载最新的版本 https://github.com/tonquer/picacg-windows/releases
  2. 解压 7z
  3. 将解压出的 PicACG 拖入访达 (Finder) 左侧侧栏的应用程序 (Applications) 文件夹中
  4. 从启动台 (Launchpad) 中找到并打开 PicACG
  #### 对于 M1 Mac 用户
  * 作者没有 Arm Mac, 所以没有办法提供已经打包好的应用程序
  * 如果您拥有 M1 Mac, 可以尝试参考下面的过程手动运行或者进行打包

  ### Linux (测试使用deepin 20.2)
  1. 下载qt依赖， http://ftp.br.debian.org/debian/pool/main/x/xcb-util/libxcb-util1_0.4.0-1+b1_amd64.deb
  2. 安装依赖，sudo dpkg -i ./libxcb-util1_0.4.0-1+b1_amd64.deb
  3. 下载最新的版本 https://github.com/tonquer/picacg-windows/releases
  4. 解压tar -zxvf bika.tar.gz 
  5. cd bika && chmod +x start
  6. ./start
  7. 要想使用waifu2x请确定你的设备支持vulkan，然后安装vulkan驱动包，sudo apt install mesa-vulkan-drivers

## 关于Waifu2x设置
  请看说明 https://github.com/tonquer/picacg-windows/discussions/76

## 关于代理问题
  请看说明 https://github.com/tonquer/picacg-windows/discussions/48

## 如何编译
  ### 使用Git Actions编译
  1. 查看编译结果[Git Actions编译](https://github.com/tonquer/picacg-windows/actions)

## 界面

* 登录
![登录](example/登录.gif)

* 搜索
![搜索](example/搜索.gif)

* 漫画详情
![漫画详情](example/漫画详情.gif)

* 下载
![下载](example/下载.gif)

* 看图
![看图](example/看图.gif)

* waifu2x
![waifu2x](example/waifu2x.gif)
